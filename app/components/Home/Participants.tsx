'use client'

import useParticipants from '@/app/hooks/useParticipants'
import Project from './Project'
import { Participant } from './Participant'

function Participants() {
    const { participants, projects } = useParticipants()

    return (
        <section className="px-5 sm:px-14">
            <h2 className="text-3xl font-semibold">Participants</h2>

            <div className="my-5 flex flex-wrap gap-4">
                {participants.map((participant) => (
                    <Participant key={participant.captainID} {...participant} />
                ))}
            </div>

            <h2 className="mt-14 text-3xl font-semibold">Projects submitted</h2>
            {projects.map((project) => (
                <Project key={project.projectID} {...project} />
            ))}
        </section>
    )
}

export default Participants
