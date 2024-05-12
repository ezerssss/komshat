import { Slider } from '@/components/ui/slider'
import React, { Dispatch, SetStateAction } from 'react'
import Recognition from './Recognition'
import Submission from './Submission'
import Voting from './Voting'
import { DurationInDaysInterface } from '@/app/types/HackathonInterface'

interface PropsInterface {
    durationInDays: DurationInDaysInterface
    setDuration: Dispatch<SetStateAction<DurationInDaysInterface>>
}

function Duration(props: PropsInterface) {
    const { durationInDays, setDuration } = props

    return (
        <section className="space-y-3">
            <div className="flex items-center gap-2">
                <p className="text-sm">Duration in days:</p>
                <p className="text-sm text-gray-400">
                    {durationInDays.recognition +
                        durationInDays.submission +
                        durationInDays.voting}{' '}
                    days
                </p>
            </div>
            <Submission
                durationInDays={durationInDays}
                setDuration={setDuration}
            />
            <Voting durationInDays={durationInDays} setDuration={setDuration} />
            <Recognition
                durationInDays={durationInDays}
                setDuration={setDuration}
            />
        </section>
    )
}

export default Duration
