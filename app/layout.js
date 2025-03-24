import { Inter } from 'next/font/google'
import "./globals.css";
import Header from '@/components/header';
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ['latin'] })


export const metadata = {
  title: "MindVault",
  description: "A journaling web app",
};

// wraps the page.js
export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${inter.className} `}>
        <Header/>
        <div className="inset-0 bg-[url('/journal_bg.jpg')] opacity-50 fixed -z-10" />
        <main className='min-h-screen'>{children}</main>
        <footer className="bg-brown-300 py-12 opacity-70">
          <div className="container mx-auto px-4 text-center text-black-900">
          <p>Made with 💟  by Prarthana</p></div>
        </footer>
      </body>
    </html>
    </ClerkProvider>
  );
}
