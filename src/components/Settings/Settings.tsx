import { ChangeEvent, useState } from "react"
import useStatsStore from "../../store/statsStore"

type SettingsProps = {
    setDifficulty: (difficulty: number) => void,
    resetGame: () => void
}

type DifficultyLevel = 6 | 8 | 12

const Settings = ({ setDifficulty, resetGame }: SettingsProps) => {
    const [ selectedDifficulty, setSelectedDifficulty ] = useState<DifficultyLevel>(8)
    const { resetStats, attempts, addGameToHistory, gameStatus } = useStatsStore()

    const handleDifficultyChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (attempts > 0) addGameToHistory()
        const value = parseInt(event.target.value, 10) as DifficultyLevel
        setSelectedDifficulty(value)
        setDifficulty(value)
        resetStats()
    }

    return (
        <section className="settings">
            <form>
                <label>
                    <input 
                        type="radio" 
                        value={6}
                        checked={selectedDifficulty === 6}
                        onChange={handleDifficultyChange}
                    />
                    Easy
                </label>
                <label>
                    <input 
                        type="radio" 
                        value={8}
                        checked={selectedDifficulty === 8}
                        onChange={handleDifficultyChange}
                    />
                    Medium
                </label>
                <label>
                    <input 
                        type="radio" 
                        value={12}
                        checked={selectedDifficulty === 12}
                        onChange={handleDifficultyChange}
                    />
                    Hard
                </label>
            </form>
            {
                gameStatus === 'completed' && (
                    <div className="settings__modal">
                        <button onClick={resetGame}>Play again!</button>
                    </div>
                )
            }
        </section>
    )
}

export default Settings