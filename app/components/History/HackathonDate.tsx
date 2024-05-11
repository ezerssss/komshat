import { format } from 'date-fns'
import { Timestamp } from 'firebase/firestore'
import { Calendar as CalendarIcon } from 'lucide-react'
import React from 'react'

interface PropsInterface {
    dateStart: Timestamp
    dateEnd: Timestamp
}

function HackathonDate(props: PropsInterface) {
    return (
        <div className="flex items-center text-xs text-gray-400">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {format(props.dateStart.toDate(), 'LLL dd, y')} -{' '}
            {format(props.dateEnd.toDate(), 'LLL dd, y')}
        </div>
    )
}

export default HackathonDate
