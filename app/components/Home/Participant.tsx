import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { ParticipantInterface } from '@/app/types/ParticipantInterface'
import { joinMembersToString } from '@/lib/utils'

export function Participant(props: ParticipantInterface) {
    const { teamName, teamPicture, members } = props

    return (
        <div className="z-50 flex w-full gap-4 rounded-md border border-slate-200 bg-white p-4 text-slate-950 shadow-md outline-none sm:w-80">
            <Avatar>
                <AvatarImage src={teamPicture} />
                <AvatarFallback>{teamName[0]}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
                <h4 className="text-sm font-semibold">Team {teamName}</h4>
                <p className="text-xs text-gray-400">
                    Members: {joinMembersToString(members)}
                </p>
            </div>
        </div>
    )
}
