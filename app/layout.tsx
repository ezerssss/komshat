import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'komshat weekly hackathons',
    description: 'komshat weekly hackathons by the students for the students',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {children}
                <Toaster />
            </body>
        </html>
    )
}
