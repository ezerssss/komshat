'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

const routes = [
    { href: '/', title: 'Home' },
    { href: '/history', title: 'History' },
    { href: '/profile', title: 'Profile' },
]

function Navbar() {
    const pathname = usePathname()

    return (
        <nav className="flex items-center justify-between border-b-2 border-gray-200 px-10 py-5">
            <p className="text-lg font-bold">komshat</p>
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
            </ul>
        </nav>
    )
}

export default Navbar
