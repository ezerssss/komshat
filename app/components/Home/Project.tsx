import GitHubIcon from '@/app/icons/GitHubIcon'
import YouTubeIcon from '@/app/icons/YouTubeIcon'
import { joinMembersString } from '@/lib/utils'
import { HeartIcon } from 'lucide-react'
import ProjectInterface from '../../types/ProjectInterface'
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

    return (
        <article
            key={id}
            className="my-6 max-w-[800px] overflow-hidden rounded-md border-[1px] border-[#E5E7EB] shadow-md"
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
            <div className="px-16">
                <section className="mb-3.5 mt-9">
                    <h3 className="mb-1.5 text-2xl font-semibold">{title}</h3>
                    <p className="leading-7">{description}</p>
                </section>
                <section className="mb-8 mt-3.5 flex gap-2">
                    <a href={github} target="_blank">
                        <GitHubIcon className="w-[30px]" />
                    </a>
                    <a href={youtube} target="_blank">
                        <YouTubeIcon className="w-[30px]" />
                    </a>
                </section>
                <section className="mb-3.5 mt-8 flex h-[400px] max-h-[500px] items-center justify-center gap-3.5 bg-red-200">
                    {images.map((image) => (
                        <p key={image}>Image</p>
                    ))}
                </section>
            </div>
            <div className="my-3.5 mb-6 mt-[34px] flex items-center gap-2 px-14">
                <HeartIcon className="w-[34px]" /> {hearts}
            </div>
        </article>
    )
}

export default Project
