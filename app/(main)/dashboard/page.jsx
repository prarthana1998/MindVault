import { getJournalEntry } from '@/actions/journal';
import { getTheme } from '@/actions/theme'
import React from 'react'

const Dashboard = async() => {
  const collections = await getTheme();
  const entriesData = await getJournalEntry();
  console.log(collections, entriesData)
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard