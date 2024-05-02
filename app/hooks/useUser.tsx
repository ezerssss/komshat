import { User, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import auth from '../firebase/auth'

export default function useUser() {
    const [user, setUser] = useState<User | null>()

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            setUser(user)
        })
    }, [])

    return user
}
