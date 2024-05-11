import { Metadata } from 'next'
import { genericMetadata } from '../constants/metadata'
import HistoryClient from '../components/History/HistoryClient'

export const metadata: Metadata = {
    ...genericMetadata,
    title: 'komshat | Previous hackathons',
}

function History() {
    return (
        <main className="px-5 pb-20 pt-10 sm:px-14">
            <HistoryClient />
        </main>
    )
}

export default History
