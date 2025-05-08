"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { useForm, Controller } from "react-hook-form";
import { journalSchema } from "@/app/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { BarLoader } from "react-spinners";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import useFetch from "@/hooks/use-fetch";
import { createJournalEntry } from "@/actions/journal";
import { useRouter } from "next/navigation";
import { getMoodById, MOODS } from "@/app/lib/moods";
import { toast } from "sonner";
import { getTheme, createTheme } from "@/actions/theme";
import CollectionForm from "@/components/collection-dialog";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
const JournalEntryPage = () => {
  const [isCollectionDialogOpen, setIsCollectionDialogOpen] = useState(false);
// useFetch : wraps API
  const {
    loading: actionLoading,
    fn: actionFn,
    data: actionResult,
  } = useFetch(createJournalEntry);
  const {
    loading: themesLoading, //boolean to check if API call is currently loading
    fn: fetchTheme, // reference to getTheme
    data: collections,
  } = useFetch(getTheme);
  const {
    loading: createThemesLoading,
    fn: createThemesfn,
    data: createdTheme,
  } = useFetch(createTheme);

  console.log(collections, "collections");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
    watch,
    setValue
  } = useForm({
    resolver: zodResolver(journalSchema),
    defaultValues: {
      title: "",
      content: "",
      mood: "",
      collectionId: "",
    },
  });
  const moodValue = watch("mood");
  useEffect(() => {
    fetchTheme();
  }, []);

  useEffect(() => {
    if (actionResult && !actionLoading) {
      // Clear draft after successful publish

      router.push(
        `/collection/${
          actionResult.collectionId ? actionResult.collectionId : "unorganized"
        }`
      );

      toast.success(`Entry created successfully`);
    }
  }, [actionResult, actionLoading]);
  const onSubmit = handleSubmit(async (data) => {
    const mood = getMoodById(data.mood);
    actionFn({
      ...data,
      moodScore: mood.score,
    });
  });

  useEffect(() => {
    if (createdTheme) {
      setIsCollectionDialogOpen(false)
      fetchTheme();
      setValue("collectionId", createdTheme.id)
      toast.success(`Theme: ${createdTheme.name} created!`);
    }
  }, [createdTheme]);
  const handleCreateCollection = async (data) => {
    createThemesfn(data);
  };
  const isLoading = actionLoading || themesLoading;

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={onSubmit} className="space-y-2 mx-auto">
        <h1 className="text-4xl md:text-5xl gradient-title">
          What is on your mind today?
        </h1>
        {isLoading && <BarLoader color="brown" width="100%" className="my-4" />}
        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <Input
            disabled={isLoading}
            {...register("title")}
            placeholder="Give your entry a title"
            className={`py-5 md:text-md bg-transparent border-gray-400 ${
              errors.title ? "border-red-500" : ""
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">How are you feeling?</label>
          <Controller
            name="mood"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger
                  className={`bg-transparent border-gray-400 h-[46px] py-5 md:text-md ${
                    errors.mood ? "border-red-500" : ""
                  }`}
                >
                  <SelectValue placeholder="Select a mood..." />
                </SelectTrigger>
                <SelectContent className="bg-white border border-border shadow-lg">
                  {Object.values(MOODS).map((mood) => (
                    <SelectItem
                      className="cursor-pointer hover:bg-muted focus:bg-muted"
                      key={mood.id}
                      value={mood.id}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-xl">{mood.emoji}</span>
                        <span className="text-popover-foreground">
                          {mood.label}
                        </span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.mood && (
            <p className="text-red-500 text-sm">{errors.mood.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            {getMoodById(moodValue)?.prompt ?? "Write your thoughts..."}
          </label>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <ReactQuill
                readOnly={isLoading}
                theme="snow"
                value={field.value}
                onChange={field.onChange}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["blockquote", "code-block"],
                    ["link"],
                    ["clean"],
                  ],
                }}
              />
            )}
          />
          {errors.content && (
            <p className="text-red-500 text-sm">{errors.content.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Add to Theme(Optional)</label>
          <Controller
            name="collectionId"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  if (value === "new") {
                    setIsCollectionDialogOpen(true);
                  } else {
                    field.onChange(value);
                  }
                }}
                value={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a Theme" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-border shadow-lg">
                  {collections?.map((collection) => (
                    <SelectItem key={collection.id} value={collection.id}>
                      {collection.name}
                    </SelectItem>
                  ))}
                  <SelectItem value="new">
                    <span className="text-brown-500">Create New Theme</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          {errors.content && (
            <p className="text-red-500 text-sm">
              {errors.collectionId.message}
            </p>
          )}
        </div>
        <div className="space-y-4 display:flex">
          <Button type="submit" variant="journal" disabled={actionLoading}>
            <span>Sumbit</span>
          </Button>
        </div>
      </form>
      <CollectionForm
        loading={createThemesLoading}
        onSuccess={handleCreateCollection}
        open={isCollectionDialogOpen}
        setOpen={setIsCollectionDialogOpen}
      />
    </div>
  );
};
export default JournalEntryPage;
