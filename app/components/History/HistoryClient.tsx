'use client'

import InfiniteScroll from 'react-infinite-scroll-component'
import useHistory from '@/app/hooks/useHistory'
import HackathonCard from './HackathonCard'
import { GridLoader } from 'react-spinners'

function HistoryClient() {
    const { hackathons, isLoading, getNextData, totalHackathons } = useHistory()

    return (
        <>
            <section className="relative mb-5 flex h-[300px] w-full items-center justify-center sm:mb-8 sm:h-[450px]">
                <div className="z-10 flex h-[50px] w-full items-center justify-center bg-white text-2xl font-extrabold sm:h-[90px] sm:text-5xl">
                    <h1>Past Hackathons</h1>
                </div>
                <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[300px] font-extrabold sm:text-[500px]">
                    {isLoading ? '' : totalHackathons}
                </p>
            </section>
            <section className="relative">
                <div className="absolute -top-20 flex w-full items-center justify-center ">
                    {isLoading && <GridLoader />}
                </div>
                <InfiniteScroll
                    dataLength={totalHackathons}
                    next={getNextData}
                    loader={<p>Loading...</p>}
                    hasMore={hackathons.length < totalHackathons}
                    className="flex flex-wrap justify-center gap-x-10 gap-y-8"
                >
                    {hackathons.map((hackathon, index) => (
                        <HackathonCard
                            key={hackathon.hackathonID}
                            index={index + 1}
                            {...hackathon}
                        />
                    ))}
                </InfiniteScroll>
            </section>
        </>
    )
}

export default HistoryClient
