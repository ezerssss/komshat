'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import ProfileSheet from './ProfileSheet'
import { Button } from '@/components/ui/button'
import { SheetTrigger } from '@/components/ui/sheet'

const routes = [
    { href: '/', title: 'Home' },
    { href: '/history', title: 'History' },
]

function Navbar() {
    const pathname = usePathname()

    return (
        <nav className="flex items-center justify-between border-b-2 border-gray-200 px-10 py-5">
            <Link href="/" className="text-lg font-bold">
                komshat
            </Link>
            <ul className="flex gap-2 sm:gap-10">
                {routes.map(({ href, title }) => (
                    <Link
                        key={href}
                        href={href}
                        className={twMerge(
                            href === pathname ? 'underline' : 'text-gray-400',
                            'text-sm'
                        )}
                    >
                        {title}
                    </Link>
                ))}
                <ProfileSheet>
                    <SheetTrigger asChild>
                        <p className="cursor-pointer text-sm text-gray-400">
                            Profile
                        </p>
                    </SheetTrigger>
                </ProfileSheet>
            </ul>
        </nav>
    )
}

export default Navbar
