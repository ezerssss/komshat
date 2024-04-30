'use client'

import GitHubIcon from '@/app/icons/GitHubIcon'
import YouTubeIcon from '@/app/icons/YouTubeIcon'
import { joinMembersString } from '@/lib/utils'
import { HeartIcon, Share2Icon } from 'lucide-react'
import ProjectInterface from '../../types/ProjectInterface'
import Carousel from 'react-multi-carousel'
import { carouselResponsive } from '@/app/constants/carousel'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import 'react-multi-carousel/lib/styles.css'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toast } from 'sonner'
import { memo, useEffect, useState } from 'react'
import Image from 'next/image'

function Project(props: Readonly<ProjectInterface>) {
    const {
        id,
        teamName,
        teamPicture,
        members,
        title,
        description,
        github,
        youtube,
        images,
        hearts,
    } = props

    const [projectURL, setProjectURL] = useState('')

    useEffect(() => {
        if (window !== undefined) {
            setProjectURL(
                `${window.location.origin}${window.location.pathname}#${id}`
            )
        }
    }, [id])

    return (
        <article
            id={id}
            className="my-6 block max-w-[800px] rounded-md border-[1px] border-[#E5E7EB] shadow-md"
        >
            <section className="flex items-center gap-4 p-4">
                <div className="h-10 w-10 overflow-hidden rounded-full bg-black">
                    {teamPicture}
                </div>
                <div>
                    <p className="text-sm text-gray-900">{teamName}</p>
                    <p className="text-xs text-gray-500">
                        {joinMembersString(members)}
                    </p>
                </div>
            </section>
            <div className="px-6 sm:px-16">
                <section className="mb-3.5 mt-9">
                    <h3 className="mb-1.5 text-xl font-semibold sm:text-2xl">
                        {title}
                    </h3>
                    <p className="text-pretty text-sm leading-7 sm:text-base">
                        {description}
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
                            {images.map((image, index) => (
                                <PhotoView key={image + index} src={image}>
                                    <div className="flex h-full cursor-pointer items-center justify-center">
                                        <Image
                                            width="0"
                                            height="0"
                                            sizes="100vw"
                                            className="h-auto w-auto object-contain shadow-md"
                                            alt={`${image}/${index}`}
                                            src={image}
                                        />
                                    </div>
                                </PhotoView>
                            ))}
                        </Carousel>
                    </PhotoProvider>
                </section>
            </div>
            <div className="my-3.5 mb-6 mt-[34px] flex items-center gap-10 px-6 text-sm sm:px-14 sm:text-base">
                <div className="flex items-center gap-2">
                    <HeartIcon className="w-[34px]" /> {hearts}
                </div>
                <CopyToClipboard
                    text={projectURL}
                    onCopy={() => toast('Copied shareable link to clipboard.')}
                >
                    <div className="flex cursor-pointer items-center gap-2">
                        <Share2Icon className="w-[34px]" />
                        <p>Share</p>
                    </div>
                </CopyToClipboard>
            </div>
        </article>
    )
}

export default memo(Project)
