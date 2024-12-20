import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Emotion Detection AI',
  description: 'Uncover the emotions hidden in your text with advanced AI technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#1a1a1a]  text-white`}>
        <nav className="bg-gray-900 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-white text-xl font-bold">Emotion AI</Link>
            <div className="space-x-4">
              <Link href="/predict" className="text-white hover:text-blue-400">Try Now</Link>
              <Link href="/docs" className="text-white hover:text-blue-400">API Docs</Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}

