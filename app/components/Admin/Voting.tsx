import { Slider } from '@/components/ui/slider'
import React, { Dispatch, SetStateAction } from 'react'

interface PropsInterface {
    durationInDays: {
        recognition: number
        submission: number
        voting: number
    }
    setDuration: Dispatch<
        SetStateAction<{
            recognition: number
            submission: number
            voting: number
        }>
    >
}

function Voting(props: PropsInterface) {
    const { durationInDays, setDuration } = props
    const { voting } = durationInDays

    return (
        <>
            <div className="mb-1 flex gap-1">
                <p className="text-xs">Voting Phase</p>
                <p className="text-xs text-gray-400">{voting} day(s)</p>
            </div>

            <Slider
                defaultValue={[voting]}
                value={[voting]}
                onValueChange={(value) =>
                    setDuration({ ...durationInDays, voting: value[0] })
                }
                min={1}
                max={20}
                step={1}
                className="mb-3 cursor-pointer"
            />
        </>
    )
}

export default Voting
