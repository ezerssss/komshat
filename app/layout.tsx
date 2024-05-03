import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import Navbar from './components/Navbar'
import { WebVitals } from './components/web-vitals'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'komshat',
    description:
        'Weekly hackathon challenge! Build and create projects based around an automatically generated theme.',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/icon.png" type="image/.png" />
            </head>
            <body className={inter.className}>
                <WebVitals />
                <Analytics />
                <header>
                    <Navbar />
                </header>
                {children}
                <Toaster richColors />
            </body>
        </html>
    )
}
