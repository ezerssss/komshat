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
    dateVotingEnd: z.instanceof(Timestamp),
    winningProjectID: z.string().uuid().nullable(),
})

export type HackathonInterface = z.infer<typeof HackathonSchema>

export const CreateHackathonSchema = z.object({
    durationInDays: z.object({
        recognition: z.number().min(1),
        submission: z.number().min(1),
        voting: z.number().min(1),
    }),
    startDay: z.number().min(0).max(6),
    startHour: z.number().min(0).max(23),
})

export type CreateHackathonInterface = z.infer<typeof CreateHackathonSchema>
