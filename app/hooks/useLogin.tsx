import { toastError } from '@/lib/utils'
import { logEvent } from 'firebase/analytics'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useState } from 'react'
import { toast } from 'sonner'
import auth from '../firebase/auth'
import { analytics } from '../firebase/firebase'

const provider = new GoogleAuthProvider()

function useLogin(callback?: () => void) {
    const [isLoading, setIsLoading] = useState(false)

    async function signIn() {
        try {
            const log = await analytics

            if (log) {
                logEvent(log, 'login')
            }

            setIsLoading(true)
            await signInWithPopup(auth, provider)

            toast.info('Successfully logged-in.')

            if (callback) {
                callback()
            }
        } catch (error) {
            toastError(error)
        } finally {
            setIsLoading(false)
        }
    }

    return { isLoading, signIn }
}

export default useLogin
