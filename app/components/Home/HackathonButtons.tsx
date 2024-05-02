'use client'

import useUser from '@/app/hooks/useUser'
import { Button } from '@/components/ui/button'
import { SheetTrigger } from '@/components/ui/sheet'

import ProfileSheet from '../ProfileSheet'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import useHackathon from '@/app/hooks/useHackathon'

export default function HackathonButtons() {
    const user = useUser()
    const router = useRouter()

    const { isParticipant, hasSubmitted } = useHackathon()

    if (!user) {
        return (
            <ProfileSheet callback={() => router.push('join')}>
                <SheetTrigger asChild>
                    <Button className="mt-5">Join Hackathon</Button>
                </SheetTrigger>
            </ProfileSheet>
        )
    }

    return (
        <div className="flex items-center gap-2">
            {isParticipant && !hasSubmitted && (
                <Link href="/submit">
                    <Button className="mt-5 bg-green-500">
                        Submit project
                    </Button>
                </Link>
            )}
            {!isParticipant && !hasSubmitted && (
                <Link href="/join">
                    <Button className="mt-5">Join Hackathon</Button>
                </Link>
            )}
            {hasSubmitted && (
                <Button className="mt-5" disabled>
                    Submitted project
                </Button>
            )}
        </div>
    )
}
