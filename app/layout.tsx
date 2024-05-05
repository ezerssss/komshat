import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import Navbar from './components/Navbar'
import { WebVitals } from './components/web-vitals'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ subsets: ['latin'] })

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
