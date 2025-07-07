"use client"
import React, { useEffect, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import useFetch from '@/hooks/use-fetch';
import { toast } from 'sonner';
import { deleteTheme } from '@/actions/theme';


const DeleteCollectionDialogue= ({collection, entriesCount }) => {

  const router = useRouter()

  const [open, setOpen] = useState(false);

  const {
    loading: isDeleting,
    fn:deleteThemeFn,
    data: deletedTheme,

  } = useFetch(deleteTheme);
  
  useEffect(() => {
   if(deletedTheme && !isDeleting){
    setOpen(false);
    toast.error(
      `Collection "${collection.name}" and all its entries deleted`
    );
   
   router.push("/dashboard"); 
  }
  }, [deletedTheme, isDeleting])
  
  const handleDelete = async() => {
    await deleteThemeFn(collection.id)
  }
  return (
    <div><AlertDialog open={open} onOpenChange={setOpen}>
    <AlertDialogTrigger>
      <Button variant="destructive">
        <Trash className='h-4 w-4'/>
        Delete</Button></AlertDialogTrigger>
    <AlertDialogContent className="bg-white border border-border shadow-lg">
      <AlertDialogHeader>
        <AlertDialogTitle>{`Delete "${collection.name}"?`}</AlertDialogTitle>
        <div className="space-y-2 text-muted-foreground text-sm">
            <p>This will permanently delete:</p>
            <ul className="list-disc list-inside">
              <li>The collection &quot;{collection.name}&quot;</li>
              <li>
                {entriesCount} journal{" "}
                {entriesCount === 1 ? "entry" : "entries"}
              </li>
            </ul>
            <p className="font-semibold text-red-600">
              This action cannot be undone.
            </p>
          </div>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <Button onClick={handleDelete}
        disabled={isDeleting}>{isDeleting?"Deleting..." : "Delete Collection"}</Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  </div>
  )
}

export default DeleteCollectionDialogue