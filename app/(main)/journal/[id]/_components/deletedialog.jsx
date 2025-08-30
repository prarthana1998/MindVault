"use client"
import { deleteJournal } from '@/actions/journal'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import useFetch from '@/hooks/use-fetch'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const DeleteDialog = ({entryId}) => {
  const router = useRouter()
  const [Dialogopen, DialogsetOpen] = useState(false);

  const {
    loading: isDeleting,
    fn:deleteJournalFn,
    data: deletedJournal,

  } = useFetch(deleteJournal);
  
  useEffect(() => {
   if(deletedJournal && !isDeleting){
    DialogsetOpen(false);
    toast.error("Journal Entry deleted successfully")
    router.push(
      `/collection/${
        deletedJournal.collectionId ? deletedJournal.collectionId : "unorganized"
      }`
    );
  }
  }, [deletedJournal, isDeleting])
  
  const handleDelete = async() => {
    await deleteJournalFn(entryId)
  }
  return (
 <AlertDialog open={Dialogopen} onOpenChange={DialogsetOpen}>
    <AlertDialogTrigger asChild>
      <Button variant="destructive">
        <Trash className='h-4 w-4'/>
        Delete</Button>
    </AlertDialogTrigger>
    <AlertDialogContent className="bg-white border border-border shadow-lg">
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure you want to delete it?</AlertDialogTitle>
        <AlertDialogDescription>This cannot be undone. This will permanently delete your entry.</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <Button className="bg-red-500 hover:bg-red-600" onClick={handleDelete}
        disabled={isDeleting}>{isDeleting?"Deleting..." : "Delete"}</Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}

export default DeleteDialog