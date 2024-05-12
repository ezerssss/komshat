import { Metadata } from 'next'
import JoinForm from '../components/Join/JoinForm'
import ProtectedRouteWrapper from '../components/ProtectedRouteWrapper'
import Theme from '../components/Theme'
import { genericMetadata } from '../constants/metadata'

export const metadata: Metadata = {
    ...genericMetadata,
    title: "komshat | Join this week's hackathon",
    openGraph: {
        ...genericMetadata.openGraph,
        title: "komshat | Join this week's hackathon",
        description: "Join this weeek's hackathon",
    },
}

function Join() {
    return (
        <ProtectedRouteWrapper>
            <main className="items-stretch gap-20 overflow-hidden px-5 pb-20 pt-10 sm:px-14 lg:flex">
                <div className="min-w-[50%]">
                    <h1 className="text-4xl font-bold sm:text-5xl">
                        Join Hackathon
                    </h1>
                    <Theme />
                </div>
                <div className="mt-10 lg:mt-0 lg:flex-1">
                    <JoinForm />
                </div>
            </main>
        </ProtectedRouteWrapper>
    )
}

export default Join
