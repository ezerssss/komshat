import { HackathonInterface } from '@/app/types/HackathonInterface'
import { Card } from '@/components/ui/card'
import HackathonDate from './HackathonDate'
import LinesEllipsis from 'react-lines-ellipsis'
import { useRouter } from 'next/navigation'

interface PropsInterface extends HackathonInterface {
    index: number
}

function HackathonCard(props: PropsInterface) {
    const { index, theme, description, dateStart, dateEnd, hackathonID } = props

    const router = useRouter()

    return (
        <Card
            className="flex w-full max-w-[515px] cursor-pointer items-center gap-x-4 px-4 py-4 sm:px-8 sm:py-2"
            onClick={() => router.push(`/history/${hackathonID}`)}
        >
            <p className="text-[60px] font-extrabold sm:text-[144px]">
                {String(index).padStart(2, '0')}
            </p>
            <div className="space-y-2 sm:space-y-4">
                <p className="text-sm font-extrabold leading-5 sm:text-base sm:leading-6">
                    {theme}
                </p>
                <p className="h-12 text-xs">
                    <LinesEllipsis text={description} maxLine={3} />
                </p>
                <HackathonDate dateStart={dateStart} dateEnd={dateEnd} />
            </div>
        </Card>
    )
}

export default HackathonCard
