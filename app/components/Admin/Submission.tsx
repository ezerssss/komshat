import { DurationInDaysInterface } from '@/app/types/HackathonInterface'
import { Slider } from '@/components/ui/slider'
import React, { Dispatch, SetStateAction } from 'react'

interface PropsInterface {
    durationInDays: DurationInDaysInterface
    setDuration: Dispatch<SetStateAction<DurationInDaysInterface>>
}

function Submission(props: PropsInterface) {
    const { durationInDays, setDuration } = props
    const { submission } = durationInDays

    return (
        <>
            <div className="mb-1 flex gap-1">
                <p className="text-xs">Submission Phase</p>
                <p className="text-xs text-gray-400">{submission} day(s)</p>
            </div>

            <Slider
                defaultValue={[submission]}
                value={[submission]}
                onValueChange={(value) =>
                    setDuration({ ...durationInDays, submission: value[0] })
                }
                min={1}
                max={20}
                step={1}
                className="mb-3 cursor-pointer"
            />
        </>
    )
}

export default Submission
