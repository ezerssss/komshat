import Theme from '@/app/components/Theme'
import Participants from '@/app/components/Home/Participants'
import { genericMetadata } from '@/app/constants/metadata'
import db from '@/app/firebase/db'
import { HackathonInterface } from '@/app/types/HackathonInterface'
import { collection, query, where, limit, getDocs } from 'firebase/firestore'
import { ResolvingMetadata, Metadata } from 'next'

export async function generateMetadata(
    { params }: { params: { hackathonID: string } },
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
        <main className="px-5 pb-20 pt-10 sm:px-14">
            <main className="flex items-center gap-20 overflow-hidden px-5 pb-20 pt-10 sm:px-14">
                <div className="min-w-[50%]">
                    <Theme hackathonID={params.hackathonID} />
                </div>
                <aside className="marquee hidden max-h-[500px] flex-1 items-center overflow-hidden text-[500px] font-extrabold lg:flex">
                    <p>komshat</p>
                </aside>
            </main>
            <Participants hackathonID={params.hackathonID} />
        </main>
    )
}

export default page
