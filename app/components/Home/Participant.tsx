import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { ParticipantInterface } from '@/app/types/ParticipantInterface'
import { joinMembersToString, sanitizeString } from '@/lib/utils'
import { Crown } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'

interface PropsInterface extends ParticipantInterface {
    winningCaptainID: string | null
}

export function Participant(props: PropsInterface) {
    const { teamName, teamPicture, members, captainID, winningCaptainID } =
        props

    let teamNameSanitized = sanitizeString(teamName.replace('Team', ''))
    const isWinner = captainID === winningCaptainID

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div
                    className={twMerge(
                        'relative z-50 flex w-full gap-4 rounded-md border border-slate-200 bg-white p-4 text-slate-950 shadow-md outline-none sm:w-80',
                        isWinner && 'cursor-pointer border-[#ffbb48]'
                    )}
                >
                    <Avatar>
                        <AvatarImage src={teamPicture} />
                        <AvatarFallback>{teamNameSanitized[0]}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <h4 className="text-sm font-semibold">
                            Team {teamNameSanitized}
                        </h4>
                        <p className="text-xs text-gray-400">
                            Members:{' '}
                            {sanitizeString(joinMembersToString(members))}
                        </p>
                    </div>
                    {isWinner && (
                        <>
                            <Crown
                                className="absolute right-2 top-2 cursor-pointer"
                                color="#ffbb48"
                            />
                            <PopoverContent className="w-fit">
                                <p className="text-sm">
                                    The winning team for this hackathon.
                                </p>
                            </PopoverContent>
                        </>
                    )}
                </div>
            </PopoverTrigger>
        </Popover>
    )
}
