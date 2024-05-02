import { Timestamp } from 'firebase/firestore'
import { z } from 'zod'

export const ThemeSchema = z.object({
    theme: z.string().min(1),
    description: z.string().min(1),
    ideas: z.string().array().min(3).max(3),
})

export type ThemeInterface = z.infer<typeof ThemeSchema>

export const HackathonSchema = ThemeSchema.extend({
    hackathonID: z.string().uuid(),
    dateStart: z.instanceof(Timestamp),
    dateEnd: z.instanceof(Timestamp),
    dateSubmissionEnd: z.instanceof(Timestamp),
    winningProjectID: z.string().uuid().nullable(),
})

export type HackathonInterface = z.infer<typeof HackathonSchema>
