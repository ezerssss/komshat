import type { Metadata, ResolvingMetadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import Navbar from './components/Navbar'
import { WebVitals } from './components/web-vitals'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { query, where, limit, getDocs, collection } from 'firebase/firestore'
import db from './firebase/db'
import { ProjectInterface } from './types/ProjectInterface'

const inter = Inter({ subsets: ['latin'] })

const metadata: Metadata = {
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

type Props = {
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
    { searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    if (!searchParams || !searchParams.projectID || !searchParams.hackathonID) {
        return metadata
    }

    const projectsCollectionRef = collection(db, 'projects')

    const q = query(
        projectsCollectionRef,
        where('hackathonID', '==', searchParams.hackathonID),
        where('projectID', '==', searchParams.projectID),
        limit(1)
    )

    const results = await getDocs(q)

    if (results.empty) {
        return metadata
    }

    const project = results.docs[0].data() as ProjectInterface

    return {
        title: project.title,
        description: project.description,
        openGraph: {
            title: project.title,
            description: project.description,
            siteName: 'komshat',
            type: 'article',
            images: [
                {
                    url: project.images[0].url,
                },
            ],
            locale: 'en_US',
        },
        icons: {
            icon: '/icon.png',
        },
    }
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
