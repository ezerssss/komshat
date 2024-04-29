import ProjectInterface from '@/app/types/ProjectInterface'
import { Timestamp } from 'firebase/firestore'
import Project from './Project'

const projects: ProjectInterface[] = [
    {
        id: '1',
        hackathonID: '1',
        captainID: '1',
        teamName: 'dioskor0',
        teamPicture: 'picture',
        members: ['Ezra Magbanua', 'Jhoanna Olana'],
        title: 'AgrikulToura',
        description:
            "The best app out there. According to Patti Shi in 2014. The youth is seen to be the foundation of the workforce, however most of them don't want to venture into agriculture.",
        github: 'link',
        youtube: 'link2',
        images: [
            'https://s3-alpha-sig.figma.com/img/6c87/449c/8bb8b346ac7bc50f70501c63a3328009?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qBayP0bNvTPmmZdw9ookqJ4jnn-Ot9GKWFzAmW6y0mBOf7-iMFVAjR~b8N0gI1NPxOOqUj9sfF5n1uAzd5NksCVvfYvt~Pn5bb8u4mBBep3WN5qy8ie9DDntUX53ITjGmcVeFp4BerBvGvp0spPJDCu8aOWNALz4Z7ERVabYw6XaUIHC3wcJl8iS-TjHoTWN49LcY9k5vLGXj~qeaf7XEXGPL~Zov8b7EThn3b~DWSUTCvjyA3sdgDe04YOxe-Mn6nmz-bkBc4w4dwwLZEawFkoLwTeJL2mnC8wdyjIRKhO0HXGMIeIP3YzD~YeLPeENxzayWE8wIt2oHksmNYeoew__',
        ],
        hearts: 12135,
        dateSubmitted: new Timestamp(100, 20300),
    },
    {
        id: '2',
        hackathonID: '1',
        captainID: '1',
        teamName: 'dioskor0',
        teamPicture: 'picture',
        members: ['Ezra Magbanua', 'Jhoanna Olana'],
        title: 'AgrikulToura',
        description:
            "The best app out there. According to Patti Shi in 2014. The youth is seen to be the foundation of the workforce, however most of them don't want to venture into agriculture.",
        github: 'link',
        youtube: 'link2',
        images: [
            'https://s3-alpha-sig.figma.com/img/6c87/449c/8bb8b346ac7bc50f70501c63a3328009?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qBayP0bNvTPmmZdw9ookqJ4jnn-Ot9GKWFzAmW6y0mBOf7-iMFVAjR~b8N0gI1NPxOOqUj9sfF5n1uAzd5NksCVvfYvt~Pn5bb8u4mBBep3WN5qy8ie9DDntUX53ITjGmcVeFp4BerBvGvp0spPJDCu8aOWNALz4Z7ERVabYw6XaUIHC3wcJl8iS-TjHoTWN49LcY9k5vLGXj~qeaf7XEXGPL~Zov8b7EThn3b~DWSUTCvjyA3sdgDe04YOxe-Mn6nmz-bkBc4w4dwwLZEawFkoLwTeJL2mnC8wdyjIRKhO0HXGMIeIP3YzD~YeLPeENxzayWE8wIt2oHksmNYeoew__',
        ],
        hearts: 12135,
        dateSubmitted: new Timestamp(100, 20300),
    },
    {
        id: '3',
        hackathonID: '1',
        captainID: '1',
        teamName: 'dioskor0',
        teamPicture: 'picture',
        members: ['Ezra Magbanua', 'Jhoanna Olana'],
        title: 'AgrikulToura',
        description:
            "The best app out there. According to Patti Shi in 2014. The youth is seen to be the foundation of the workforce, however most of them don't want to venture into agriculture.",
        github: 'link',
        youtube: 'link2',
        images: [
            'https://s3-alpha-sig.figma.com/img/6c87/449c/8bb8b346ac7bc50f70501c63a3328009?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qBayP0bNvTPmmZdw9ookqJ4jnn-Ot9GKWFzAmW6y0mBOf7-iMFVAjR~b8N0gI1NPxOOqUj9sfF5n1uAzd5NksCVvfYvt~Pn5bb8u4mBBep3WN5qy8ie9DDntUX53ITjGmcVeFp4BerBvGvp0spPJDCu8aOWNALz4Z7ERVabYw6XaUIHC3wcJl8iS-TjHoTWN49LcY9k5vLGXj~qeaf7XEXGPL~Zov8b7EThn3b~DWSUTCvjyA3sdgDe04YOxe-Mn6nmz-bkBc4w4dwwLZEawFkoLwTeJL2mnC8wdyjIRKhO0HXGMIeIP3YzD~YeLPeENxzayWE8wIt2oHksmNYeoew__',
        ],
        hearts: 12135,
        dateSubmitted: new Timestamp(100, 20300),
    },
]

function Participants() {
    return (
        <section className="px-14">
            <h2 className="text-3xl font-semibold">Participants</h2>
            {projects.map((project) => (
                <Project key={project.id} {...project} />
            ))}
        </section>
    )
}

export default Participants
