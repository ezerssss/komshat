import Participants from './components/Home/Participants'
import JoinHackathon from './components/Home/JoinHackathon'
import Theme from './components/Theme'

export default function Home() {
    return (
        <>
            <main className="flex items-center gap-20 overflow-hidden px-5 pb-20 pt-10 sm:px-14">
                <div className="min-w-[50%]">
                    <h1 className="text-4xl font-bold sm:text-5xl">
                        Weekly Hackathons
                    </h1>
                    <Theme />
                    <JoinHackathon />
                </div>
                <aside className="marquee hidden max-h-[500px] flex-1 items-center overflow-hidden text-[500px] font-extrabold lg:flex">
                    <p>komshat</p>
                </aside>
            </main>
            <Participants />
        </>
    )
}
