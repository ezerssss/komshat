/* eslint-disable @next/next/no-img-element */
'use client'

import { joinHackathon } from '@/app/firebase/functions'
import useHackathon from '@/app/hooks/useHackathon'
import useUpload from '@/app/hooks/useUpload'
import { JoinFormSchema } from '@/app/types/ParticipantInterface'
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
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import Swal from 'sweetalert2'
import sweetAlertConfig, {
    sweetAlertConfigNoCancel,
} from '@/app/constants/sweetAlert'
import { analytics } from '@/app/firebase/firebase'
import { logEvent } from 'firebase/analytics'
import useUser from '@/app/hooks/useUser'
import { useRouter } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

function JoinForm() {
    const user = useUser()
    const {
        isWithinDeadline,
        isParticipant,
        isLoading,
        setIsParticipant,
        hackathon,
        isChecking,
    } = useHackathon()
    const {
        uploadTeamPicture,
        deleteFromURL,
        isUploading,
        progress,
        error: imageError,
    } = useUpload()

    const router = useRouter()

    const [isJoining, setIsJoining] = useState(false)

    const imageRef = useRef<HTMLInputElement | null>(null)
    const imageDisplayRef = useRef<HTMLImageElement | null>(null)

    const disabled =
        !user ||
        !isWithinDeadline ||
        isUploading ||
        isJoining ||
        isParticipant ||
        isLoading ||
        isChecking

    const form = useForm<z.infer<typeof JoinFormSchema>>({
        resolver: zodResolver(JoinFormSchema),
        defaultValues: {
            teamName: '',
            teamPicture: '',
            members: [{ name: '' }],
        },
        disabled: disabled,
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'members',
    })

    async function join(values: z.infer<typeof JoinFormSchema>) {
        const log = await analytics
        if (log) {
            logEvent(log, 'join_hackathon', {
                hackathonID: hackathon?.hackathonID ?? 'hackathon-id',
            })
        }

        if (!imageRef?.current?.files?.length) {
            form.setError('teamPicture', {
                type: 'custom',
                message: 'File not found.',
            })
            return
        }

        const image = imageRef.current.files[0]
        let teamPicture = ''

        try {
            setIsJoining(true)
            teamPicture = await uploadTeamPicture(image)
            await joinHackathon({ ...values, teamPicture })

            form.reset()

            const swalResult = await Swal.fire({
                title: 'Hooray!',
                html: "You have successfully joined this hackathon. Don't forget to <a href='/submit' class='underline'>submit</a> your project before the deadline ends.",
                confirmButtonText: 'Got it',
                ...sweetAlertConfigNoCancel,
            })

            setIsParticipant(true)

            if (swalResult.isConfirmed) {
                router.push('/')
            }
        } catch (error) {
            await deleteFromURL(teamPicture)
            toastError(error)
        } finally {
            setIsJoining(false)
        }
    }

    function onSubmit(values: z.infer<typeof JoinFormSchema>) {
        Swal.fire({
            title: 'Confirm details',
            text: 'This team will be tied to your Google account. To join with a different team, you need to use another Google account.',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Confirm',
            ...sweetAlertConfig,
        }).then((result) => {
            if (result.isConfirmed) {
                join(values)
            }
        })
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
        <div className="mx-auto flex h-full w-full flex-col items-center justify-center rounded-md border-2 px-5 py-10  lg:min-w-[60%] lg:max-w-[500px]">
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
                                <img
                                    alt="team"
                                    src=""
                                    width={100}
                                    height={100}
                                    className={twMerge(
                                        'h-[100px] w-[100px] rounded-full object-cover',
                                        !field.value && 'hidden'
                                    )}
                                    ref={imageDisplayRef}
                                />

                                <FormControl>
                                    <>
                                        <Input
                                            {...field}
                                            type="file"
                                            accept="image/*"
                                            ref={imageRef}
                                            id="img"
                                            className="hidden"
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
                                            {field.value
                                                ? 'Choose another image'
                                                : 'Choose file'}
                                        </label>
                                    </>
                                </FormControl>
                                <FormDescription>
                                    This will be your public team picture.
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
                            className="w-[150px]"
                            disabled={disabled}
                        >
                            {isUploading || isJoining ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                'Join Hackathon'
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

            {isWithinDeadline && isParticipant && (
                <div className="mt-3 w-full text-center text-xs text-gray-400">
                    <p>You have already joined this hackathon.</p>
                    <Link href="/submit" className="underline">
                        Submit a project instead?
                    </Link>
                </div>
            )}

            {!isWithinDeadline && (
                <div className="mt-3 w-full text-center text-xs text-gray-400">
                    <p>This hackathon is not accepting participants anymore.</p>
                </div>
            )}
        </div>
    )
}

export default JoinForm
