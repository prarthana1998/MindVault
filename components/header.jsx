import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className = "container mx-auto">
    <nav className='py-6 px-4 flex justify-between items-center'>
        <Link href={"/"}></Link>
        {/* Logo */}
        {/* <Image src = > */}
        <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
    </nav>
    </header>
  )
}

export default Header