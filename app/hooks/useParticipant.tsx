import { useEffect, useState } from 'react'
import { ParticipantInterface } from '../types/ParticipantInterface'
import { toastError } from '@/lib/utils'
import { query, where, getDocs, collection, limit } from 'firebase/firestore'
import db from '../firebase/db'

const participantsCollectionsRef = collection(db, 'participants')

function useParticipant(userID?: string, hackathonID?: string) {
    const [participant, setParticipant] = useState<ParticipantInterface>()
    const [isLoading, setIsLoading] = useState(true)

    async function getParticipant() {
        if (!userID || !hackathonID) {
            return
        }

        try {
            const q = query(
                participantsCollectionsRef,
                where('hackathonID', '==', hackathonID),
                where('captainID', '==', userID),
                limit(1)
            )

            const result = await getDocs(q)

            if (result.empty) {
                return
            }

            const participantData =
                result.docs[0].data() as ParticipantInterface

            setParticipant(participantData)
        } catch (error) {
            toastError(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getParticipant()
    }, [userID, hackathonID])

    return { participant, isLoading }
}

export default useParticipant
