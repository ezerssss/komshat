import { Timestamp } from 'firebase/firestore'
import { z } from 'zod'
import { ParticipantSchema } from './ParticipantInterface'

export const SubmitProjectFormSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1).max(500),
    github: z.string().url().min(1),
    youtube: z.string().url().min(1),
    images: z.array(z.object({ url: z.string().min(1) })).min(1),
})

export type SubmitProjectFormInterface = z.infer<typeof SubmitProjectFormSchema>

export const ProjectSchema = ParticipantSchema.extend({
    projectID: z.string().uuid(),
    title: z.string().min(1),
    description: z.string().min(1),
    github: z.string().url().min(1),
    youtube: z.string().url().min(1),
    images: z.array(z.object({ url: z.string().min(1) })).min(1),
    hearts: z.number().nonnegative(),
    dateSubmitted: z.instanceof(Timestamp),
})

export type ProjectInterface = z.infer<typeof ProjectSchema>
