import { useEffect, useMemo, useState } from 'react'
import { HackathonInterface } from '../types/HackathonInterface'
import {
    DocumentData,
    QuerySnapshot,
    Timestamp,
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
    const [isChecking, setIsChecking] = useState(true)
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [hackathon, setHackathon] = useState<HackathonInterface | null>(null)

    const currentDate = useMemo(() => new Date(), [])
    const isWithinDeadline: boolean = useMemo(
        () =>
            !!hackathon &&
            currentDate < hackathon.dateSubmissionEnd.toDate(),
        [hackathon, currentDate, user]
    )

    useEffect(() => {
        ;(async () => {
            if (user && hackathon) {
                const promises: Promise<
                    QuerySnapshot<DocumentData, DocumentData>
                >[] = []

                const participantQuery = query(
                    participantsCollectionRef,
                    where('hackathonID', '==', hackathon.hackathonID),
                    where('captainID', '==', user.uid),
                    limit(1)
                )

                promises.push(getDocs(participantQuery))

                const projectQuery = query(
                    projectsCollectionRef,
                    where('hackathonID', '==', hackathon.hackathonID),
                    where('captainID', '==', user.uid),
                    limit(1)
                )

                promises.push(getDocs(projectQuery))

                const response = await Promise.all(promises)

                const participantResult = response[0]
                const projectResult = response[1]

                setIsParticipant(!participantResult.empty)
                setHasSubmitted(!projectResult.empty)

                setIsChecking(false)
            }
        })()
    }, [user, hackathon])

    async function getLatestHackathon() {
        try {
            setIsLoading(true)

            const latestQuery = query(
                hackathonsCollectionRef,
                where('dateStart', '<=', Timestamp.now()),
                where('dateEnd', '>', Timestamp.now()),
                orderBy('dateStart', 'desc'),
                limit(1)
            )

            let results = await getDocs(latestQuery)

            if (results.empty) {
                const modifiedQuery = query(
                    hackathonsCollectionRef,
                    where('dateEnd', '<=', Timestamp.now()),
                    orderBy('dateEnd', 'desc'),
                    limit(1)
                )

                results = await getDocs(modifiedQuery)
            }

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
                where('hackathonID', '==', id),
                limit(1)
            )

            const results = await getDocs(q)
            const data = results.docs[0].data() as HackathonInterface

            setHackathon(data)
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
        isChecking,
    }
}

export default useHackathon
