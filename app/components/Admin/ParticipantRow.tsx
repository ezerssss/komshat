import sweetAlertConfig from '@/app/constants/sweetAlert'
import { deleteParticipant } from '@/app/firebase/functions'
import { ParticipantInterface } from '@/app/types/ParticipantInterface'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { toastError } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import Swal from 'sweetalert2'

function ParticipantRow(props: ParticipantInterface) {
    const { captainID, teamName, members, hackathonID } = props

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

                    await deleteParticipant({ hackathonID, captainID })
                    toast.success('Successfully deleted participant.')
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
            <p>{captainID}</p>
            <p>{teamName}</p>
            <ul className="list-inside list-disc space-y-2 text-left">
                {members.map((member, index) => (
                    <li key={index}>{member.name}</li>
                ))}
            </ul>
            <div className="flex justify-center">
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
            <Separator className="col-span-4" />
        </>
    )
}

export default ParticipantRow
