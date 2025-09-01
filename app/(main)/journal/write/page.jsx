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
import { createJournalEntry, getDraft, getJournalEntries, getJournalEntry, saveDraft, updateJournal } from "@/actions/journal";
import { useRouter, useSearchParams } from "next/navigation";
import { getMoodById, MOODS } from "@/app/lib/moods";
import { toast } from "sonner";
import { getTheme, createTheme } from "@/actions/theme";
import CollectionForm from "@/components/collection-dialog";
import { content } from "@/tailwind.config";
import { Loader2 } from "lucide-react";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
const JournalEntryPage = () => {
  const [isCollectionDialogOpen, setIsCollectionDialogOpen] = useState(false);
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit")
  console.log("Edit ID from URL:", editId);
  const [isEditMode, setEditMode] = useState(false);
  const {
    loading: entryLoading,
    fn: fetchEntry,
    data: entryData,
  } = useFetch(getJournalEntry);
  const {
    loading: draftLoading,
    fn: fetchDraft,
    data: draftData,
  } = useFetch(getDraft);
  const {
    loading: savingDraft,
    fn: saveDraftFn,
    data: savedDraft,
  } = useFetch(saveDraft);
  
// useFetch : wraps API
  const {
    loading: actionLoading,
    fn: actionFn,
    data: actionResult,
  } = useFetch(isEditMode?updateJournal: createJournalEntry);
  const {
    loading: themesLoading, 
    fn: fetchTheme, 
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
    formState: { errors, isDirty },
    watch,
    reset,
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
    if(editId){
      setEditMode(true);
      fetchEntry(editId)
    }
    else{
      setEditMode(false);
      fetchDraft();
    }
    
  }, [editId]);
  useEffect(()=>{
    if(isEditMode && entryData)
    {
      reset({
        title: entryData.title || "",
        content: entryData.content || "",
        mood: entryData.mood || "",
        collectionId: entryData.collectionId || "" ,
    })

    }
    else if(draftData?.success && draftData?.data){
      reset({
        title: draftData.data.title || "",
        content: draftData.data.content || "",
        mood: draftData.data.mood || "",
        collectionId: "" ,

      })
    }
    else{
      reset({
        title: "",
        content:  "",
        mood:  "",
        collectionId: "" ,

      })
    }

  },[isEditMode, draftData, entryData ]);

  useEffect(() => {
    if (actionResult && !actionLoading) {
      // Clear draft after successful publish
      if(!isEditMode){
        saveDraftFn({title:"", mood:"", content:""})
      }

      router.push(
        `/collection/${
          actionResult.collectionId ? actionResult.collectionId : "unorganized"
        }`
      );

      toast.success(`Entry ${isEditMode? "updated": "created"} created successfully`);
    }
  }, [actionResult, actionLoading]);
  const onSubmit = handleSubmit(async (data) => {
    const mood = getMoodById(data.mood);
    actionFn({
      ...data,
      moodScore: mood.score,
      ...(isEditMode && {id: editId})
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

  const formData = watch();

  const handleSaveDraft = async() => {
    if(!isDirty){
      toast.error("No changes to save");
      return;
    }
    await saveDraftFn(formData)
  }
  useEffect(() => {
      if (savedDraft?.success&& !savingDraft) {
        toast.success("Draft saved successfully!");
    }
  }, [savedDraft, savingDraft]);
  
  const isLoading = actionLoading || themesLoading || entryLoading || draftLoading || savingDraft;

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={onSubmit} className="space-y-2 mx-auto">
        <h1 className="text-4xl py-2 md:text-5xl gradient-title">
          {isEditMode? "Edit Entry":"What is on your mind today?"}
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
        <div className="space-x-4 display:flex">
        {!isEditMode && (
            <Button
              type="button"
              variant="outline"
              onClick={handleSaveDraft}
              disabled={savingDraft || !isDirty}
            >
              {savingDraft && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save as Draft
            </Button>
          )}
          <Button type="submit" variant="journal" disabled={actionLoading || !isDirty}>
           {isEditMode? "Update": "Submit"}
          </Button>
          {isEditMode && (<Button onClick={(e)=>{
            e.preventDefault();
            router.push(`/journal/${entryData.id}`)
          }}variant="destructive">
            Cancel
          </Button>)}
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
