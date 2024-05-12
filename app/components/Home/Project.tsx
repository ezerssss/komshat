'use client'

import GitHubIcon from '@/app/icons/GitHubIcon'
import YouTubeIcon from '@/app/icons/YouTubeIcon'
import { joinMembersToString, sanitizeString } from '@/lib/utils'
import { Crown, Heart, Share2Icon } from 'lucide-react'
import Carousel from 'react-multi-carousel'
import { carouselResponsive } from '@/app/constants/carousel'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import 'react-multi-carousel/lib/styles.css'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toast } from 'sonner'
import { memo, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ProjectInterface } from '@/app/types/ProjectInterface'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import useLike from '@/app/hooks/useLike'
import { logEvent } from 'firebase/analytics'
import { analytics } from '@/app/firebase/firebase'
import { useSearchParams } from 'next/navigation'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'

interface PropsInterface extends ProjectInterface {
    winningProjectID: string | null | undefined
}

function Project(props: PropsInterface) {
    const {
        projectID,
        teamName,
        teamPicture,
        members,
        title,
        description,
        github,
        youtube,
        images,
        hackathonID,
        winningProjectID,
    } = props

    const isWinner = projectID === winningProjectID

    const searchParams = useSearchParams()

    const [areImagesLoaded, setAreImagesLoaded] = useState(false)
    const [projectURL, setProjectURL] = useState('')
    const { heartsState, handleHeart, isLikeable, isHearted } = useLike(props)

    const projectRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (window !== undefined) {
            setProjectURL(
                `${window.location.origin}${window.location.pathname}?projectID=${projectID}&hackathonID=${hackathonID}`
            )
        }
    }, [projectID, hackathonID])

    const heartFillStyle = isHearted ? 'red' : 'white'
    const heartBorderStyle = isHearted ? 'red' : 'black'

    async function handleOnCopy() {
        toast.info('Copied shareable link to clipboard.')

        const log = await analytics

        if (log) {
            logEvent(log, 'share', { projectID, hackathonID })
        }
    }

    useEffect(() => {
        if (!areImagesLoaded) {
            return
        }

        if (projectID === searchParams.get('projectID')) {
            projectRef?.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [projectRef, projectID, searchParams, areImagesLoaded])

    let teamNameSanitized = sanitizeString(teamName.replace('Team', ''))

    return (
        <article
            id={projectID}
            className="relative my-6 block max-w-[800px] rounded-md border-[1px] border-[#E5E7EB] shadow-md"
        >
            <section className="flex items-center gap-4 p-4">
                <Avatar>
                    <AvatarImage src={teamPicture} />
                    <AvatarFallback>{teamName[0]}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="text-sm text-gray-900">
                        Team {teamNameSanitized}
                    </p>
                    <p className="text-xs text-gray-500">
                        Members: {sanitizeString(joinMembersToString(members))}
                    </p>
                </div>
            </section>
            <div className="px-6 sm:px-16" ref={projectRef}>
                <section className="mb-3.5 mt-9">
                    <h3 className="mb-1.5 text-xl font-semibold sm:text-2xl">
                        {sanitizeString(title)}
                    </h3>
                    <p className="text-pretty text-sm leading-7 sm:text-base">
                        {sanitizeString(description)}
                    </p>
                </section>
                <section className="mb-8 mt-3.5 flex gap-2">
                    <a href={github} target="_blank">
                        <GitHubIcon className="w-[30px]" />
                    </a>
                    <a href={youtube} target="_blank">
                        <YouTubeIcon className="w-[30px]" />
                    </a>
                </section>
                <section className="mb-3.5 mt-8">
                    <PhotoProvider>
                        <Carousel responsive={carouselResponsive}>
                            {images.map(({ url }, index) => (
                                <PhotoView key={url} src={url}>
                                    <div className="flex h-full cursor-pointer items-center justify-center bg-black">
                                        <img
                                            width="100%"
                                            className="h-auto w-auto object-contain shadow-md"
                                            alt={`${url}/${index}`}
                                            src={url}
                                            onLoad={() =>
                                                setAreImagesLoaded(true)
                                            }
                                        />
                                    </div>
                                </PhotoView>
                            ))}
                        </Carousel>
                    </PhotoProvider>
                </section>
            </div>
            <div className="my-3.5 mb-6 mt-[34px] flex items-center gap-10 px-6 text-sm sm:px-14 sm:text-base">
                <button
                    className="flex items-center gap-2"
                    disabled={!isLikeable}
                    onClick={() => handleHeart()}
                >
                    <Heart
                        className="w-34"
                        fill={!isLikeable ? 'gray' : heartFillStyle}
                        color={!isLikeable ? 'gray' : heartBorderStyle}
                    />
                    {heartsState}
                </button>
                <CopyToClipboard text={projectURL} onCopy={handleOnCopy}>
                    <div className="flex cursor-pointer items-center gap-2">
                        <Share2Icon className="w-[34px]" />
                        <p>Share</p>
                    </div>
                </CopyToClipboard>
            </div>

            {isWinner && (
                <Popover>
                    <PopoverTrigger asChild>
                        <Crown
                            className="absolute right-4 top-4 cursor-pointer"
                            color="#ffbb48"
                        />
                    </PopoverTrigger>
                    <PopoverContent className="w-fit">
                        <p className="text-sm">
                            The winning project for this hackathon.
                        </p>
                    </PopoverContent>
                </Popover>
            )}
        </article>
    )
}

export default memo(Project)
