'use client'

import JoinForm from '../components/Join/JoinForm'
import ProtectedRouteWrapper from '../components/ProtectedRouteWrapper'
import Theme from '../components/Theme'

function Join() {
    return (
        <ProtectedRouteWrapper>
            <main className="items-stretch gap-20 overflow-hidden px-5 pb-20 pt-10 sm:px-14 lg:flex">
                <div>
                    <h1 className="text-4xl font-bold sm:text-5xl">
                        Join Hackathon
                    </h1>
                    <div className="min-w-[50%]">
                        <Theme />
                    </div>
                </div>
                <div className="mt-10 lg:flex-1">
                    <JoinForm />
                </div>
            </main>
        </ProtectedRouteWrapper>
    )
}

export default Join
