import { Slider } from '@/components/ui/slider'
import React, { Dispatch, SetStateAction } from 'react'
import { twMerge } from 'tailwind-merge'

interface PropsInterface {
    startDay: number
    setStartDay: Dispatch<SetStateAction<number>>
}

function StartDay(props: PropsInterface) {
    const { startDay, setStartDay } = props

    return (
        <section>
            <p className="mb-4 text-sm">Starting Day</p>
            <Slider
                defaultValue={[startDay]}
                value={[startDay]}
                onValueChange={(value) => setStartDay(value[0])}
                max={6}
                min={0}
                step={1}
                className="mx-auto mb-3 w-[90%] cursor-pointer"
            />

            <div className="flex text-center text-xs text-gray-400">
                <p
                    className="w-[14.28%] cursor-pointer"
                    onClick={() => setStartDay(0)}
                >
                    Sun
                </p>
                <p
                    className="w-[14.28%] cursor-pointer"
                    onClick={() => setStartDay(1)}
                >
                    Mon
                </p>
                <p
                    className="w-[14.28%] cursor-pointer"
                    onClick={() => setStartDay(2)}
                >
                    Tue
                </p>
                <p
                    className="w-[14.28%] cursor-pointer"
                    onClick={() => setStartDay(3)}
                >
                    Wed
                </p>
                <p
                    className="w-[14.28%] cursor-pointer"
                    onClick={() => setStartDay(4)}
                >
                    Thu
                </p>
                <p
                    className="w-[14.28%] cursor-pointer"
                    onClick={() => setStartDay(5)}
                >
                    Fri
                </p>
                <p
                    className="w-[14.28%] cursor-pointer"
                    onClick={() => setStartDay(6)}
                >
                    Sat
                </p>
            </div>
        </section>
    )
}

export default StartDay
