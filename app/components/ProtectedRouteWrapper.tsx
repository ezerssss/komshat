'use client'

import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import auth from '../firebase/auth'
import { PacmanLoader } from 'react-spinners'
import { Button } from '@/components/ui/button'
import useLogin from '../hooks/useLogin'
import { Loader2 } from 'lucide-react'
import GoogleIcon from '../icons/GoogleIcon'

interface PropsInterface {
    children: React.ReactNode
    delay?: boolean
}

function ProtectedRouteWrapper(props: PropsInterface) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const { signIn, isLoading: isSigningIn } = useLogin()

    useEffect(() => {
        return onAuthStateChanged(auth, async (user) => {
            if (props.delay) {
                await new Promise((resolve) => setTimeout(resolve, 2000))
            }

            setIsAuthenticated(!!user)
            setIsLoading(false)
        })
    }, [props.delay])

    const content: JSX.Element = isAuthenticated ? (
        <>{props.children}</>
    ) : (
        <div className="flex h-[80svh] flex-col items-center justify-center">
            <Button
                className="flex w-[189px] items-center gap-2"
                disabled={isSigningIn}
                onClick={() => signIn()}
            >
                {isSigningIn ? (
                    <Loader2 className="animate-spin" />
                ) : (
                    <>
                        <GoogleIcon className="w-5 fill-white" />
                        Sign in with Google
                    </>
                )}
            </Button>
            <p className="mt-4 text-sm text-gray-400">
                You need to be logged in to access this page.
            </p>
        </div>
    )

    return isLoading ? (
        <div className="flex h-[80svh] flex-col items-center justify-center">
            <PacmanLoader />
            <p className="mt-2 text-sm text-gray-400">Authenticating</p>
        </div>
    ) : (
        content
    )
}

export default ProtectedRouteWrapper
