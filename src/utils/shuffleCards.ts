import { imagesData } from "../assets/imagesData"

export const shuffleCards = () => {
    const selectedCards = []
    const usedIndices = new Set<number>()

    while (selectedCards.length < 5) {
        const randomIndex = Math.floor(Math.random() * imagesData.length)
        if (!usedIndices.has(randomIndex)) {
            selectedCards.push({
                imageUrl: imagesData[randomIndex],
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