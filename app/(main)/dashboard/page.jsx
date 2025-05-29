import { getJournalEntry } from '@/actions/journal';
import { getTheme } from '@/actions/theme'
import React from 'react'
import Collections from './_components/collections';

const Dashboard = async() => {
  const collections = await getTheme();
  const entriesData = await getJournalEntry();
  //console.log("ENTRIES DATA:", entriesData);


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
  //console.log("ENTRIES BY COLLECTION:", entriesByCollection);

  //console.log(entriesByCollection)
  return (
    <div>
      <section>{/*Mood Analytics*/}</section>
      <Collections
      collections = {collections}
      entriesByCollection = {entriesByCollection}
      />
    </div>
  )
}

export default Dashboard