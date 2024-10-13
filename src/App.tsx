import { useState } from "react"
import Board from "./components/Board/Board"
import Settings from "./components/Settings/Settings"
import useGetCards from "./hooks/useGetCards"
import Stats from "./components/Stats/Stats"
import useStatsStore from "./store/statsStore"

function App() {
    const [ numPairs, setNumPairs ] = useState(8)
    const { cards, handleClick } = useGetCards(numPairs)
    const { setDiffLevel } = useStatsStore()

    const setDifficulty = (newNumPairs: number) => {
        setNumPairs(newNumPairs)
        setDiffLevel(newNumPairs)
    }

    return (
        <>
            <Settings setDifficulty={setDifficulty} />
            <Board cards={cards} handleClick={handleClick} />
            <Stats />
        </>
    )
}

export default App
