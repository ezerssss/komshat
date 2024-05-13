import { HackathonInterface } from '@/app/types/HackathonInterface'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { format } from 'date-fns'
import React, { useState } from 'react'
import LinesEllipsis from 'react-lines-ellipsis'
import { twMerge } from 'tailwind-merge'
import EditForm from './EditForm'
import Swal from 'sweetalert2'
import sweetAlertConfig from '@/app/constants/sweetAlert'
import { Loader2 } from 'lucide-react'
import { toastError } from '@/lib/utils'
import { deleteHackathon } from '@/app/firebase/functions'
import { toast } from 'sonner'

interface PropsInterface extends HackathonInterface {
    setSelectedHackathon: React.Dispatch<React.SetStateAction<string>>
}

function HackathonRow(props: PropsInterface) {
    const {
        hackathonID,
        dateEnd,
        dateStart,
        dateSubmissionEnd,
        dateVotingEnd,
        winningProjectID,
        theme,
        description,
        ideas,
        setSelectedHackathon,
    } = props

    const [isDeleting, setIsDeleting] = useState(false)

    async function handleDelete() {
        Swal.fire({
            title: 'Confirm Deletion',
            text: 'This is a destructive operation. You will NOT be able to recover this deletion. Continue action?',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Continue',
            reverseButtons: true,
            ...sweetAlertConfig,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setIsDeleting(true)

                    await deleteHackathon({ hackathonID })
                    toast.success('Successfully deleted hackathon.')
                } catch (error) {
                    toastError(error)
                } finally {
                    setIsDeleting(false)
                }
            }
        })
    }

    return (
        <>
            <p className="overflow-hidden text-ellipsis">{hackathonID}</p>
            <div className="col-span-2 mx-auto w-fit space-y-2 text-left text-xs">
                <p>
                    <span className="font-bold">Start: </span>

                    {format(dateStart.toDate(), 'Pp')}
                </p>
                <p>
                    <span className="font-bold">End: </span>
                    {format(dateEnd.toDate(), 'Pp')}
                </p>
                <p>
                    <span className="font-bold">Deadline: </span>
                    {format(dateSubmissionEnd.toDate(), 'Pp')}
                </p>
                <p>
                    <span className="font-bold">Voting Phase: </span>
                    {format(dateVotingEnd.toDate(), 'Pp')}
                </p>
            </div>
            <p
                className={twMerge(
                    'overflow-hidden text-ellipsis',
                    !winningProjectID && 'text-gray-400 line-through'
                )}
            >
                {winningProjectID ?? 'None'}
            </p>
            <p className="col-span-2 text-left">{theme}</p>
            <p className="col-span-2 text-left">{description}</p>
            <ul className="list-outside list-disc space-y-2 text-left text-xs">
                {ideas.map((idea, index) => (
                    <li key={index}>
                        <LinesEllipsis text={idea} maxLine={3} />
                    </li>
                ))}
            </ul>
            <div className="flex flex-col items-center gap-1">
                <Button
                    variant="outline"
                    className="h-[35px] w-[60px] text-xs"
                    onClick={() => setSelectedHackathon(hackathonID)}
                >
                    Select
                </Button>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="h-[35px] w-[60px] text-xs">
                            Edit
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-h-[95%] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Edit Hackathon</DialogTitle>
                            <DialogDescription>
                                Edit Hackathon details here. Click save when
                                you&apos;re done.
                            </DialogDescription>
                        </DialogHeader>
                        <EditForm {...props} />
                    </DialogContent>
                </Dialog>
                <Button
                    className="h-[35px] w-[60px] text-xs"
                    variant="destructive"
                    disabled={isDeleting}
                    onClick={handleDelete}
                >
                    {isDeleting ? (
                        <Loader2 className="animate-spin" />
                    ) : (
                        'Delete'
                    )}
                </Button>
            </div>
            <Separator className="col-span-10" />
        </>
    )
}

export default HackathonRow
