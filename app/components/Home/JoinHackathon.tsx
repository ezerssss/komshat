'use client'

import useUser from '@/app/hooks/useUser'
import { Button } from '@/components/ui/button'
import { SheetTrigger } from '@/components/ui/sheet'

import ProfileSheet from '../ProfileSheet'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function JoinHackathon() {
    const user = useUser()
    const router = useRouter()

    if (user) {
        return (
            <Link href="/join">
                <Button className="mt-5">Join Hackathon</Button>
            </Link>
        )
    }

    return (
        <ProfileSheet callback={() => router.push('join')}>
            <SheetTrigger asChild>
                <Button className="mt-5">Join Hackathon</Button>
            </SheetTrigger>
        </ProfileSheet>
    )
}
