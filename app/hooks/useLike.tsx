import {
    isProjectLiked,
    setProjectAsLiked,
    setProjectAsUnliked,
    toastError,
} from '@/lib/utils'
import { useEffect, useMemo, useState } from 'react'
import { ProjectInterface } from '../types/ProjectInterface'
import useHackathon from './useHackathon'
import { toast } from 'sonner'
import { unlikeProject, likeProject } from '../firebase/functions'

function useLike(project: ProjectInterface) {
    const { hearts, hackathonID, projectID } = project
    const { hackathon } = useHackathon(hackathonID)

    const currentDate = useMemo(() => new Date(), [])
    const isLikeable: boolean = useMemo(
        () => !!hackathon && currentDate < hackathon.dateVotingEnd.toDate(),
        [currentDate, hackathon]
    )

    const [heartsState, setHeartsState] = useState(hearts)
    const [isHearted, setIsHearted] = useState(isProjectLiked(projectID))

    async function handleHeart() {
        if (!isLikeable) {
            toast.warning('Cannot like a project in a finished hackathon.')

            return
        }

        if (isProjectLiked(projectID) || isHearted) {
            setHeartsState(heartsState - 1)

            try {
                setIsHearted(false)
                setProjectAsUnliked(projectID)
                await unlikeProject({ projectID })
            } catch (error) {
                toastError(error)
            }

            return
        }

        setHeartsState(heartsState + 1)
        setIsHearted(true)

        try {
            setProjectAsLiked(projectID)
            await likeProject({ projectID })
        } catch (error) {
            toastError(error)
        }
    }

    useEffect(() => {
        addEventListener('storage', (event) => {
            if (!event.key) {
                return
            }

            if (event.key !== 'likedProjects') {
                return
            }

            if (!event.newValue) {
                setIsHearted(false)
                setHeartsState(0)

                return
            }

            const newLiked: string[] = JSON.parse(event.newValue)

            if (newLiked.includes(projectID)) {
                setIsHearted(true)
                setHeartsState(heartsState + 1)
            } else {
                setIsHearted(false)
                setHeartsState(heartsState - 1)
            }
        })
    }, [heartsState, projectID])

    return { heartsState, isHearted, handleHeart, isLikeable }
}

export default useLike
