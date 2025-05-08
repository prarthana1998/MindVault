"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { getMoodById, MOODS } from "@/app/lib/moods";
import { revalidatePath } from "next/cache";
import { request } from "@arcjet/next";
import aj from "@/lib/arcjet";
export async function createJournalEntry(data) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorised");

    const req = await request();

    // Check rate limit
    const decision = await aj.protect(req, {
      userId,
      requested: 1, // Specify how many tokens to consume
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        const { remaining, reset } = decision.reason;
        console.error({
          code: "RATE_LIMIT_EXCEEDED",
          details: {
            remaining,
            resetInSeconds: reset,
          },
        });

        throw new Error("Too many requests. Please try again later.");
      }

      throw new Error("Request blocked");
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });
    if (!user) {
      throw new Error("User Not Found");
    }

    const mood = MOODS[data.mood.toUpperCase()];
    if (!mood) throw new Error("Invalid mood");

    const entry = await db.entry.create({
      data: {
        title: data.title,
        content: data.content,
        mood: mood.id,
        moodScore: mood.score,
        userId: user.id,
        collectionId: data.collectionId || null,
      },
    });

    // Delete existing draft after successful publication
    await db.draft.deleteMany({
      where: { userId: user.id },
    });

    revalidatePath("/dashboard");
    return entry;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getJournalEntry({ collectionId, orderBy = "desc" }={}) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorised");
    const req = await request();
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });
    if (!user) {
      throw new Error("User Not Found");
    }
  
    const entries = await db.entry.findMany({
      where: {
        userId: user.id,
        ...(collectionId==`unorganized`?{collectionId:null}:collectionId
          ? { collectionId }
          : {}),
      },
      include:{
        colection:{
          select:{
            id:true,
            name:true,
          },
        },
        orderBy: {
          createdAt: orderBy,
        },
      }
    });
    // populating each entry with its corresposnding mood
    const entriesWithMoodData = entries.map((entry) =>({
      ...entry,
      moodData: getMoodById(entry.mood),
    }));
    return{
      success: true,
      data: {
        entries: entriesWithMoodData,
      },
    };
  } catch(error) {
    return {success:false, error: error.message};
  }
}
