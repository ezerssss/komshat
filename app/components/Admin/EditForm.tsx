// this is a war crime component im so sorry

import {
    EditHackathonInterface,
    EditHackathonSchema,
    HackathonInterface,
} from '@/app/types/HackathonInterface'
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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Calendar as CalendarIcon, Loader } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { toastError } from '@/lib/utils'
import { editHackathon, getAutoGeneratedTheme } from '@/app/firebase/functions'
import { toast } from 'sonner'
import { Slider } from '@/components/ui/slider'

function EditForm(props: HackathonInterface) {
    const { dateEnd, dateStart, dateSubmissionEnd, dateVotingEnd } = props

    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof EditHackathonSchema>>({
        resolver: zodResolver(EditHackathonSchema),
        defaultValues: {
            ...props,
            dateEnd: dateEnd.toDate().getTime(),
            dateStart: dateStart.toDate().getTime(),
            dateSubmissionEnd: dateSubmissionEnd.toDate().getTime(),
            dateVotingEnd: dateVotingEnd.toDate().getTime(),
        },
        disabled: isLoading,
    })

    const [isGettingTheme, setIsGettingTheme] = useState(false)

    async function handleAutoGenerate() {
        try {
            setIsGettingTheme(true)

            const { data } = await getAutoGeneratedTheme()

            form.setValue('theme', data.theme)
            form.setValue('description', data.description)
            form.setValue('ideas', data.ideas)
        } catch (error) {
            toastError(error)
        } finally {
            setIsGettingTheme(false)
        }
    }

    async function handleEdit(values: EditHackathonInterface) {
        try {
            setIsLoading(true)

            await editHackathon(values)
            toast.success('Successfully edited hackathon.')
        } catch (error) {
            toastError(error)
        } finally {
            setIsLoading(false)
        }
    }

    function checkKeyDown(
        e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        e.key === 'Enter' && e.preventDefault()
    }

    // im feeling risky MAKE IT ANY!!!
    function renderSliderForHour(field: any) {
        return (
            <div className="mb-3 space-y-2 p-3">
                <div className="flex gap-2">
                    <p className="text-sm">Set Hour: </p>
                    <p className="text-sm text-gray-400">
                        {String(new Date(field.value).getHours()).padStart(
                            2,
                            '0'
                        )}
                        :00
                    </p>
                </div>
                <Slider
                    defaultValue={[0]}
                    value={[new Date(field.value).getHours()]}
                    onValueChange={(value) => {
                        const updatedDate = new Date(field.value)
                        updatedDate.setHours(value[0])

                        field.onChange(updatedDate.getTime())
                    }}
                    max={23}
                    min={0}
                    step={1}
                    className="cursor-pointer"
                />
            </div>
        )
    }

    return (
        <Form {...form}>
            <form
                className="space-y-8"
                onSubmit={form.handleSubmit(handleEdit)}
            >
                <div className="flex gap-5">
                    <FormField
                        control={form.control}
                        name="dateStart"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Start Date</FormLabel>
                                <FormControl>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={'outline'}
                                                className="w-[250px] justify-start text-left font-normal"
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {field.value ? (
                                                    format(
                                                        new Date(field.value),
                                                        'PPPP'
                                                    )
                                                ) : (
                                                    <span>
                                                        Choose starting date
                                                    </span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={new Date(field.value)}
                                                onSelect={(day) =>
                                                    field.onChange(
                                                        day?.getTime()
                                                    )
                                                }
                                                disabled={(day) =>
                                                    day >
                                                    new Date(
                                                        form.getValues().dateEnd
                                                    )
                                                }
                                            />
                                            {renderSliderForHour(field)}
                                        </PopoverContent>
                                    </Popover>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dateEnd"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>End Date</FormLabel>
                                <FormControl>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={'outline'}
                                                className="w-[250px] justify-start text-left font-normal"
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {field.value ? (
                                                    format(
                                                        new Date(field.value),
                                                        'PPPP'
                                                    )
                                                ) : (
                                                    <span>Choose end date</span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={new Date(field.value)}
                                                onSelect={(day) =>
                                                    field.onChange(
                                                        day?.getTime()
                                                    )
                                                }
                                                disabled={(day) =>
                                                    day <
                                                    new Date(
                                                        form.getValues().dateStart
                                                    )
                                                }
                                            />
                                            {renderSliderForHour(field)}
                                        </PopoverContent>
                                    </Popover>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex gap-5">
                    <FormField
                        control={form.control}
                        name="dateSubmissionEnd"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Submission End Date</FormLabel>
                                <FormControl>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={'outline'}
                                                className="w-[250px] justify-start text-left font-normal"
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {field.value ? (
                                                    format(
                                                        new Date(field.value),
                                                        'PPPP'
                                                    )
                                                ) : (
                                                    <span>
                                                        Choose submission date
                                                    </span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={new Date(field.value)}
                                                onSelect={(day) =>
                                                    field.onChange(
                                                        day?.getTime()
                                                    )
                                                }
                                                disabled={(day) =>
                                                    day >
                                                        new Date(
                                                            form.getValues().dateEnd
                                                        ) ||
                                                    day <
                                                        new Date(
                                                            form.getValues().dateStart
                                                        )
                                                }
                                            />
                                            {renderSliderForHour(field)}
                                        </PopoverContent>
                                    </Popover>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dateVotingEnd"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Voting End Date</FormLabel>
                                <FormControl>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={'outline'}
                                                className="w-[250px] justify-start text-left font-normal"
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {field.value ? (
                                                    format(
                                                        new Date(field.value),
                                                        'PPPP'
                                                    )
                                                ) : (
                                                    <span>
                                                        Choose voting end date
                                                    </span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={new Date(field.value)}
                                                onSelect={(day) =>
                                                    field.onChange(
                                                        day?.getTime()
                                                    )
                                                }
                                                disabled={(day) =>
                                                    day >
                                                        new Date(
                                                            form.getValues().dateEnd
                                                        ) ||
                                                    day <
                                                        new Date(
                                                            form.getValues().dateSubmissionEnd
                                                        )
                                                }
                                            />
                                            {renderSliderForHour(field)}
                                        </PopoverContent>
                                    </Popover>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="theme"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Theme</FormLabel>
                            <Button
                                disabled={isGettingTheme || isLoading}
                                onClick={handleAutoGenerate}
                                size="sm"
                                className="mb-4 block px-2 py-1"
                            >
                                {isGettingTheme ? (
                                    <Loader className="animate-spin" />
                                ) : (
                                    'Edit using AI'
                                )}
                            </Button>
                            <FormControl>
                                <Textarea {...field} />
                            </FormControl>
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
                                    {...field}
                                    className="min-h-[150px]"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="ideas.0"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Idea 1</FormLabel>
                            <FormControl>
                                <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="ideas.1"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Idea 2</FormLabel>
                            <FormControl>
                                <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="ideas.2"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Idea 3</FormLabel>
                            <FormControl>
                                <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="winningProjectID"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Winning Project ID</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    value={field.value ?? ''}
                                    onKeyDown={(e) => checkKeyDown(e)}
                                    placeholder="Enter valid Project ID"
                                />
                            </FormControl>
                            <FormDescription>
                                Important! Make sure that the project ID is
                                valid.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="w-[150px]"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <Loader2 className="animate-spin" />
                    ) : (
                        'Save changes'
                    )}
                </Button>
            </form>
        </Form>
    )
}

export default EditForm
