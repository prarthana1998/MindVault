"use client";

import { CirclePlus } from "lucide-react";
import Link from "next/link";

/*different colour schemes for the three boxes*/
const colorSchemes = {
  createCollections: {
    bg: "bg-brown-500 hover:bg-brown-600", // soft brown-beige
    tab: "bg-brown-200 hover:bg-brown-300", // warm tab
  },

  unorganized: {
    bg: "bg-yellow-100 hover:bg-yellow-300",
    tab: "bg-yellow-400 hover:bg-yellow-500",
  },
  collection: {
    bg: "bg-blue-100 hover:bg-blue-300",
    tab: "bg-blue-400 hover:bg-blue-500",
  },
};
const FolderTab = ({ colorClass }) => (
  <div
    className={`absolute inset-x-4 -top-2 h-2 rounded-t-md transform -skew-x-6 transition-colors ${colorClass}`}
  />
);
const EntryPreview = ({entry}) =>{
    <div>
        {entry.title}
    </div>
}
const CollectionPreview = ({
  id,
  name,
  entries = [],
  isUnorganized = false,
  isCreateNew = false,
  onCreateNew,
}) => {
  if (isCreateNew) {
    return (
      <button
        onClick={onCreateNew}
        className="group relative h-[200px] cursor-pointer"
      >
        <FolderTab colorClass={colorSchemes["createCollections"].bg} />
        <div
          className={`relative h-full rounded-lg p-8 shadow-md hover:shadow-lg transition-all flex flex-col items-center justify-center gap-4 ${colorSchemes["createCollections"].tab}`}
        >
          <div className="h-12 w-12 rounded-full bg-gray-200 group-hover:bg-gray-300 flex items-center justify-center">
            <CirclePlus className="h-6 w-6 text-yellow-600/" />
          </div>
          <div className="text-lg font-semibold truncate">Create New Collection</div>
        </div>
      </button>
    );
  }

  return (
    <Link
      href={`/collection/${isUnorganized ? "unorganized" : id}`}
      className="group relative"
    >
      <FolderTab
        colorClass={
          colorSchemes[isUnorganized ? "unorganized" : "collection"].tab
        }
      />
      <div
        className={`relative rounded-lg p-6 shadow-md hover:shadow-lg transition-all ${
          colorSchemes[isUnorganized ? "unorganized" : "collection"].bg
        }`}
      >
         <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">{isUnorganized ? "📂" : "📁"}</span>
          <h3 className="text-lg font-semibold truncate">{name}</h3>
        </div>
        <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
                <span>{entries.length} entries</span>
            </div>
            {entries.length > 0 &&
            entries.slice(0,2).map((entry) => <EntryPreview key={entry.id} entry={entry}/>)}
        </div>
        </div>
        
    </Link>
  );
};

export default CollectionPreview;
