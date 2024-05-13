import useAdmin from '@/app/hooks/useAdmin'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import { ScaleLoader } from 'react-spinners'
import ParticipantRow from './ParticipantRow'
import ProjectRow from './ProjectRow'

interface PropsInterface {
    selectedHackathon: string
}

function ParticipanProjectList(props: PropsInterface) {
    const { selectedHackathon } = props

    const { participants, isParticipantsLoading, projects, isProjectsLoading } =
        useAdmin({
            hackathonID: selectedHackathon,
            getParticipants: true,
            getProjects: true,
        })

    return (
        <>
            <section className="space-y-4">
                <h2 className="text-2xl font-extrabold">Participants list</h2>
                <Card>
                    <div className="grid min-w-[1200px] grid-cols-4 items-center gap-x-10 gap-y-4 text-pretty px-5 py-3 text-center text-sm text-gray-400">
                        <p>Captain ID</p>
                        <p>Team Name</p>
                        <p>Members</p>
                        <p>Action</p>
                    </div>
                    <Separator className="min-w-[1200px]" />
                    {!selectedHackathon && (
                        <div className="flex items-center justify-center p-10 font-bold">
                            Select a specific hackathon
                        </div>
                    )}

                    {selectedHackathon && isParticipantsLoading && (
                        <div className="flex justify-center p-5">
                            <ScaleLoader />
                        </div>
                    )}

                    {selectedHackathon && (
                        <div className="grid min-w-[1200px] grid-cols-4 items-center gap-x-10 gap-y-4 text-pretty px-5 py-3 text-center text-sm">
                            {participants.map((participant) => (
                                <ParticipantRow
                                    {...participant}
                                    key={participant.captainID}
                                />
                            ))}
                        </div>
                    )}

                    {selectedHackathon &&
                        !isParticipantsLoading &&
                        participants.length < 1 && (
                            <div className="flex items-center justify-center p-10 pt-4 font-bold">
                                No participants
                            </div>
                        )}
                </Card>
            </section>
            <section className="space-y-4">
                <h2 className="text-2xl font-extrabold">Projects list</h2>
                <Card>
                    <div className="grid min-w-[1200px] grid-cols-10 items-center gap-x-10 gap-y-4 text-pretty px-5 py-3 text-center text-sm text-gray-400">
                        <p>Project ID</p>
                        <p>Captain ID</p>
                        <p>Title</p>
                        <p className="col-span-2">Description</p>
                        <p>GitHub</p>
                        <p>YouTube</p>
                        <p>Hearts</p>
                        <p>Date Submitted</p>
                        <p>Action</p>
                    </div>
                    <Separator className="min-w-[1200px]" />
                    {!selectedHackathon && (
                        <div className="flex items-center justify-center p-10 font-bold">
                            Select a specific hackathon
                        </div>
                    )}

                    {selectedHackathon && isProjectsLoading && (
                        <div className="flex justify-center p-5">
                            <ScaleLoader />
                        </div>
                    )}

                    {selectedHackathon && (
                        <div className="grid min-w-[1200px] grid-cols-10 items-center gap-x-10 gap-y-4 text-pretty px-5 py-3 text-center text-sm">
                            {projects.map((project) => (
                                <ProjectRow
                                    {...project}
                                    key={project.projectID}
                                />
                            ))}
                        </div>
                    )}

                    {selectedHackathon &&
                        !isProjectsLoading &&
                        projects.length < 1 && (
                            <div className="flex items-center justify-center p-10 pt-4 font-bold">
                                No projects
                            </div>
                        )}
                </Card>
            </section>
        </>
    )
}

export default ParticipanProjectList
