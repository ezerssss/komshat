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
                <meta property="og:title" content="komshat" />
                <meta name="twitter:title" content="komshat" />
                <meta
                    property="og:description"
                    content="Weekly hackathon challenge! Build and create projects based around an automatically generated theme."
                />
                <meta
                    property="twitter:description"
                    content="Weekly hackathon challenge! Build and create projects based around an automatically generated theme."
                />
                <meta
                    property="og:image"
                    content="https://komshat.vercel.app/banner.png"
                />
                <meta property="og:image:width" content="1152" />
                <meta property="og:image:height" content="648" />
                <meta
                    property="twitter:image"
                    content="https://komshat.vercel.app/banner.png"
                />
                <meta property="og:url" content="https://komshat.vercel.app/" />
                <meta property="og:type" content="website" />
            </head>
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
