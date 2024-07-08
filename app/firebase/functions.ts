import { getFunctions, httpsCallable } from 'firebase/functions'
import app from './firebase'
import { JoinInterface } from '../types/ParticipantInterface'
import { SubmitProjectFormInterface } from '../types/ProjectInterface'
import {
    AdminCreateHackathonInterface,
    EditHackathonInterface,
    HackathonConfigInterface,
} from '../types/HackathonInterface'

const functions = getFunctions(app, 'asia-southeast1')

export const joinHackathon = httpsCallable<JoinInterface, never>(
    functions,
    'joinHackathon'
)

export const editTeam = httpsCallable<JoinInterface, never>(
    functions,
    'editTeam'
)

export const submitProject = httpsCallable<SubmitProjectFormInterface, never>(
    functions,
    'submitProject'
)

export const likeProject = httpsCallable<{ projectID: string }, never>(
    functions,
    'likeProject'
)

export const unlikeProject = httpsCallable<{ projectID: string }, never>(
    functions,
    'unlikeProject'
)

export const editHackathonConfig = httpsCallable<
    HackathonConfigInterface,
    never
>(functions, 'editHackathonConfig')

export const startHackathon = httpsCallable<
    AdminCreateHackathonInterface,
    never
>(functions, 'startHackathon')

export const editHackathon = httpsCallable<EditHackathonInterface, never>(
    functions,
    'editHackathon'
)

export const deleteHackathon = httpsCallable<{ hackathonID: string }, never>(
    functions,
    'deleteHackathon'
)

export const deleteParticipant = httpsCallable<
    { hackathonID: string; captainID: string },
    never
>(functions, 'deleteParticipant')

export const deleteProject = httpsCallable<{ projectID: string }, never>(
    functions,
    'deleteProject'
)
