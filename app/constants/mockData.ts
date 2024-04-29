import ProjectInterface from '../types/ProjectInterface'
import { Timestamp } from 'firebase/firestore'

export const projectsMockData: ProjectInterface[] = [
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
            'https://img.freepik.com/free-photo/sunset-silhouettes-trees-mountains-generative-ai_169016-29371.jpg?t=st=1714391803~exp=1714395403~hmac=4fb517a5e7cc513042986b30ed58647ac526357acb6c282c6ada460ed7e6db16&w=1380',
            'https://s3-alpha-sig.figma.com/img/6c87/449c/8bb8b346ac7bc50f70501c63a3328009?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qBayP0bNvTPmmZdw9ookqJ4jnn-Ot9GKWFzAmW6y0mBOf7-iMFVAjR~b8N0gI1NPxOOqUj9sfF5n1uAzd5NksCVvfYvt~Pn5bb8u4mBBep3WN5qy8ie9DDntUX53ITjGmcVeFp4BerBvGvp0spPJDCu8aOWNALz4Z7ERVabYw6XaUIHC3wcJl8iS-TjHoTWN49LcY9k5vLGXj~qeaf7XEXGPL~Zov8b7EThn3b~DWSUTCvjyA3sdgDe04YOxe-Mn6nmz-bkBc4w4dwwLZEawFkoLwTeJL2mnC8wdyjIRKhO0HXGMIeIP3YzD~YeLPeENxzayWE8wIt2oHksmNYeoew__',
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
            'https://img.freepik.com/free-photo/sunset-silhouettes-trees-mountains-generative-ai_169016-29371.jpg?t=st=1714391803~exp=1714395403~hmac=4fb517a5e7cc513042986b30ed58647ac526357acb6c282c6ada460ed7e6db16&w=1380',
        ],
        hearts: 12135,
        dateSubmitted: new Timestamp(100, 20300),
    },
]
