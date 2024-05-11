import { Metadata } from 'next'

export const genericMetadata: Metadata = {
    title: 'komshat',
    description:
        'Weekly hackathon challenge! Build and create projects based around an automatically generated theme.',
    openGraph: {
        title: 'komshat',
        description:
            'Weekly hackathon challenge! Build and create projects based around an automatically generated theme.',
        siteName: 'komshat',
        type: 'article',
        images: [
            {
                url: 'https://komshat.vercel.app/komshat.png',
                width: 1152,
                height: 648,
            },
        ],
        locale: 'en_US',
    },
    icons: {
        icon: '/icon.png',
    },
}
