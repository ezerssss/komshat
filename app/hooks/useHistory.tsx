import { useEffect, useState } from 'react'
import { HackathonInterface } from '../types/HackathonInterface'
import { toastError } from '@/lib/utils'
import {
    Timestamp,
    collection,
    getCountFromServer,
    getDocs,
    limit,
    orderBy,
    query,
    startAfter,
    where,
} from 'firebase/firestore'
import db from '../firebase/db'

const hackathonsCollectionRef = collection(db, 'hackathons')

function useHistory() {
    const [totalHackathons, setTotalHackathons] = useState(0)
    const [hackathons, setHackathons] = useState<HackathonInterface[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const currentDate = new Date()

    useEffect(() => {
        ;(async () => {
            try {
                const promises: Promise<any>[] = []

                const totalCountQuery = query(
                    hackathonsCollectionRef,
                    where('dateEnd', '<', Timestamp.now()),
                    orderBy('dateEnd', 'desc')
                )

                promises.push(getCountFromServer(totalCountQuery))

                const paginatedQuery = query(
                    hackathonsCollectionRef,
                    where('dateEnd', '<', Timestamp.now()),
                    orderBy('dateEnd', 'desc'),
                    limit(10)
                )

                promises.push(getDocs(paginatedQuery))

                const res = await Promise.all(promises)

                const totalCount = res[0]

                setTotalHackathons(totalCount.data().count)

                const hackathonsDocs = res[1].docs

                const hackathonArray: HackathonInterface[] = []

                for (const doc of hackathonsDocs) {
                    const hackathon = doc.data() as HackathonInterface

                    hackathonArray.push(hackathon)
                }

                setHackathons(hackathonArray)
            } catch (error) {
                toastError(error)
            } finally {
                setIsLoading(false)
            }
        })()
    }, [])

    async function getNextData() {
        try {
            setIsLoading(true)
            const q = query(
                hackathonsCollectionRef,
                orderBy('dateEnd', 'desc'),
                startAfter(hackathons.length),
                limit(10)
            )

            const snapshot = await getDocs(q)

            const hackathonArray: HackathonInterface[] = hackathons

            for (const doc of snapshot.docs) {
                const hackathon = doc.data() as HackathonInterface

                if (currentDate > hackathon.dateEnd.toDate()) {
                    hackathonArray.push(hackathon)
                }
            }

            setHackathons(hackathonArray)
        } catch (error) {
            toastError(error)
        } finally {
            setIsLoading(false)
        }
    }

    return { hackathons, isLoading, getNextData, totalHackathons }
}

export default useHistory
