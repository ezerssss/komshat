import Theme from '@/app/components/Theme'
import Participants from '@/app/components/Home/Participants'
import { genericMetadata } from '@/app/constants/metadata'
import db from '@/app/firebase/db'
import { HackathonInterface } from '@/app/types/HackathonInterface'
import { collection, query, where, limit, getDocs } from 'firebase/firestore'
import { ResolvingMetadata, Metadata } from 'next'
import { ProjectInterface } from '@/app/types/ProjectInterface'

export async function generateMetadata(
    {
        params,
        searchParams,
    }: {
        params: { hackathonID: string }
        searchParams: { [key: string]: string | string[] | undefined }
    },
    parent: ResolvingMetadata
): Promise<Metadata> {
    if (!params.hackathonID) {
        return genericMetadata
    }

    const hackathonID = params.hackathonID

    const hackathonsCollectionRef = collection(db, 'hackathons')

    const q = query(
        hackathonsCollectionRef,
        where('hackathonID', '==', hackathonID),
        limit(1)
    )

    const results = await getDocs(q)

    if (results.empty) {
        return genericMetadata
    }

    const hackathon = results.docs[0].data() as HackathonInterface

    if (searchParams.projectID) {
        const projectsCollectionRef = collection(db, 'projects')

        const projectQuery = query(
            projectsCollectionRef,
            where('hackathonID', '==', hackathonID),
            where('projectID', '==', searchParams.projectID),
            limit(1)
        )

        const projectResult = await getDocs(projectQuery)

        if (!projectResult.empty) {
            const project = projectResult.docs[0].data() as ProjectInterface

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
    }

    return {
        title: hackathon.theme,
        description: hackathon.description,
        openGraph: {
            title: hackathon.theme,
            description: hackathon.description,
            siteName: 'komshat',
            type: 'article',
            images: [
                {
                    url: 'https://komshat.vercel.app/komshat.png',
                },
            ],
            locale: 'en_US',
        },
        icons: {
            icon: '/icon.png',
        },
    }
}

function page({ params }: { params: { hackathonID: string } }) {
    return (
        <>
            <main className="flex items-center gap-20 overflow-hidden px-5 pb-20 sm:px-14">
                <div className="min-w-[50%]">
                    <Theme hackathonID={params.hackathonID} />
                </div>
                <aside className="marquee hidden max-h-[500px] flex-1 items-center overflow-hidden text-[400px] font-extrabold lg:flex">
                    <div className="mv-org flex gap-x-20">
                        <p>komshat</p>
                        <p>x</p>
                        <p>miagao</p>
                        <p>valley</p>
                    </div>
                </aside>
            </main>
            <Participants hackathonID={params.hackathonID} />
        </>
    )
}

export default page
