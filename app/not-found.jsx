import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <h1 className="text-6xl font-bold text-brown-600">404 Error</h1>
        <p>The page you are looking for doesn't exist.</p>
        <Link href="\">
        <Button variant = "journal">Return Home</Button></Link>
    </div>
  );
};
