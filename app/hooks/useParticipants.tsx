import { useEffect, useState } from 'react'
import useHackathon from './useHackathon'
import { ParticipantInterface } from '../types/ParticipantInterface'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import db from '../firebase/db'
import { toastError } from '@/lib/utils'
import { ProjectInterface } from '../types/ProjectInterface'

const participantsCollectionsRef = collection(db, 'participants')
const projectsCollectionRef = collection(db, 'projects')

function useParticipants() {
    const { hackathon } = useHackathon()

    const [participants, setParticipants] = useState<ParticipantInterface[]>([])
    const [isParticipantsLoading, setIsParticipantsLoading] = useState(true)

    const [projects, setProjects] = useState<ProjectInterface[]>([])
    const [isProjectsLoading, setIsProjectsLoading] = useState(true)

    async function getParticipants() {
        if (!hackathon) {
            return
        }

        try {
            const q = query(
                participantsCollectionsRef,
                where('hackathonID', '==', hackathon.hackathonID)
            )

            const docs = await getDocs(q)

            const participantsData: ParticipantInterface[] = []

            docs.forEach((doc) => {
                const data = doc.data() as ParticipantInterface

                participantsData.push(data)
            })

            setParticipants(participantsData)
        } catch (error) {
            toastError(error)
        } finally {
            setIsParticipantsLoading(false)
        }
    }

    async function getProjects() {
        if (!hackathon) {
            return
        }

        try {
            const q = query(
                projectsCollectionRef,
                where('hackathonID', '==', hackathon.hackathonID),
                orderBy('hearts', 'desc')
            )

            const docs = await getDocs(q)

            const projectsData: ProjectInterface[] = []

            docs.forEach((doc) => {
                const data = doc.data() as ProjectInterface

                projectsData.push(data)
            })

            setProjects(projectsData)
        } catch (error) {
            toastError(error)
        } finally {
            setIsProjectsLoading(false)
        }
    }

    useEffect(() => {
        if (!hackathon) {
            return
        }

        getParticipants()
        getProjects()
    }, [hackathon])

    return { participants, isParticipantsLoading, projects, isProjectsLoading }
}

export default useParticipants
