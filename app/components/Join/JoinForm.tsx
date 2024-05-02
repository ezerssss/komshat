'use client'

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
import { zodResolver } from '@hookform/resolvers/zod'
import { useRef } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

function JoinForm() {
    const imageRef = useRef<HTMLInputElement | null>(null)

    const form = useForm<z.infer<typeof JoinFormSchema>>({
        resolver: zodResolver(JoinFormSchema),
        defaultValues: {
            teamName: '',
            teamPicture: '',
            members: [{ name: '' }],
        },
    })

    const { fields, prepend, remove } = useFieldArray({
        control: form.control,
        name: 'members',
    })

    async function onSubmit(values: z.infer<typeof JoinFormSchema>) {
        if (!imageRef?.current?.files?.length) {
            form.setError('teamPicture', {
                type: 'custom',
                message: 'File not found.',
            })

            return
        }
    }

    function handleMemberButton(index: number) {
        if (index === 0) {
            prepend({ name: '' })
        } else {
            remove(index)
        }
    }

    function checkKeyDown(
        e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        e.key === 'Enter' && e.preventDefault()
    }

    return (
        <div className="mx-auto flex h-full w-full items-center justify-center rounded-md border-2 px-5 py-10 lg:min-w-[60%] lg:max-w-[500px]">
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
                                    <Input
                                        type="text"
                                        placeholder="Enter name"
                                        onKeyDown={(e) => checkKeyDown(e)}
                                        {...field}
                                    />
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
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="file"
                                        accept="image/*"
                                        ref={imageRef}
                                        // onKeyDown={(e) => checkKeyDown(e)}
                                    />
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
                                                    <Button
                                                        className="min-w-[41px]"
                                                        type="button"
                                                        variant={
                                                            index === 0
                                                                ? 'default'
                                                                : 'destructive'
                                                        }
                                                        onClick={() =>
                                                            handleMemberButton(
                                                                index
                                                            )
                                                        }
                                                    >
                                                        {index === 0
                                                            ? '+'
                                                            : '-'}
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                    <Button type="submit">Join Hackathon</Button>
                </form>
            </Form>
        </div>
    )
}

export default JoinForm
