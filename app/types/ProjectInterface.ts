import { Timestamp } from 'firebase/firestore'
import { z } from 'zod'
import { ParticipantSchema } from './ParticipantInterface'

export const ProjectSchema = ParticipantSchema.extend({
    projectID: z.string().uuid(),
    title: z.string().min(1),
    description: z.string().min(1),
    github: z.string().url().min(1),
    youtube: z.string().url().min(1),
    images: z.string().array().min(1),
    hearts: z.number().nonnegative(),
    dateSubmitted: z.instanceof(Timestamp),
})

export type ProjectInterface = z.infer<typeof ProjectSchema>
