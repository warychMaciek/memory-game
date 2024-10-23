import { useEffect, useState } from "react"
import Board from "./components/Board/Board"
import Settings from "./components/Settings/Settings"
import useGetCards from "./hooks/useGetCards"
import Stats from "./components/Stats/Stats"
import useStatsStore from "./store/statsStore"
import useFetchImages from "./hooks/useFetchImages"
import { CardsSetTopic } from "./assets/types"
import LoadingScreen from "./components/LoadingScreen/LoadingScreen"
import ErrorPopup from "./components/ErrorPopup/ErrorPopup"

function App() {
    const [ numPairs, setNumPairs ] = useState(8)
    const [ cardsSet, setCardsSet ] = useState<CardsSetTopic>('default')
    const { setDiffLevel, loadGameHistory } = useStatsStore()
    const { fetchImages, images, isLoading, error } = useFetchImages()
    const { cards, handleClick, resetGame } = useGetCards(numPairs, images)
    const [ showError, setShowError ] = useState(false)

    useEffect(() => {
        loadGameHistory()
    }, [loadGameHistory])

    useEffect(() => {
        fetchImages(cardsSet)
    }, [cardsSet])

    useEffect(() => {
        if (error) {
            setShowError(true)
            const timer = setTimeout(() => {
                setShowError(false)
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [error])

    const setDifficulty = (newNumPairs: number) => {
        setNumPairs(newNumPairs)
        setDiffLevel(newNumPairs)
    }

    const chooseCardsSet = (topic: CardsSetTopic) => {
        setCardsSet(topic)
    }

    return (
        <>
            {isLoading && <LoadingScreen />}
            <Settings setDifficulty={setDifficulty} resetGame={resetGame} chooseCardsSet={chooseCardsSet} />
            <Board cards={cards} handleClick={handleClick} />
            <Stats />
            {showError && <ErrorPopup errorText={error} />}
        </>
    )
}

export default App