"use client";

import { useEffect, useState } from "react";
import CollectionPreview from "./collection-preview";
import CollectionForm from "@/components/collection-dialog";
import { createTheme } from "@/actions/theme";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch";

const Collections = ({ collections = [], entriesByCollection}) => {
  const [isCollectionDialogOpen, setIsCollectionDialogOpen] = useState(false);
  const {
    loading: createThemesLoading,
    fn: createThemesfn,
    data: createdTheme,
  } = useFetch(createTheme);
  useEffect(() => {
    if (createdTheme) {
      setIsCollectionDialogOpen(false);
      toast.success(`Theme: ${createdTheme.name} created!`);
    }
  }, [createdTheme]);

  const handleCreateCollection = async (data) => {
    createThemesfn(data);
  };
  if (collections.length === 0) return <></>;
  return (
    <section id="collection" className="space-y-6">
      <h2 className="text-3xl font-bold gradient-title">Collections</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <CollectionPreview
          isCreateNew={true}
          onCreateNew={() => setIsCollectionDialogOpen(true)}
        />
        {/* Unorganized Collection */}
        {entriesByCollection?.unorganized?.length > 0 && (
          <CollectionPreview
            name="Unorganized"
            entries={entriesByCollection.unorganized}
            isUnorganized={true}
          />
        )}
        {/* organized Collection */}
        {collections?.map((collection) => (
          
          <CollectionPreview
            key={collection.id}
            id={collection.id}
            name={collection.name}
            entries={entriesByCollection[collection.id] || []}
          />
        ))}
        <CollectionForm
          loading={createThemesLoading}
          onSuccess={handleCreateCollection}
          open={isCollectionDialogOpen}
          setOpen={setIsCollectionDialogOpen}
        />
      </div>
    </section>
  );
};

export default Collections;
