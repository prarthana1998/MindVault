import { getJournalEntry } from "@/actions/journal";
import { getsingleTheme } from "@/actions/theme";
import React from "react";
import DeleteCollectionDialogue from "../_components/deletecollection";
import JournalFilters from "../_components/journalfilters";
const CollectionPage = async ({ params }) => {
  const {collectionId} = await params;
  const entries = await getJournalEntry({ collectionId });
  const collection = await getsingleTheme(collectionId);

  return (
    <div className="space-y-8">
      <div className="flex justify-between">
        <div className="flex justify-between">
        <h1 className="text-4xl pb-4 leading-relaxed font-bold gradient-title">
          {collectionId === "unorganized"
            ? "Unorganized Entries"
            : collection?.name || "Collections"}
        </h1>
        {collection && <DeleteCollectionDialogue
        collection = {collection}
        entriesCount = {entries.data.entries.length}/>}
      </div>
      </div>
      <JournalFilters entries={entries.data.entries}/> 
    </div>
   
    );
};

export default CollectionPage;
