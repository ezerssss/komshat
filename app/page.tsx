'use client'

import { Button } from '@/components/ui/button'
import Navbar from './components/Navbar'
import Participants from './components/Home/Participants'
import FirebaseIcon from './icons/FirebaseIcon'
import HTML5Icon from './icons/HTML5Icon'
import JavascriptIcon from './icons/JavascriptIcon'

export default function Home() {
    return (
        <>
            <Navbar />
            <main className="flex items-center gap-20 overflow-hidden px-5 pb-20 pt-10 sm:px-14">
                <div className="min-w-[50%] text-pretty">
                    <h1 className="text-4xl font-bold sm:text-5xl">
                        Weekly Hackathons
                    </h1>
                    <div className="max-w-[500px]">
                        <section className="mt-8">
                            <p className="mb-2 text-gray-400">
                                This week&apos;s theme:
                            </p>
                            <h2 className="italic">
                                &quot;Innovative solutions for Urban Mobility:
                                Redefining Transportation in Cities&quot;
                            </h2>
                        </section>
                        <section className="mt-8">
                            <p className="mb-2 text-gray-400">Description:</p>
                            <h2>
                                Students will brainstorm and develop projects
                                that address urban mobility challenges. This
                                hackathon encourages creativity,
                                problem-solving, and collaboration in creating
                                solutions for city transportation issues
                            </h2>
                        </section>
                        <section className="mt-8">
                            <p className="mb-2 text-gray-400">
                                Suggested Ideas:
                            </p>
                            <ul className="list-inside list-disc">
                                <li>Ride sharing app</li>
                                <li>Bike rental platform</li>
                                <li>Smart parking system</li>
                            </ul>
                        </section>
                        <section className="mt-8 items-center gap-2 sm:flex">
                            <p className="text-gray-400">
                                Suggested Tech Stack:
                            </p>
                            <div className="mt-2 flex items-center gap-2 sm:mt-0">
                                <FirebaseIcon className="w-10" />
                                <HTML5Icon className="w-10" />
                                <JavascriptIcon className="w-10" />
                            </div>
                        </section>
                    </div>
                    <Button className="mt-5">Join Hackathon</Button>
                </div>
                <aside className="marquee hidden max-h-[500px] items-center overflow-hidden text-[500px] font-extrabold lg:flex">
                    <p>komshat</p>
                </aside>
            </main>
            <Participants />
        </>
    )
}
