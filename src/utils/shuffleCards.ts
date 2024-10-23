import { imagesData } from "../assets/imagesData"

export const shuffleCards = (numPairs: number, cardsSet: string[]) => {
    const selectedCards = []
    const usedIndices = new Set<number>()
    let cardsImagesUrls: string[] = []

    cardsSet.length === 0 ? cardsImagesUrls = [...imagesData] : cardsImagesUrls = [...cardsSet]

    while (selectedCards.length < numPairs) {
        const randomIndex = Math.floor(Math.random() * cardsImagesUrls.length)
        if (!usedIndices.has(randomIndex)) {
            selectedCards.push({
                imageUrl: cardsImagesUrls[randomIndex],
                id: randomIndex
            })
            usedIndices.add(randomIndex)
        }
    }

    return [...selectedCards, ...selectedCards].sort(() => Math.random() - 0.5).map(card => ({
        id: card.id,
        imageUrl: card.imageUrl,
        status: 'faceup'
    }))
}