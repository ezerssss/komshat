'use client'

import Countdown from 'react-countdown'
import useHackathon from '../hooks/useHackathon'
import { Skeleton } from '@/components/ui/skeleton'
import { useMemo } from 'react'

function Theme() {
    const { hackathon, isLoading } = useHackathon()

    const currentDate = useMemo(() => new Date(), [])
    const isInSubmissionsPhase = useMemo(
        () => !!hackathon && hackathon.dateSubmissionEnd.toDate() > currentDate,
        [hackathon, currentDate]
    )

    return (
        <div className="text-pretty">
            <div className="max-w-[500px]">
                <section className="mt-8">
                    <p className="mb-2 text-gray-400">
                        This week&apos;s theme:
                    </p>
                    <h2 className="italic">
                        {isLoading ? (
                            <Skeleton className="h-6 w-full" />
                        ) : (
                            hackathon?.theme
                        )}
                    </h2>
                </section>
                <section className="mt-8">
                    <p className="mb-2 text-gray-400">Description:</p>
                    <h2>
                        {isLoading ? (
                            <div className="space-y-2">
                                <Skeleton className="h-6 w-full" />
                                <Skeleton className="h-6 w-full" />
                                <Skeleton className="h-6 w-1/3" />
                            </div>
                        ) : (
                            hackathon?.description
                        )}
                    </h2>
                </section>
                <section className="mt-8">
                    <p className="mb-2 text-gray-400">Suggested Ideas:</p>
                    <ul className="list-inside list-disc">
                        {isLoading ? (
                            <div className="space-y-2">
                                <Skeleton className="h-6 w-full" />
                                <Skeleton className="h-6 w-full" />
                                <Skeleton className="h-6 w-full" />
                            </div>
                        ) : (
                            hackathon?.ideas.map((idea, index) => (
                                <li key={index}>{idea}</li>
                            ))
                        )}
                    </ul>
                </section>
                <section className="mt-8 flex items-center gap-2">
                    {isLoading || !hackathon ? (
                        <Skeleton className="h-6 w-full" />
                    ) : (
                        <>
                            <p className="text-gray-400">
                                {isInSubmissionsPhase
                                    ? 'Submissions until:'
                                    : 'Voting until:'}
                            </p>
                            <Countdown
                                date={
                                    isInSubmissionsPhase
                                        ? hackathon.dateSubmissionEnd.toDate()
                                        : hackathon.dateEnd.toDate()
                                }
                            >
                                <p>end</p>
                            </Countdown>
                        </>
                    )}
                </section>
            </div>
        </div>
    )
}

export default Theme
