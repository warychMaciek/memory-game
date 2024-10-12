import { useEffect, useRef, useState } from "react"
import { shuffleCards } from "../utils/shuffleCards"

type Card = {
    id: number,
    imageUrl: string,
    status: string
}

const useGetCards = () => {
    const [cards, setCards] = useState(shuffleCards())
    const disabled = useRef(true)
    const prevIndex = useRef(-1)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCards(prevCards => prevCards.map(card => ({ ...card, status: 'facedown' })))
            disabled.current = false
        }, 1000)

        return () => clearTimeout(timeout)
    }, [])

    const updateCardStatus = (cardsArr: Omit<Card, "id">[], status: string) => {
        cardsArr.forEach(card => card.status = status)
        setCards([...cards])
    }

    const handleClick = (index: number) => {
        if (disabled.current) return

        const currCard = cards[index]
        const prevCard = cards[prevIndex.current]

        if (currCard.status === 'matched') return

        updateCardStatus([currCard], 'faceup')

        if (!prevCard || prevIndex.current === index) {
            prevIndex.current = index
            return
        }

        if (currCard.id === prevCard.id) {
            updateCardStatus([currCard, prevCard], 'matched')
        } else {
            disabled.current = true

            setTimeout(() => {
                updateCardStatus([currCard, prevCard], 'facedown')
                disabled.current = false
            }, 1000)
        }
        prevIndex.current = -1
    }

    return { cards, handleClick }
}

export default useGetCards