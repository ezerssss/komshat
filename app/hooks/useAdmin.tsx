import { useEffect, useState } from 'react'
import {
    HackathonConfigInterface,
    HackathonInterface,
} from '../types/HackathonInterface'
import {
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
    where,
} from 'firebase/firestore'
import db from '../firebase/db'
import { ParticipantInterface } from '../types/ParticipantInterface'
import { ProjectInterface } from '../types/ProjectInterface'

const configCollectionRef = collection(db, 'config')
const hackathonConfigDocRef = doc(configCollectionRef, 'hackathon')

const hackathonCollectionRef = collection(db, 'hackathons')
const participantsCollectionRef = collection(db, 'participants')
const projectsCollectionRef = collection(db, 'projects')

interface ParamterInterface {
    getConfig?: boolean
    getHackathons?: boolean
    hackathonID?: string
    getParticipants?: boolean
    getProjects?: boolean
}

function useAdmin({
    getConfig,
    getHackathons,
    hackathonID,
    getParticipants,
    getProjects,
}: ParamterInterface) {
    const [hackathonConfig, setHackathonConfig] =
        useState<HackathonConfigInterface>()

    const [hackathons, setHackathons] = useState<HackathonInterface[]>([])
    const [isHackathonsLoading, setIsHackathonsLoading] = useState(true)

    const [participants, setParticipants] = useState<ParticipantInterface[]>([])
    const [isParticipantsLoading, setIsParticipantsLoading] = useState(true)

    const [projects, setProjects] = useState<ProjectInterface[]>([])
    const [isProjectsLoading, setIsProjectsLoading] = useState(true)

    useEffect(() => {
        if (!getConfig) {
            return
        }

        const unsub = onSnapshot(hackathonConfigDocRef, (doc) => {
            const config = doc.data() as HackathonConfigInterface

            setHackathonConfig(config)
        })

        return () => unsub()
    }, [getConfig])

    useEffect(() => {
        if (!getHackathons) {
            return
        }

        const hackathonsQuery = query(
            hackathonCollectionRef,
            orderBy('dateStart', 'desc')
        )

        const unsub = onSnapshot(hackathonsQuery, (query) => {
            const results: HackathonInterface[] = []

            query.forEach((doc) => {
                const data = doc.data() as HackathonInterface
                results.push(data)
            })

            setHackathons(results)
            setIsHackathonsLoading(false)
        })

        return () => unsub()
    }, [getHackathons])

    useEffect(() => {
        if (!getParticipants || !hackathonID) {
            return
        }

        const participantsQuery = query(
            participantsCollectionRef,
            where('hackathonID', '==', hackathonID)
        )

        const unsub = onSnapshot(participantsQuery, (query) => {
            const results: ParticipantInterface[] = []

            query.forEach((doc) => {
                const data = doc.data() as ParticipantInterface
                results.push(data)
            })

            setParticipants(results)
            setIsParticipantsLoading(false)
        })

        return () => unsub()
    }, [getParticipants, hackathonID])

    useEffect(() => {
        if (!getProjects || !hackathonID) {
            return
        }

        const projectsCollectionQuery = query(
            projectsCollectionRef,
            where('hackathonID', '==', hackathonID)
        )

        const unsub = onSnapshot(projectsCollectionQuery, (query) => {
            const results: ProjectInterface[] = []

            query.forEach((doc) => {
                const data = doc.data() as ProjectInterface
                results.push(data)
            })

            setProjects(results)
            setIsProjectsLoading(false)
        })

        return () => unsub()
    }, [getProjects, hackathonID])

    return {
        hackathonConfig,
        hackathons,
        isHackathonsLoading,
        participants,
        isParticipantsLoading,
        projects,
        isProjectsLoading,
    }
}

export default useAdmin
