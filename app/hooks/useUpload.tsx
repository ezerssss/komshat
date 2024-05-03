import { toastError } from '@/lib/utils'
import useHackathon from './useHackathon'
import {
    StorageError,
    StorageErrorCode,
    deleteObject,
    getDownloadURL,
    ref,
    uploadBytesResumable,
} from 'firebase/storage'
import { storage } from '../firebase/storage'
import useUser from './useUser'
import { useState } from 'react'

function useUpload() {
    const { isWithinDeadline, hackathon } = useHackathon()
    const user = useUser()

    const [isUploading, setIsUploading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState('')

    async function deleteFromURL(url: string) {
        try {
            const imageRef = ref(storage, url)

            await deleteObject(imageRef)
        } catch (error) {
            if (error instanceof StorageError) {
                if (error.code === StorageErrorCode.OBJECT_NOT_FOUND) {
                    return
                }
            }

            toastError(error)
        }
    }

    async function uploadTeamPicture(image: File): Promise<string> {
        setIsUploading(true)

        if (!hackathon || !isWithinDeadline || !user) {
            throw new Error(
                'The current hackathon is not accepting participants.'
            )
        }

        const storageRef = ref(
            storage,
            `hackathons/${hackathon.hackathonID}/team/${user.uid}-${image.name}`
        )

        const uploadTask = uploadBytesResumable(storageRef, image)
        uploadTask.on(
            'state_changed',
            // While uploading
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100

                setProgress(progress)

                switch (snapshot.state) {
                    case 'running':
                        setIsUploading(true)
                        break
                    case 'success':
                    case 'paused':
                    case 'error':
                    case 'canceled':
                        setIsUploading(false)
                        break
                }
            },
            // When error
            (error) => {
                setError(error.message)
                toastError(error.message)
            },
            // When success
            async () => {
                setIsUploading(false)
            }
        )

        await uploadTask
        const photoUrl = await getDownloadURL(uploadTask.snapshot.ref)

        setIsUploading(false)

        return photoUrl
    }

    async function uploadProjectImages(images: File[]): Promise<string[]> {
        setIsUploading(true)

        if (!hackathon || !isWithinDeadline || !user) {
            throw new Error(
                'The current hackathon is not accepting participants.'
            )
        }

        const photoUrls: string[] = []

        for (const image of images) {
            const storageRef = ref(
                storage,
                `hackathons/${hackathon.hackathonID}/project/${user.uid}-${image.name}`
            )

            const uploadTask = uploadBytesResumable(storageRef, image)
            uploadTask.on(
                'state_changed',
                // While uploading
                (snapshot) => {
                    const indivProgress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100

                    setProgress(indivProgress)

                    switch (snapshot.state) {
                        case 'running':
                            setIsUploading(true)
                            break
                        case 'success':
                        case 'paused':
                        case 'error':
                        case 'canceled':
                            break
                    }
                },
                // When error
                (error) => {
                    setError(error.message)
                    toastError(error.message)
                }
            )

            await uploadTask
            const photoUrl = await getDownloadURL(uploadTask.snapshot.ref)

            photoUrls.push(photoUrl)
        }

        setIsUploading(false)

        return photoUrls
    }

    return {
        uploadTeamPicture,
        uploadProjectImages,
        deleteFromURL,
        isUploading,
        progress,
        error,
    }
}

export default useUpload
