'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { ParticipantInterface } from '@/app/types/ParticipantInterface'
import { joinMembersToString, sanitizeString } from '@/lib/utils'
import { Crown, Pencil } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import useUser from '@/app/hooks/useUser'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import EditTeamForm from '../Join/EditTeamForm'
import { useState } from 'react'

interface PropsInterface extends ParticipantInterface {
    winningCaptainID: string | null
    isWithinDeadline: boolean
}

export function Participant(props: PropsInterface) {
    const user = useUser()

    const {
        teamName: teamNameProps,
        teamPicture: teamPictureProps,
        members: membersProps,
        captainID,
        winningCaptainID,
        isWithinDeadline,
    } = props

    const [teamName, setTeamName] = useState(teamNameProps)
    const [teamPicture, setTeamPicture] = useState(teamPictureProps)
    const [members, setMembers] = useState(membersProps)

    let teamNameSanitized = sanitizeString(teamName)
    const isWinner = captainID === winningCaptainID
    const isOwnTeam = captainID === user?.uid

    const [isEditOpen, setIsEditOpen] = useState(false)

    function handleClose(
        teamName: string,
        teamPicture: string,
        members: { name: string }[]
    ) {
        setIsEditOpen(false)

        setTeamName(teamName)
        setTeamPicture(teamPicture)
        setMembers(members)
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div
                    className={twMerge(
                        'relative z-50 flex w-full gap-4 rounded-md border border-slate-200 bg-white p-4 text-slate-950 shadow-md outline-none sm:w-80',
                        isWinner && 'cursor-pointer border-[#ffbb48]'
                    )}
                >
                    {isOwnTeam && isWithinDeadline && (
                        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                            <DialogTrigger asChild>
                                <button>
                                    <Pencil
                                        className="absolute right-3 top-3"
                                        size={15}
                                    />
                                </button>
                            </DialogTrigger>
                            <DialogContent className="max-h-[95%] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle>Edit Team details</DialogTitle>
                                    <DialogDescription>
                                        Edit Team details here. Click save when
                                        you&apos;re done.
                                    </DialogDescription>
                                </DialogHeader>
                                <EditTeamForm onClose={handleClose} />
                            </DialogContent>
                        </Dialog>
                    )}

                    <Avatar>
                        <AvatarImage
                            className="object-cover"
                            src={teamPicture}
                        />
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
