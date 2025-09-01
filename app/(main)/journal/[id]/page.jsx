import { getJournalEntry } from "@/actions/journal";
import React from "react";
import EditButton from "./_components/editbutton";
import DeleteDialog from "./_components/deletedialog";
import { getMoodById } from "@/app/lib/moods";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const JournalEntry = async ({ params }) => {
  const { id } = await params;
  const entry = await getJournalEntry(id);
  const mood = getMoodById(entry.mood);
  return (
    // padding vertically and space betweem levels
    <div className="p-6 space-y-4">
      {/* Header */}
      {/* // Level 1 */}

      <div className="flex items-center justify-between"> 
        {/* groups emoji and title */}
        {/* //level 2 */}
        <div className="flex items-center gap-2">
          {mood?.emoji && <span className="text-4xl">{mood.emoji}</span>}
          <h1 className="text-5xl font-bold gradient-title pb-4">
            {entry.title}
          </h1>
        </div>
{/* level3 */}
        <div className="flex gap-2">
          <EditButton entryId={id} />
          <DeleteDialog entryId={id} />
        </div>
      </div>

      <div
        className="ql-editor prose max-w-none text-gray-800"
        dangerouslySetInnerHTML={{ __html: entry.content }}
      />

      <div className="flex flex-wrap gap-2">
        {entry.collection && (
          <Link href={`/collection/${entry.collection.id}`}>
            <Badge className="bg-brown-100 text-black-800 border border-black-300 hover:bg-black-200 transition">
              Collection: {entry.collection.name}
            </Badge>
          </Link>
        )}
      </div>
    </div>
  );
};

export default JournalEntry;
