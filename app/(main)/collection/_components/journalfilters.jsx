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
import { Calendar, Search } from "lucide-react";
import React, { useState } from "react";
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
  const [filteredEntries, setFilteredEntries] = useState(entries)
  const clearFilters = () => {
    setsearchQuery("")
    setSelectedMood("")
}
console.log(entries)
  return (
    <>
      <div className="flex flex-wrap gap-4">
      <div className="flex-1 min-w-[200px]">
        <Input
          placeholder="Search for your entry"
          value={searchQuery}
          className="w-full border-gray-300"
          onChange={(e) => setsearchQuery(e.target.value)}
          prefix={<Search className="text-gray-300" />}
          />
          </div>
        <Select onValueChange={setSelectedMood} value={selectedMood}>
          <SelectTrigger className="bg-transparent border-gray-300 h-[46px] py-5 md:text-md">
            <SelectValue placeholder="Filter by mood" />
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
        {/* <Popover>
          <PopoverTrigger><Button variant={"outline"}  className={`
          "justify-start text-left font-normal",
          !date && "text-muted-foreground"
          `}><Calendar/>{date?format(date, PPP) : <span>Pick a date</span>}</Button></PopoverTrigger>
          <PopoverContent>
          
          </PopoverContent>
          </Popover> */}
        {(searchQuery || selectedMood)&&(
            <Button variant={"outline"} className="text-brown-300" onClick={clearFilters}>Clear Filter</Button>)}
      </div>

      <div>
        Showing {filteredEntries.length} of {entries.length} entries
      </div>

 </>
  );

};

export default JournalFilters;
