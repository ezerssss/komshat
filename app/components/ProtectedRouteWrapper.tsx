'use client'

import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import auth from '../firebase/auth'
import { useRouter } from 'next/navigation'
import { PacmanLoader } from 'react-spinners'

interface PropsInterface {
    children: React.ReactNode
}

function ProtectedRouteWrapper(props: PropsInterface) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const router = useRouter()

    useEffect(() => {
        return onAuthStateChanged(auth, async (user) => {
            setIsAuthenticated(!!user)

            if (!user) {
                router.replace('/')
            }
        })
    }, [router])

    return isAuthenticated ? (
        <>{props.children}</>
    ) : (
        <div className="flex h-[80svh] flex-col items-center justify-center">
            <PacmanLoader />
            <p className="mt-2 text-sm text-gray-400">Authenticating</p>
        </div>
    )
}

export default ProtectedRouteWrapper
