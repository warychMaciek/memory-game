import { useEffect, useRef, useState } from "react"
import { shuffleCards } from "../utils/shuffleCards"
import { CardType } from "../assets/types"
import useStatsStore from "../store/statsStore"

const useGetCards = (numPairs: number) => {
    const [ cards, setCards ] = useState<CardType[]>([])
    const disabled = useRef(true)
    const prevIndex = useRef(-1)
    const { addAttempt, addMatchedPair, resetStats } = useStatsStore()

    useEffect(() => {
        const newCards = shuffleCards(numPairs)
        setCards(newCards)

        const timeout = setTimeout(() => {
            setCards(prevCards => prevCards.map(card => ({ ...card, status: 'facedown' })))
            disabled.current = false
        }, 1000)

        return () => clearTimeout(timeout)
    }, [numPairs])

    const updateCardStatus = (cardsArr: Omit<CardType, "id">[], status: string) => {
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

        addAttempt()

        if (currCard.id === prevCard.id) {
            updateCardStatus([currCard, prevCard], 'matched')
            addMatchedPair()
        } else {
            disabled.current = true

            setTimeout(() => {
                updateCardStatus([currCard, prevCard], 'facedown')
                disabled.current = false
            }, 1000)
        }
        prevIndex.current = -1
    }

    const resetGame = () => {
        resetStats()
        const newCards = shuffleCards(numPairs)
        setCards(newCards)
        prevIndex.current = -1
        disabled.current = true

        const timeout = setTimeout(() => {
            setCards(prevCards => prevCards.map(card => ({ ...card, status: 'facedown' })))
            disabled.current = false
        }, 1000)

        return () => clearTimeout(timeout)
    }

    return { cards, handleClick, resetGame }
}

export default useGetCards