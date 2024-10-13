import { useState } from "react"
import Board from "./components/Board/Board"
import Settings from "./components/Settings/Settings"
import useGetCards from "./hooks/useGetCards"

function App() {
    const [ numPairs, setNumPairs ] = useState(8)
    const { cards, handleClick } = useGetCards(numPairs)

    const setDifficulty = (newNumPairs: number) => {
        setNumPairs(newNumPairs)
    }

    return (
        <>
            <Settings setDifficulty={setDifficulty} />
            <Board cards={cards} handleClick={handleClick} />
        </>
    )
}

export default App
