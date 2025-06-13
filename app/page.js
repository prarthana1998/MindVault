import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Book, Brain, ChevronRightIcon, Feather, FeatherIcon, Lock, Sparkles } from "lucide-react";
import Link from "next/link";
const features = [
  {
    icon: Book,
    title: "Rich Text Editor",
    description: "Express yourself with a powerful editor supporting markdown, formatting, and more.",
  },
  {
    icon: Sparkles,
    title: "Elegant Writing",
    description:
      "A beautiful, distraction-free space for your thoughts to flow freely.",
  },
  {
    icon: Lock,
    title: "Secure & Private",
    description:
      "We prioritise your privacy. Your entries are secure and accessible only to you—anytime, anywhere.",
  },];
export default function Home() {
  return (
    <div className="container mx-auto px-4 pb-16 pt-8">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto text-center space-y-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl gradient-title">
        Preserve your thoughts in your personal MindVault
        </h1>
        <p className="text-lg md:text-xl text-brown-600">
        A simple, elegant journal for clear writing, secure storage, and zero distractions.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/dashboard">
            <Button size="lg" className="bg-brown-500 rounded-full text-white hover:bg-brown-300 gap-2">
              <Feather className="h-5 w-5" />
              Start Writing
            </Button>
          </Link>
          <Link href="#features">
          <Button size="lg" variant="outline" className="text-brown-600 rounded-full border-brown-400 hover:bg-brown-400/10">
            Explore Features
          </Button>
          </Link>
        </div>
      </div>

        
      <section id="features" className=" mt-24 grid md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {features.map((features, index) => (
          <Card key={features.title} className="bg-brown-100/50 p-4 rounded-lg backdrop-blur-sm border border-brown-200/20">
            <CardContent className="p-6">
              <div className="h-12 w-12 bg-brown-100 rounded-full flex items-center justify-center mb-4"><features.icon className="h-8 w-8 text-brown-300"/></div>
              <h3 className="text-xl font-semibold text-brown-700">{features.title}</h3>
          {/* Feature Description */}
          <p className="text-sm text-brown-600 mt-2">{features.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>
      <div className="container mx-auto px-4 py-24 ">
     <Card className="bg-gradient-to-r from-brown-100 via-brown-200 to-brown-300 ">
      <CardContent className="p-12 text-center">
      {/* <Brain className="h-16 w-16 mx-auto mb-6 text-brown-300" /> */}
        <h3 className="text-3xl font-bold text-brown-700 mb-6">
          Start writing your daily thoughts here
        </h3>
        <p className="text-lg text-brown-700 mb-6">
        Reflect, grow, and organize your thoughts. Your private space awaits.
        </p>
        <Link href="/dashboard">
    <Button variant="journal" className="animate-bounce">
      <FeatherIcon className="h-5 w-5" />Start Journaling for free 
    </Button></Link>
      </CardContent>
     </Card>
     </div>
    </div>
    

  );
}
