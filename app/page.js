import { Button } from "@/components/ui/button";
import { Feather } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col justify-center h-screen px-8 mt-[-75px]">
      {/* Hero Section */}
      <div className="container mx-auto max-w-5xl text-center space-y-8 pb-16">
        <h1 className="text-5xl md:text-6xl lg:text-7xl gradient-title">
          Journaling Made Easy with MindVault
        </h1>
        <p className="text-lg md:text-xl text-brown-700">
          Start your mindful journey today with this simple, secure, and user-friendly journal.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" className="bg-brown-500 text-white hover:bg-brown-300 gap-2">
            <Feather className="h-5 w-5" />
            Start Writing
          </Button>
          <Button size="lg" variant="outline" className="text-brown-500 border-brown-400 hover:bg-brown-400/10">
            Explore Features
          </Button>
              </div>
        </div>
        </div>

  );
}
