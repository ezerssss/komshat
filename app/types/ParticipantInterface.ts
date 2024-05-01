import { z } from 'zod'

export const ParticipantSchema = z.object({
    participantID: z.string().uuid(),
    hackathonID: z.string().uuid(),
    captainID: z.string().uuid(),
    teamName: z.string().min(1),
    teamPicture: z.string().url().min(1),
    members: z.string().array().min(1),
})

export type ParticipantInterface = z.infer<typeof ParticipantSchema>
