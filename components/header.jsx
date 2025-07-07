import {
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Feather, FolderOpen } from "lucide-react";
import UserMenu from "./user-menu";
import { checkUser } from "@/lib/checkUser";
import Image from "next/image";

const Header = async () => {
  // Checking if the user is authenticated before rendering
  await checkUser();
  return (
    <header className="w-full px-4">
      <nav className="px-2 pt-6 flex justify-between items-center">
        {/* minvault logo */}
        <Link href="/">
          <Image
            src={"/Logo.png"}
            alt="MindVault Logo"
            width={200}
            height={60}
            className="h-[120px] w-auto object-contain"
          />
        </Link>
        <div className="flex items-center gap-4">
           {/* Show "Collections" button only if user is signed in */}
          <SignedIn>
            <Link href="/dashboard#collections">
              <Button variant="journal" className=" items-center gap-2">
                <FolderOpen size={18} />
                <span className="hidden md:inline">Collections</span>
              </Button>
            </Link>
          </SignedIn>
          <Link href="/journal/write">
            <Button variant="journal" className="items-center gap-2">
              <Feather size={18} />
              <span className="hidden md:inline">Write New</span>
            </Button>
          </Link>
          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button
                variant="outline"
                className="bg-brown-500 rounded-full border-brown-400 hover:bg-brown-400/10 text-white "
              >
                Log In
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserMenu />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
