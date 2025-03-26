import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { FolderOpen } from 'lucide-react'
import UserMenu from './user-menu'

const Header = () => {
  return (
    <header className = "container mx-auto">
    <nav className='py-6 px-4 flex justify-between items-center'>
        <Link href={"/"}></Link>
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
        <SignedOut>
          <SignInButton>
            <Button variant="journal">Log In</Button>
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