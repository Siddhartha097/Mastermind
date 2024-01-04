import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ['latin'], weight: ['500'] })
const poppins = Poppins({ subsets: ['latin'], weight: ['500'] })

export const metadata: Metadata = {
  title: 'Mastermind',
  description: 'AI Generation Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
