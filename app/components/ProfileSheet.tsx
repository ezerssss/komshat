import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
} from '@/components/ui/sheet'
import React from 'react'
import GoogleIcon from '../icons/GoogleIcon'
import useUser from '../hooks/useUser'
import { UserRound } from 'lucide-react'
import Image from 'next/image'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import auth from '../firebase/auth'
import { toast } from 'sonner'

const provider = new GoogleAuthProvider()

interface PropsInterface {
    children: React.ReactNode
    callback?: () => void
}

function ProfileSheet(props: Readonly<PropsInterface>) {
    const { children, callback } = props

    const user = useUser()

    async function signIn() {
        try {
            await signInWithPopup(auth, provider)

            if (callback) {
                callback()
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message)
            }
        }
    }

    return (
        <Sheet>
            {children}
            <SheetContent>
                {user ? (
                    <>
                        <SheetHeader>
                            <SheetTitle>Profile</SheetTitle>
                        </SheetHeader>
                        <div className="mt-3 flex items-center gap-2">
                            {user.photoURL ? (
                                <div className="flex h-14 w-14 overflow-hidden rounded-full">
                                    <Image
                                        alt="profile picture"
                                        width="0"
                                        height="0"
                                        sizes="100vw"
                                        className="h-auto w-auto object-cover object-center shadow-md"
                                        src={user.photoURL}
                                    />
                                </div>
                            ) : (
                                <UserRound />
                            )}
                            <div>
                                <p>{user.displayName}</p>
                                <p className="text-xs text-gray-400">
                                    {user.email}
                                </p>
                            </div>
                        </div>
                        <Button
                            className="my-8 flex items-center gap-2"
                            onClick={() => auth.signOut()}
                        >
                            Log out
                        </Button>
                    </>
                ) : (
                    <>
                        <SheetHeader>
                            <SheetTitle>Sign In</SheetTitle>
                            <SheetDescription>
                                You are not currently logged in. To join this
                                week&apos;s hackathon, please sign in with your
                                UP email.
                            </SheetDescription>
                        </SheetHeader>
                        <Button
                            className="my-5 flex items-center gap-2"
                            onClick={() => signIn()}
                        >
                            <GoogleIcon className="w-5 fill-white" />
                            Sign in with Google
                        </Button>
                    </>
                )}
            </SheetContent>
        </Sheet>
    )
}

export default ProfileSheet
