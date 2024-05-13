'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { InfoIcon, Loader } from 'lucide-react'
import { useState } from 'react'
import StartHour from './StartHour'
import {
    AdminCreateHackathonSchema,
    DurationInDaysInterface,
} from '@/app/types/HackathonInterface'
import Duration from './Duration'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { toastError } from '@/lib/utils'
import { toast } from 'sonner'
import { startHackathon } from '@/app/firebase/functions'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { twMerge } from 'tailwind-merge'

const today = new Date()

function CreateHackathon() {
    const [dateStart, setDateStart] = useState<Date>()
    const [startHour, setStartHour] = useState(0)

    const [duration, setDuration] = useState<DurationInDaysInterface>({
        recognition: 1,
        submission: 3,
        voting: 3,
    })

    const [theme, setTheme] = useState('')
    const [description, setDescription] = useState('')
    const [ideas, setIdeas] = useState(['', '', ''])

    const [isLoading, setIsLoading] = useState(false)

    async function handleCreate() {
        try {
            setIsLoading(true)

            const newHackathon = {
                theme,
                description,
                ideas,
                startHour,
                durationInDays: duration,
                ...(dateStart && { dateTimeNumber: dateStart.getTime() }),
            }

            const { success, data } =
                AdminCreateHackathonSchema.safeParse(newHackathon)

            if (!success) {
                toast.error(
                    "Invalid data for creating a new hackathon. I don't know where so please find it yourself :)"
                )

                return
            }

            await startHackathon(data)

            setDateStart(undefined)
            setStartHour(0)
            setTheme('')
            setDescription('')
            setIdeas(['', '', ''])
            setDuration({
                recognition: 1,
                submission: 3,
                voting: 3,
            })
            toast.success('Successfully created hackathon.')
        } catch (error) {
            toastError(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="min-w-[500px] flex-1 space-y-6 px-10 py-8">
            <div className="flex items-center gap-2">
                <h2 className="text-2xl font-extrabold">Start a Hackathon</h2>
                <Popover>
                    <PopoverTrigger asChild>
                        <InfoIcon className="h-4 cursor-pointer" color="gray" />
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px]">
                        <p className="text-sm">
                            Starting a hackathon at a specified date will
                            override the running hackathon at that date.
                        </p>
                    </PopoverContent>
                </Popover>
            </div>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={'outline'}
                        className={twMerge(
                            'w-[280px] justify-start text-left font-normal',
                            !dateStart && 'text-muted-foreground'
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateStart ? (
                            format(dateStart, 'PPP')
                        ) : (
                            <span>Choose starting date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={dateStart}
                        onSelect={setDateStart}
                        disabled={{ before: today }}
                    />
                </PopoverContent>
            </Popover>
            <div className="max-w-[500px] space-y-6">
                <StartHour startHour={startHour} setStartHour={setStartHour} />
                <Duration durationInDays={duration} setDuration={setDuration} />
            </div>
            <section>
                <p className="mb-4 text-sm">Hackathon Theme:</p>
                <Textarea
                    placeholder="Enter hackathon theme"
                    value={theme}
                    onChange={(event) => setTheme(event.target.value)}
                />
            </section>
            <section>
                <p className="mb-4 text-sm">Theme description:</p>
                <Textarea
                    placeholder="Enter theme description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
            </section>
            <section>
                <p className="mb-4 text-sm">Sample Ideas:</p>
                <div className="space-y-2">
                    <Input
                        placeholder="Enter Idea 1"
                        value={ideas[0]}
                        onChange={(event) => {
                            ideas[0] = event.target.value
                            setIdeas([...ideas])
                        }}
                    />
                    <Input
                        placeholder="Enter Idea 2"
                        value={ideas[1]}
                        onChange={(event) => {
                            ideas[1] = event.target.value
                            setIdeas([...ideas])
                        }}
                    />
                    <Input
                        placeholder="Enter Idea 3"
                        value={ideas[2]}
                        onChange={(event) => {
                            ideas[2] = event.target.value
                            setIdeas([...ideas])
                        }}
                    />
                </div>
            </section>
            <Button disabled={isLoading} onClick={handleCreate}>
                {isLoading ? (
                    <Loader className="animate-spin" />
                ) : (
                    'Start Hackathon'
                )}
            </Button>
        </Card>
    )
}

export default CreateHackathon
