'use client'

import useParticipants from '@/app/hooks/useParticipants'
import Project from './Project'
import { Participant } from './Participant'
import ParticipantsSkeleton from './ParticipantsSkeleton'
import ProjectsSkeleton from './ProjectsSkeleton'

interface PropsInterface {
    hackathonID?: string
}

function Participants(props: PropsInterface) {
    const {
        participants,
        isParticipantsLoading,
        projects,
        isProjectsLoading,
        winningProjectID,
        winningCaptainID,
        isWithinDeadline,
    } = useParticipants(props.hackathonID)

    return (
        <section className="px-5 sm:px-14">
            <h2 className="text-3xl font-semibold">Participants</h2>
            {isParticipantsLoading && <ParticipantsSkeleton />}
            {!isParticipantsLoading && participants.length < 1 && (
                <p className="mt-4 text-gray-400">No participants</p>
            )}
            <div className="my-5 flex flex-wrap gap-4">
                {participants.map((participant) => (
                    <Participant
                        key={participant.captainID}
                        winningCaptainID={winningCaptainID}
                        isWithinDeadline={isWithinDeadline}
                        {...participant}
                    />
                ))}
            </div>

            <h2 className="mt-14 text-3xl font-semibold">Projects submitted</h2>
            {isProjectsLoading && <ProjectsSkeleton />}
            {!isProjectsLoading && projects.length < 1 && (
                <p className="mb-10 mt-4 text-gray-400">No submissions</p>
            )}
            {projects.map((project) => (
                <Project
                    key={project.projectID}
                    winningProjectID={winningProjectID}
                    {...project}
                />
            ))}
        </section>
    )
}

export default Participants
