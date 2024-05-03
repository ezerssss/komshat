import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import Navbar from './components/Navbar'
import { WebVitals } from './components/web-vitals'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'komshat',
    description:
        'Weekly hackathon challenge! Build and create projects based around an automatically generated theme.',
    openGraph: {
        title: 'komshat',
        description:
            'Weekly hackathon challenge! Build and create projects based around an automatically generated theme.',
        siteName: 'komshat',
        type: 'article',
        images: [
            {
                url: 'https://komshat.vercel.app/komshat.png',
                width: 1152,
                height: 648,
            },
        ],
        locale: 'en_US',
    },
    icons: {
        icon: '/icon.png',
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <WebVitals />
                <Analytics />
                <SpeedInsights />
                <header>
                    <Navbar />
                </header>
                {children}
                <Toaster richColors />
            </body>
        </html>
    )
}
