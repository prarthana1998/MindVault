import { getJournalEntries} from "@/actions/journal";
import { getTheme } from "@/actions/theme";
import React from "react";
import Collections from "./_components/collections";

const Dashboard = async () => {
  const collections = await getTheme(); //collecting collections
  const entriesData = await getJournalEntries(); //all the journal entries

  // Group entries by collection
  const entriesByCollection = entriesData?.data?.entries?.reduce(
    (acc, entry) => {
      const collectionId = entry.collectionId || "unorganized";
      if (!acc[collectionId]) {
        acc[collectionId] = [];
      }
      acc[collectionId].push(entry);
      return acc;
    },
    {}
  );
  
  return (
    <div>
      <section>{/*Mood Analytics*/}</section>
      <Collections
        collections={collections}
        entriesByCollection={entriesByCollection}
      />
    </div>
  );
};

export default Dashboard;
