import { useEffect, useState } from 'react'
import { HackathonConfigInterface } from '../types/HackathonInterface'
import { collection, doc, onSnapshot } from 'firebase/firestore'
import db from '../firebase/db'

const configCollectionRef = collection(db, 'config')
const hackathonConfigDocRef = doc(configCollectionRef, 'hackathon')

function useAdmin() {
    const [hackathonConfig, setHackathonConfig] =
        useState<HackathonConfigInterface>()

    useEffect(() => {
        const unsub = onSnapshot(hackathonConfigDocRef, (doc) => {
            const config = doc.data() as HackathonConfigInterface

            console.log(config)

            setHackathonConfig(config)
        })

        return () => unsub()
    }, [])

    return { hackathonConfig }
}

export default useAdmin
