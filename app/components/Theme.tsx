'use client'

import Countdown from 'react-countdown'

function Theme() {
    return (
        <div className="text-pretty">
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
                        Students will brainstorm and develop projects that
                        address urban mobility challenges. This hackathon
                        encourages creativity, problem-solving, and
                        collaboration in creating solutions for city
                        transportation issues
                    </h2>
                </section>
                <section className="mt-8">
                    <p className="mb-2 text-gray-400">Suggested Ideas:</p>
                    <ul className="list-inside list-disc">
                        <li>Ride sharing app</li>
                        <li>Bike rental platform</li>
                        <li>Smart parking system</li>
                    </ul>
                </section>
                <section className="mt-8 flex items-center gap-2">
                    <p className="text-gray-400">Submissions until:</p>
                    <Countdown date={new Date().getTime() + 125000}>
                        <p>Complete</p>
                    </Countdown>
                </section>
            </div>
        </div>
    )
}

export default Theme
