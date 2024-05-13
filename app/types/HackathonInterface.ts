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

export type DurationInDaysInterface = {
    recognition: number
    submission: number
    voting: number
}

export const AdminCreateHackathonSchema = ThemeSchema.extend({
    dateTimeNumber: z.number().min(0),
    startHour: z.number().min(0).max(23),
    durationInDays: z.object({
        recognition: z.number().min(1),
        submission: z.number().min(1),
        voting: z.number().min(1),
    }),
})

export type AdminCreateHackathonInterface = z.infer<
    typeof AdminCreateHackathonSchema
>

export const HackathonConfigSchema = z.object({
    durationInDays: z.object({
        recognition: z.number().min(1),
        submission: z.number().min(1),
        voting: z.number().min(1),
    }),
    startDay: z.number().min(0).max(6),
    startHour: z.number().min(0).max(23),
    autoGenerateTheme: z.boolean().default(true),
})

export type HackathonConfigInterface = z.infer<typeof HackathonConfigSchema>
