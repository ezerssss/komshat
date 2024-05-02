import { useEffect, useMemo, useState } from 'react'
import { HackathonInterface } from '../types/HackathonInterface'
import {
    collection,
    getDocs,
    limit,
    orderBy,
    query,
    where,
} from 'firebase/firestore'
import db from '../firebase/db'
import { saveHackatonIDToLocal, toastError } from '@/lib/utils'
import useUser from './useUser'

const hackathonsCollectionRef = collection(db, 'hackathons')
const participantsCollectionRef = collection(db, 'participants')
const projectsCollectionRef = collection(db, 'projects')

function useHackathon(id: string = '') {
    const user = useUser()

    const [isParticipant, setIsParticipant] = useState(false)
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [hackathon, setHackathon] = useState<HackathonInterface | null>(null)

    const currentDate = useMemo(() => new Date(), [])
    const isWithinDeadline: boolean = useMemo(
        () =>
            !!user &&
            !!hackathon &&
            currentDate < hackathon.dateSubmissionEnd.toDate(),
        [hackathon, currentDate]
    )

    useEffect(() => {
        ;(async () => {
            if (user && hackathon) {
                const participantQuery = query(
                    participantsCollectionRef,
                    where('hackathonID', '==', hackathon.hackathonID),
                    where('captainID', '==', user.uid),
                    limit(1)
                )

                const result = await getDocs(participantQuery)

                const projectQuery = query(
                    projectsCollectionRef,
                    where('hackathonID', '==', hackathon.hackathonID),
                    where('captainID', '==', user.uid),
                    limit(1)
                )

                const project = await getDocs(projectQuery)

                setIsParticipant(!result.empty)
                setHasSubmitted(!project.empty)
            }
        })()
    }, [user, hackathon])

    async function getLatestHackathon() {
        try {
            setIsLoading(true)

            const latestQuery = query(
                hackathonsCollectionRef,
                orderBy('dateStart', 'desc'),
                limit(1)
            )

            const results = await getDocs(latestQuery)
            const latest = results.docs[0]
            const data = latest.data() as HackathonInterface

            setHackathon(data)

            saveHackatonIDToLocal(data.hackathonID)
        } catch (error) {
            toastError(error)
        } finally {
            setIsLoading(false)
        }
    }

    async function getHackathon(id: string) {
        try {
            const q = query(
                hackathonsCollectionRef,
                where('hackathonID', '==', id)
            )

            const results = await getDocs(q)
            results.forEach((doc) => {
                const data = doc.data() as HackathonInterface

                setHackathon(data)
            })
        } catch (error) {
            toastError(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (id) {
            getHackathon(id)
        } else {
            getLatestHackathon()
        }
    }, [id])

    return {
        hackathon,
        isWithinDeadline,
        isLoading,
        isParticipant,
        setIsParticipant,
        setHasSubmitted,
        hasSubmitted,
    }
}

export default useHackathon
