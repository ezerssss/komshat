import { Timestamp } from 'firebase/firestore'
import { z } from 'zod'

export const ThemeSchema = z.object({
    theme: z.string().min(1),
    description: z.string().min(1),
    ideas: z.string().array().min(3).max(3),
})

export type ThemeInterface = z.infer<typeof ThemeSchema>

export const HackathonSchema = ThemeSchema.extend({
    hackathonID: z.string().min(1),
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

export const EditHackathonSchema = HackathonSchema.extend({
    dateStart: z.number().min(0),
    dateEnd: z.number().min(0),
    dateSubmissionEnd: z.number().min(0),
    dateVotingEnd: z.number().min(0),
}).superRefine((data, ctx) => {
    if (data.dateStart >= data.dateEnd) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
                'Invalid starting and end date. Starting date should be earlier than end date.',
            path: ['dateStart', 'dateEnd'],
        })
    }

    if (data.dateSubmissionEnd >= data.dateVotingEnd) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
                'Invalid submission and voting end date. Submission end date should be earlier than voting end date.',
            path: ['dateSubmissionEnd', 'dateVotingEnd'],
        })
    }

    if (data.dateSubmissionEnd <= data.dateStart) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
                'Invalid submission and start date. Submission end date should be later than starting date.',
            path: ['dateSubmissionEnd', 'dateStart'],
        })
    }

    if (data.dateVotingEnd <= data.dateStart) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
                'Invalid end voting and start date. Voting end date should be later than starting date.',
            path: ['dateVotingEnd', 'dateStart'],
        })
    }

    if (data.dateSubmissionEnd >= data.dateEnd) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
                'Invalid submission and end date. Submission end date should be earlier than end date.',
            path: ['dateSubmissionEnd', 'dateEnd'],
        })
    }

    if (data.dateVotingEnd >= data.dateEnd) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
                'Invalid end voting and end date. Voting end date should be earlier than end date.',
            path: ['dateVotingEnd', 'dateEnd'],
        })
    }
})

export type EditHackathonInterface = z.infer<typeof EditHackathonSchema>

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
