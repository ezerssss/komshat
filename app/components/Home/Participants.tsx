'use client'

import Project from './Project'
import { projectsMockData } from '@/app/constants/mockData'

function Participants() {
    return (
        <section className="px-5 sm:px-14">
            <h2 className="text-3xl font-semibold">Participants</h2>
            {projectsMockData.map((project) => (
                <Project key={project.projectID} {...project} />
            ))}
        </section>
    )
}

export default Participants
