/* eslint-disable @next/next/no-img-element */
'use client'

import { editTeam } from '@/app/firebase/functions'
import useHackathon from '@/app/hooks/useHackathon'
import useUpload from '@/app/hooks/useUpload'
import {
    EditTeamFormSchema,
    JoinFormSchema,
} from '@/app/types/ParticipantInterface'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { toastError } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { analytics } from '@/app/firebase/firebase'
import { logEvent } from 'firebase/analytics'
import useUser from '@/app/hooks/useUser'
import useParticipant from '@/app/hooks/useParticipant'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'

interface PropsInterface {
    onClose: (
        teamName: string,
        teamPicture: string,
        members: { name: string }[]
    ) => void
}

function EditTeamForm(props: PropsInterface) {
    const { onClose } = props

    const user = useUser()
    const { hackathon } = useHackathon()
    // No user id / hackathon id means no participant
    const { participant, isLoading } = useParticipant(
        user?.uid,
        hackathon?.hackathonID
    )
    const {
        uploadTeamPicture,
        isUploading,
        progress,
        error: imageError,
    } = useUpload()

    const [isEditing, setIsEditing] = useState(false)

    const imageRef = useRef<HTMLInputElement | null>(null)
    const imageDisplayRef = useRef<HTMLImageElement | null>(null)

    const disabled = !user || isUploading || isEditing || isLoading

    const form = useForm<z.infer<typeof EditTeamFormSchema>>({
        resolver: zodResolver(EditTeamFormSchema),
        defaultValues: {
            teamName: '....',
            teamPicture: '',
            members: [{ name: '....' }],
        },
        disabled: disabled,
    })

    useEffect(() => {
        if (!participant) {
            return
        }

        form.setValue('members', participant.members)
        form.setValue('teamName', participant.teamName)
    }, [participant])

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'members',
    })

    async function onSubmit(values: z.infer<typeof EditTeamFormSchema>) {
        const log = await analytics
        if (log) {
            logEvent(log, 'edit_team', {
                teamID: participant?.captainID ?? 'team-id',
                hackathonID: hackathon?.hackathonID ?? 'hackathon-id',
            })
        }

        if (!participant) {
            return
        }

        let teamPicture = participant.teamPicture

        try {
            setIsEditing(true)
            // new team picture
            if (imageRef?.current?.files?.length) {
                const image = imageRef.current.files[0]
                teamPicture = await uploadTeamPicture(image)
            }

            await editTeam({ ...values, teamPicture })

            toast.success('Successfully edited team details!')
            form.reset()
            onClose(values.teamName, teamPicture, values.members)
        } catch (error) {
            toastError(error)
        } finally {
            setIsEditing(false)
        }
    }

    useEffect(() => {
        if (imageError) {
            form.setError('teamPicture', {
                type: 'custom',
                message: imageError,
            })
        }
    }, [imageError, form])

    function checkKeyDown(
        e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        e.key === 'Enter' && e.preventDefault()
    }

    return (
        <div className="-z-20">
            <Form {...form}>
                <form
                    className="space-y-8"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        control={form.control}
                        name="teamName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Team name</FormLabel>
                                <FormControl>
                                    <div className="flex">
                                        <div className="flex h-10 items-center justify-center rounded-l-lg border bg-gray-400 px-3 py-2 text-sm text-white">
                                            Team
                                        </div>
                                        <Input
                                            className="flex-1 rounded-l-none border-l-0"
                                            type="text"
                                            placeholder="Enter name"
                                            onKeyDown={(e) => checkKeyDown(e)}
                                            {...field}
                                        />
                                    </div>
                                </FormControl>
                                <FormDescription>
                                    This is your public team name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="teamPicture"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Team picture</FormLabel>
                                {participant?.teamPicture ? (
                                    <img
                                        alt="team"
                                        src={participant.teamPicture}
                                        width={100}
                                        height={100}
                                        className="h-[100px] w-[100px] rounded-full object-cover"
                                        ref={imageDisplayRef}
                                    />
                                ) : (
                                    <Skeleton className="h-[100px] w-[100px] rounded-full" />
                                )}

                                <FormControl>
                                    <>
                                        <Input
                                            {...field}
                                            type="file"
                                            accept="image/*"
                                            ref={imageRef}
                                            id="img"
                                            className="hidden"
                                            required={false}
                                            onChangeCapture={(event) => {
                                                if (imageDisplayRef?.current) {
                                                    if (
                                                        !event.currentTarget
                                                            .files
                                                    ) {
                                                        return
                                                    }

                                                    imageDisplayRef.current.src =
                                                        URL.createObjectURL(
                                                            event.currentTarget
                                                                .files[0]
                                                        )
                                                }
                                            }}
                                        />
                                        <label
                                            htmlFor="img"
                                            className="flex h-10 w-full items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
                                        >
                                            Choose another image
                                        </label>
                                    </>
                                </FormControl>
                                <FormDescription>
                                    Upload another image to edit your current
                                    team picture
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div>
                        <FormLabel>Member names</FormLabel>
                        <div className="space-y-4">
                            {fields.map((field, index) => (
                                <FormField
                                    key={field.id}
                                    control={form.control}
                                    name={`members.${index}.name`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormDescription />
                                            <FormControl>
                                                <div className="flex gap-2">
                                                    <Input
                                                        {...field}
                                                        type="text"
                                                        placeholder="Enter member name"
                                                        onKeyDown={(e) =>
                                                            checkKeyDown(e)
                                                        }
                                                    />
                                                    {index ==
                                                        form.getValues().members
                                                            .length -
                                                            1 && (
                                                        <Button
                                                            className="min-w-[41px]"
                                                            type="button"
                                                            variant="default"
                                                            onClick={() =>
                                                                append({
                                                                    name: '',
                                                                })
                                                            }
                                                            disabled={disabled}
                                                        >
                                                            +
                                                        </Button>
                                                    )}
                                                    {index != 0 && (
                                                        <Button
                                                            className="min-w-[41px]"
                                                            type="button"
                                                            variant="destructive"
                                                            onClick={() =>
                                                                remove(index)
                                                            }
                                                            disabled={disabled}
                                                        >
                                                            -
                                                        </Button>
                                                    )}
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Button
                            type="submit"
                            className="w-[100px]"
                            disabled={disabled}
                        >
                            {isUploading || isEditing ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                'Save'
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
            {isUploading && (
                <div className="mt-2 w-full max-w-[300px]">
                    <p className="text-xs text-gray-400">Uploading image</p>
                    <Progress value={progress} />
                </div>
            )}
        </div>
    )
}

export default EditTeamForm
