import sweetAlertConfig from '@/app/constants/sweetAlert'
import { deleteProject } from '@/app/firebase/functions'
import { ProjectInterface } from '@/app/types/ProjectInterface'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { toastError } from '@/lib/utils'
import { format } from 'date-fns'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'
import Swal from 'sweetalert2'

function ProjectRow(props: ProjectInterface) {
    const {
        projectID,
        captainID,
        title,
        description,
        github,
        youtube,
        hearts,
        dateSubmitted,
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

                    await deleteProject({ projectID })
                    toast.success('Successfully deleted project.')
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
            <p className="overflow-hidden text-ellipsis">{projectID}</p>
            <p className="overflow-hidden text-ellipsis">{captainID}</p>
            <p>{title}</p>
            <p className="col-span-2 text-left">{description}</p>
            <a href={github} target="_blank" className="underline">
                Link
            </a>
            <a href={youtube} target="_blank" className="underline">
                Link
            </a>
            <p>{hearts}</p>
            <p>{format(dateSubmitted.toDate(), 'PPP')}</p>
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
            <Separator className="col-span-10" />
        </>
    )
}

export default ProjectRow
