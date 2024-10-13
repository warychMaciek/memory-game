import { ChangeEvent, useState } from "react"

type SettingsProps = {
    setDifficulty: (difficulty: number) => void
}

type DifficultyLevel = 6 | 8 | 12

const Settings = ({ setDifficulty }: SettingsProps) => {
    const [ selectedDifficulty, setSelectedDifficulty ] = useState<DifficultyLevel>(8)

    const handleDifficultyChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10) as DifficultyLevel
        setSelectedDifficulty(value)
        setDifficulty(value)
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
        </section>
    )
}

export default Settings