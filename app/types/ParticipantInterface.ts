import { z } from 'zod'

export const JoinFormSchema = z.object({
    teamName: z.string().min(4),
    teamPicture: z.string().url().min(1),
    members: z.array(z.object({ name: z.string().min(1) })).min(1),
})

export const EditTeamFormSchema = z.object({
    teamName: z.string().min(4),
    teamPicture: z
        .string()
        .nullish()
        .transform((x) => x ?? undefined),
    members: z.array(z.object({ name: z.string().min(1) })).min(1),
})

export type JoinInterface = z.infer<typeof JoinFormSchema>

export const ParticipantSchema = JoinFormSchema.extend({
    hackathonID: z.string().uuid(),
    captainID: z.string().uuid(),
})

export type ParticipantInterface = z.infer<typeof ParticipantSchema>
