import { useCallback, useState } from "react"
import { CardsSetTopic } from "../assets/types"

type ImageData = {
    urls: {
        small: string
    }
}

const useFetchImages = () => {
    const apiKey = import.meta.env.VITE_UNSPLASH_API_KEY || ''
    const [ isLoading, setIsLoading ] = useState(false)
    const [ images, setImages ] = useState<string[]>([])
    const [ error, setError ] = useState<string | null>(null)

    const fetchImages = useCallback(async (topic: CardsSetTopic) => {
        if (isLoading) return
        setIsLoading(true)
        setError(null)

        const imagesUrls: string[] = []
        let topicId: string = ''

        switch (topic) {
            case 'animals':
                topicId = "Jpg6Kidl-Hk"
                break
            case 'architecture':
                topicId = "M8jVbLbTRws"
                break
            case 'nature':
                topicId = "6sMVjTLSkeQ"
                break
            default:
                setImages([])
                setIsLoading(false)
                return
        }

        try {
            const response = await fetch(`https://api.unsplash.com/photos/random/?topics=${topicId}&count=12&client_id=${apiKey}`)
            const data = await response.json()

            data.forEach((image: Partial<ImageData>) => {
                image.urls && image.urls.small && imagesUrls.push(image.urls.small)
            })

            setImages(imagesUrls)

        } catch (error) {
            console.error(error)
            setError('Error fetching images. Please try again later.')
        } finally {
            setIsLoading(false)
        }
    }, [])

    return { fetchImages, isLoading, images, error }
}

export default useFetchImages