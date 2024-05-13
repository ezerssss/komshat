'use client'

import useAdmin from '@/app/hooks/useAdmin'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import { ScaleLoader } from 'react-spinners'
import HackathonRow from './HackathonRow'

function List() {
    const { hackathons, isHackathonsLoading } = useAdmin({ configOnly: false })

    return (
        <>
            <section className="space-y-4">
                <h2 className="text-2xl font-extrabold">Hackathons list</h2>
                <Card className="overflow-x-auto">
                    <div className="grid min-w-[1200px] grid-cols-10 items-center gap-x-10 gap-y-4 text-pretty px-5 py-3 text-center text-sm text-gray-400">
                        <p>ID</p>
                        <p className="col-span-2">Date Details</p>
                        <p>Winning Project ID</p>
                        <p className="col-span-2">Theme</p>
                        <p className="col-span-2">Description</p>
                        <p>Ideas</p>
                        <p>Action</p>
                    </div>
                    <Separator className="min-w-[1200px]" />
                    {isHackathonsLoading && (
                        <div className="flex justify-center py-5">
                            <ScaleLoader />
                        </div>
                    )}
                    <div className="grid min-w-[1200px] grid-cols-10 gap-x-10 gap-y-4 text-pretty px-5 py-3 text-center text-sm">
                        {hackathons.map((hackathon) => (
                            <HackathonRow
                                key={hackathon.hackathonID}
                                {...hackathon}
                            />
                        ))}
                    </div>
                </Card>
            </section>
        </>
    )
}

export default List
