import { Timestamp } from 'firebase/firestore'
import ParticipantInterface from './ParticipantInterface'

export default interface ProjectInterface extends ParticipantInterface {
    id: string
    title: string
    description: string
    github: string
    youtube: string
    images: string[]
    hearts: number
    dateSubmitted: Timestamp
}
