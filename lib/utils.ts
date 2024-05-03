import { type ClassValue, clsx } from 'clsx'
import { FirebaseError } from 'firebase/app'
import { AuthErrorCodes } from 'firebase/auth'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'
import {
    RegExpMatcher,
    TextCensor,
    englishDataset,
    englishRecommendedTransformers,
} from 'obscenity'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function joinMembersToString(members: { name: string }[]): string {
    let length = members.length
    let string = ''

    for (let i = 0; i < length; i++) {
        if (i == 0) {
            string += members[i].name
        } else if (i == length - 1) {
            string += `, and ${members[i].name}`
        } else {
            string += `, ${members[i].name}`
        }
    }

    return string
}

export function getAuthErrorMessage(error: string): string {
    if (error.includes('Unauthorized email')) {
        return 'Unauthorized email. Please use an allowed email.'
    }

    return error
}

export function toastError(error: unknown) {
    console.error(error)

    let message = 'Something went wrong.'

    if (error instanceof FirebaseError) {
        if (error.code === AuthErrorCodes.INTERNAL_ERROR) {
            message = getAuthErrorMessage(error.message)
        } else if (error.code === AuthErrorCodes.POPUP_CLOSED_BY_USER) {
            message = 'Login cancelled by user.'
        } else {
            message = error.message
        }
    } else if (error instanceof Error) {
        message = error.message
    } else if (typeof error === 'string') {
        message = error
    }

    toast.error(message)
}

export function saveHackatonIDToLocal(hackathonID: string) {
    const previousID = getHackathonIDFromLocal()

    if (previousID != hackathonID) {
        localStorage.setItem('hackathonID', hackathonID)
        localStorage.setItem('likedProjects', JSON.stringify([]))
    }
}

export function getHackathonIDFromLocal() {
    return localStorage.getItem('hackathonID')
}

export function getLikedProjects(): string[] {
    if (localStorage.getItem('likedProjects')) {
        return JSON.parse(localStorage.getItem('likedProjects') || '[]')
    }

    return []
}

export function setProjectAsLiked(projectID: string) {
    const likedProjects = getLikedProjects()

    if (!likedProjects.includes(projectID)) {
        likedProjects.push(projectID)
    }

    localStorage.setItem('likedProjects', JSON.stringify(likedProjects))
}

export function setProjectAsUnliked(projectID: string) {
    const likedProjects = getLikedProjects()

    const updatedProjects = likedProjects.filter((id) => id != projectID)
    localStorage.setItem('likedProjects', JSON.stringify(updatedProjects))
}

export function isProjectLiked(projectID: string): boolean {
    const likedProjects = getLikedProjects()

    return likedProjects.includes(projectID)
}

const censor = new TextCensor()
const matcher = new RegExpMatcher({
    ...englishDataset.build(),
    ...englishRecommendedTransformers,
})

export function sanitizeString(string: string): string {
    const matches = matcher.getAllMatches(string)

    return censor.applyTo(string, matches)
}
