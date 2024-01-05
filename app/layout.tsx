import type { Metadata } from 'next'
import { Inter, Poppins, Montserrat } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs';
import ToasterProvider from '@/components/ToasterProvider';

const inter = Inter({ subsets: ['latin'], weight: ['500'] })
const poppins = Poppins({ subsets: ['latin'], weight: ['500'] })
const montserrat = Montserrat({ subsets: ['latin'], weight: ['500'] })

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
        <body className={montserrat.className}>
          <ToasterProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
