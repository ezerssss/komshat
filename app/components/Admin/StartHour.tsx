import { Slider } from '@/components/ui/slider'
import React, { Dispatch, SetStateAction } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { InfoIcon } from 'lucide-react'

interface PropsInterface {
    startHour: number
    setStartHour: Dispatch<SetStateAction<number>>
}

function StartHour(props: PropsInterface) {
    const { startHour, setStartHour } = props

    return (
        <section>
            <div className="mb-4 flex items-center gap-2">
                <p className="text-sm">Starting Hour: </p>
                <p className="text-sm text-gray-400">
                    {String(startHour).padStart(2, '0')}:00
                </p>
                <Popover>
                    <PopoverTrigger asChild>
                        <InfoIcon className="h-4 cursor-pointer" color="gray" />
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px]">
                        <p className="text-sm">
                            The hackathon will also end at the same hour.
                        </p>
                    </PopoverContent>
                </Popover>
            </div>
            <Slider
                defaultValue={[startHour]}
                value={[startHour]}
                onValueChange={(value) => setStartHour(value[0])}
                max={23}
                min={0}
                step={1}
                className="cursor-pointer"
            />
        </section>
    )
}

export default StartHour
