import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { Feather, FolderOpen } from 'lucide-react'
import UserMenu from './user-menu'
import { checkUser } from '@/lib/checkUser'
import Image from 'next/image'

const Header = async () => {
  await checkUser();
  return (
    <header className = "container mx-auto">
      
    <nav className='py-6 px-4 flex justify-between items-center'>
    <Link href="/">
          <Image
            src={"/logo.png"}
            alt="MindVault Logo"
            width={200}
            height={60}
             className="h-[130px] w-auto object-contain"
          />
        </Link>
        {/* Logo */}
        {/* <Image src = > */}
        <div className="flex items-center gap-4">
        <SignedIn>
            <Link href="/dashboard#collections">
              <Button variant="journal" className="flex items-center gap-2">
                <FolderOpen size={18} />
                <span className="hidden md:inline">Collections</span>
              </Button>
            </Link>
          </SignedIn>
          <Link href="/journal/write">
            <Button variant="journal" className="flex items-center gap-2">
              <Feather size={18} />
              <span className="hidden md:inline">Write New</span>
            </Button>
          </Link>
        <SignedOut>
        <SignInButton forceRedirectUrl="/dashboard">
            <Button variant="outline" className="bg-brown-500 rounded-full border-brown-400 hover:bg-brown-400/10 text-white " >Log In</Button>
          </SignInButton>
            </SignedOut>
            <SignedIn>
            <UserMenu/>
            </SignedIn>
            </div>
    </nav>
    </header>
  )
}

export default Header