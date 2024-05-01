import { Timestamp } from 'firebase/firestore'
import { z } from 'zod'

export const ThemeSchema = z.object({
    theme: z.string().min(1),
    description: z.string().min(1),
    ideas: z.string().array().min(3).max(3),
    tech: z
        .object({
            name: z.string().min(1),
            icon: z.string().min(1),
        })
        .array()
        .min(1),
})

export type ThemeInterface = z.infer<typeof ThemeSchema>

export const HackathonSchema = ThemeSchema.extend({
    hackathonID: z.string().uuid(),
    dateStart: z.instanceof(Timestamp),
    dateEnd: z.instanceof(Timestamp),
    winningProjectID: z.string().uuid().nullable(),
})

export type HackathonInterface = z.infer<typeof HackathonSchema>

export const ParticipantSchema = z.object({
    participantID: z.string().uuid(),
    hackathonID: z.string().uuid(),
    captainID: z.string().uuid(),
    teamName: z.string().min(1),
    teamPicture: z.string().url().min(1),
    members: z.string().array().min(1),
})
