import { initializeApp } from 'firebase/app'
import { getAnalytics, isSupported } from 'firebase/analytics'

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: 'komshat-3be71.firebaseapp.com',
    projectId: 'komshat-3be71',
    storageBucket: 'komshat-3be71.appspot.com',
    messagingSenderId: '675937718677',
    appId: '1:675937718677:web:45b77bb0e33b4eb666669c',
    measurementId: 'G-ZS07MBGDLT',
}

const app = initializeApp(firebaseConfig)
export const analytics = isSupported().then((yes) =>
    yes ? getAnalytics(app) : null
)

export default app
