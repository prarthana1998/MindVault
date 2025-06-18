import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import { format } from "date-fns";
import { ChevronRight } from "lucide-react";

const EntryCard = ({ entry }) => {
  return (
    <Link href={`journal/${entry.id}`}>
      <Card className="aspect-square line-clamp-2 bg-brown-100/50 p-4 rounded-lg backdrop-blur-sm border border-brown-200/20">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span>{entry.moodData.emoji}</span>

                <h3>{entry.title}</h3>
              </div>
              {/* dangerouslySetInnerHTML is React’s replacement for using innerHTML in the browser DOM. In general, setting HTML from code is risky because it’s easy to inadvertently expose your users to a cross-site scripting (XSS) attack. So, you can set HTML directly from React, but you have to type out dangerouslySetInnerHTML and pass an object with a __html key, to remind yourself that it’s dangerous.  */}
              <div
                className="line-clamp-3"
                dangerouslySetInnerHTML={{ __html: entry.content }}
              />
            </div>
            {/* <div className="p-4 pt-2 mt-auto">
            <div className="flex items-center justify-between">
              <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
            </div>
          </div> */}
            <time className="text-sm text-gray-500">
              {format(new Date(entry.createdAt), "MMM d, yyyy")}
            </time>
          </div>
          
        </CardContent>
      </Card>
      
    </Link>
  );
};

export default EntryCard;
