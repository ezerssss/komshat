'use client'

import useHackathon from '@/app/hooks/useHackathon'
import useUpload from '@/app/hooks/useUpload'
import { SubmitProjectFormSchema } from '@/app/types/ProjectInterface'
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
import { FormEvent, useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import { z } from 'zod'
import 'react-photo-view/dist/react-photo-view.css'
import Swal from 'sweetalert2'
import sweetAlertConfig, {
    sweetAlertConfigNoCancel,
} from '@/app/constants/sweetAlert'
import { submitProject } from '@/app/firebase/functions'
import { Textarea } from '@/components/ui/textarea'
import { analytics } from '@/app/firebase/firebase'
import { logEvent } from 'firebase/analytics'
import useUser from '@/app/hooks/useUser'

function SubmitForm() {
    const user = useUser()
    const {
        isParticipant,
        hasSubmitted,
        setHasSubmitted,
        isWithinDeadline,
        hackathon,
        isChecking,
    } = useHackathon()
    const {
        uploadProjectImages,
        deleteFromURL,
        isUploading,
        progress,
        error: imageError,
    } = useUpload()

    const [imageFiles, setImageFiles] = useState<File[]>([])
    const [previewImageUrls, setPreviewImageUrls] = useState<string[]>([])

    const [isSubmitting, setIsSubmitting] = useState(false)

    const disabled =
        !user ||
        isUploading ||
        !isParticipant ||
        isSubmitting ||
        hasSubmitted ||
        !isWithinDeadline ||
        isChecking

    const form = useForm<z.infer<typeof SubmitProjectFormSchema>>({
        resolver: zodResolver(SubmitProjectFormSchema),
        defaultValues: {
            title: '',
            description: '',
            github: '',
            youtube: '',
            images: [{ url: '' }],
        },
        disabled: disabled,
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'images',
    })

    async function submit(values: z.infer<typeof SubmitProjectFormSchema>) {
        let urls: string[] = []

        try {
            setIsSubmitting(true)

            const log = await analytics
            if (log) {
                logEvent(log, 'submit_project', {
                    hackathonID: hackathon?.hackathonID ?? 'hackathon-id',
                })
            }

            const urls = await uploadProjectImages(imageFiles)

            const images = urls.map((url) => ({ url }))

            await submitProject({ ...values, images })

            Swal.fire({
                title: 'Congratulations!',
                html: 'You have successfully submitted your project for this hackathon. You can now relax knowing you created a beautiful project. Encourage other people to join by sharing your project!',
                confirmButtonText: 'Thanks',
                ...sweetAlertConfigNoCancel,
            })

            form.reset()

            setHasSubmitted(true)
        } catch (error) {
            toastError(error)

            const promises = urls.map((url) => deleteFromURL(url))

            await Promise.all(promises)
        } finally {
            setIsSubmitting(false)
        }
    }

    function onSubmit(values: z.infer<typeof SubmitProjectFormSchema>) {
        Swal.fire({
            title: 'Confirm details',
            text: 'You will not be able to edit your project submission after you confirm. Ensure that all details are correct before submitting.',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Confirm',
            ...sweetAlertConfig,
        }).then((result) => {
            if (result.isConfirmed) {
                submit(values)
            }
        })
    }

    useEffect(() => {
        if (imageError) {
            form.setError('images', {
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

    function handleImageChange(
        event: FormEvent<HTMLInputElement>,
        index: number
    ) {
        const target = event.target as HTMLInputElement

        if (!target?.files) {
            return
        }

        const previewFiles = [...imageFiles]
        previewFiles[index] = target.files[0]
        const previewUrls = [...previewImageUrls]
        previewUrls[index] = URL.createObjectURL(target.files[0])

        setImageFiles(previewFiles)
        setPreviewImageUrls(previewUrls)
    }

    return (
        <div className="mx-auto flex h-full w-full flex-col items-center justify-center rounded-md border-2 px-5 py-10 lg:min-w-[60%] lg:max-w-[500px]">
            <Form {...form}>
                <form
                    className="space-y-8"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Project title</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Enter project title"
                                        onKeyDown={(e) => checkKeyDown(e)}
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is your public project title.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Enter project description"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Project description or overview.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="github"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>GitHub link</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Enter your project's GitHub repository link."
                                        onKeyDown={(e) => checkKeyDown(e)}
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Your project&apos;s GitHub repository link.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="youtube"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>YouTube link</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Enter your demo video."
                                        onKeyDown={(e) => checkKeyDown(e)}
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Short YouTube video to showcase your
                                    project.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div>
                        <FormLabel>Images</FormLabel>
                        <div className="space-y-4">
                            <PhotoProvider>
                                {fields.map((field, index) => (
                                    <FormField
                                        key={field.id}
                                        control={form.control}
                                        name={`images.${index}.url`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="flex gap-2">
                                                        <Input
                                                            {...field}
                                                            type="file"
                                                            accept="image/*"
                                                            onChangeCapture={(
                                                                event
                                                            ) =>
                                                                handleImageChange(
                                                                    event,
                                                                    index
                                                                )
                                                            }
                                                        />
                                                        <PhotoView
                                                            src={
                                                                previewImageUrls[
                                                                    index
                                                                ]
                                                            }
                                                        >
                                                            <Button
                                                                type="button"
                                                                disabled={
                                                                    !field.value
                                                                }
                                                            >
                                                                Preview
                                                            </Button>
                                                        </PhotoView>
                                                        {index ==
                                                            form.getValues()
                                                                .images.length -
                                                                1 && (
                                                            <Button
                                                                className="min-w-[41px]"
                                                                type="button"
                                                                variant="default"
                                                                onClick={() =>
                                                                    append({
                                                                        url: '',
                                                                    })
                                                                }
                                                                disabled={
                                                                    disabled
                                                                }
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
                                                                    remove(
                                                                        index
                                                                    )
                                                                }
                                                                disabled={
                                                                    disabled
                                                                }
                                                            >
                                                                -
                                                            </Button>
                                                        )}
                                                    </div>
                                                </FormControl>
                                                {index === 0 && (
                                                    <FormDescription>
                                                        This will be the
                                                        thumbnail.
                                                    </FormDescription>
                                                )}
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                ))}
                            </PhotoProvider>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Button
                            type="submit"
                            className="w-[150px]"
                            disabled={disabled}
                        >
                            {isUploading || isSubmitting ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                'Submit project'
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
            {isUploading && (
                <div className="mt-2 w-full max-w-[300px]">
                    <p className="text-xs text-gray-400">Uploading images</p>
                    <Progress value={progress} />
                </div>
            )}

            {!isParticipant && !isChecking && (
                <div className="mt-3 w-full text-center text-xs text-gray-400">
                    <p>
                        It seems that you are not yet registered to this
                        hackathon.
                    </p>
                    <Link href="/join" className="underline">
                        Register instead?
                    </Link>
                </div>
            )}

            {hasSubmitted && isWithinDeadline && (
                <div className="mt-3 w-full text-center text-xs text-gray-400">
                    <p>You have already submitted your project.</p>
                    <p>Make sure to share your projects to your friends!</p>
                </div>
            )}

            {!isWithinDeadline && (
                <div className="mt-3 w-full text-center text-xs text-gray-400">
                    <p>This hackathon is not accepting submissions anymore.</p>
                </div>
            )}
        </div>
    )
}

export default SubmitForm
