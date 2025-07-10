import { getJournalEntry } from '@/actions/journal';
import React from 'react'
import EditButton from './_components/editbutton';
import DeleteDialog from './_components/deletedialog';

const JournalEntry = async({params}) => {
    const {id} = await params;
    const entry = await getJournalEntry(id)
  return <div>
    <div>
        <div>
            <h1>{entry.title}</h1>
            {/* <p> </p> */}
        </div>
        <div>
            <EditButton/>
            <DeleteDialog/>
        </div>
    </div>
  </div>
}

export default JournalEntry