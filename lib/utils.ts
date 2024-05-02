import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function joinMembersToString(members: { name: string }[]): string {
    let length = members.length
    let string = ''

    for (let i = 0; i < length; i++) {
        if (i == length - 1) {
            string += `, and ${members[i].name}`
        } else if (i == 0) {
            string += members[i].name
        } else {
            string += `, ${members[i].name}`
        }
    }

    return string
}
