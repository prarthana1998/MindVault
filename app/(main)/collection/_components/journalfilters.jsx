"use client";
import { MOODS } from "@/app/lib/moods";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Filter, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import EntryCard from "../../../../components/entrycard";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Button } from "@/components/ui/button";

const JournalFilters = ({ entries }) => {
  const [searchQuery, setsearchQuery] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const [date, setDate] = useState(null);
  const [filteredEntries, setFilteredEntries] = useState(entries);

  useEffect(() => {
    let filtered = entries;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (entry) =>
          entry.title.toLowerCase().includes(query) ||
          entry.content.toLowerCase().includes(query)
      );
    }
    if (selectedMood) {
      filtered = filtered.filter((entry) => entry.mood === selectedMood);
    }
    setFilteredEntries(filtered);
  }, [entries, searchQuery, selectedMood]);

  const clearFilters = () => {
    setsearchQuery("");
    setSelectedMood("");
  };
  return (
    <>
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[250px]">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search for your entry"
              value={searchQuery}
              className="w-full pl-8 border-gray-300"
              onChange={(e) => {
                setsearchQuery(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="min-w-[200px]">
          <Select onValueChange={setSelectedMood} value={selectedMood}>
            <SelectTrigger className="bg-transparent border-gray-300 5 md:text-md">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <SelectValue placeholder="Filter by mood" />
              </div>
            </SelectTrigger>
            <SelectContent
              side="bottom"
              avoidCollisions={false}
              className="bg-white border border-border shadow-lg"
            >
              {Object.values(MOODS).map((mood) => (
                <SelectItem
                  className="cursor-pointer hover:bg-muted focus:bg-muted"
                  key={mood.id}
                  value={mood.id}
                >
                  <span>
                    {mood.emoji}
                    {mood.label}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* <Popover>
 
          <PopoverTrigger><Button variant={"outline"}  className={`
          "justify-start text-left font-normal",
          !date && "text-muted-foreground"
          `}><Calendar/>{date?format(date, PPP) : <span>Pick a date</span>}</Button></PopoverTrigger>
          <PopoverContent>
          
          </PopoverContent>
          </Popover> */}
        {(searchQuery || selectedMood) && (
          <Button
            variant={"outline"}
            className="text-brown-300"
            onClick={clearFilters}
          >
            Clear Filter
          </Button>
        )}
      </div>

      <div>
        Showing {filteredEntries.length} of {entries.length} entries
      </div>
      {filteredEntries.length === 0 ? (
        <div>
          <h3 className="text-gray-700">📝 No entries found</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
          {filteredEntries.map((entry) => (
            <EntryCard key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </>
  );
};

export default JournalFilters;
