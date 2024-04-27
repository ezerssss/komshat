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
        <nav className="flex justify-between border-b-2 px-10 py-5">
            <p className="font-bold">komshat</p>
            <ul className="flex gap-10">
                {routes.map(({ href, title }) => (
                    <Link
                        key={href}
                        href={href}
                        className={twMerge(href === pathname && 'underline')}
                    >
                        {title}
                    </Link>
                ))}
            </ul>
        </nav>
    )
}

export default Navbar
