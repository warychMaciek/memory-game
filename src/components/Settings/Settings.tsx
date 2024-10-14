import { ChangeEvent, useEffect, useRef, useState } from "react"
import useStatsStore from "../../store/statsStore"
import "./Settings.scss"
import { IoSettingsOutline } from "react-icons/io5";

type SettingsProps = {
    setDifficulty: (difficulty: number) => void,
    resetGame: () => void
}

type DifficultyLevel = 6 | 8 | 12

const Settings = ({ setDifficulty, resetGame }: SettingsProps) => {
    const [ selectedDifficulty, setSelectedDifficulty ] = useState<DifficultyLevel>(8)
    const { resetStats, attempts, addGameToHistory, gameStatus } = useStatsStore()
    const [ activeOnMobile, setActiveOnMobile ] = useState(false)
    const settingsRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
                setActiveOnMobile(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleDifficultyChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (attempts > 0) addGameToHistory()
        const value = parseInt(event.target.value, 10) as DifficultyLevel
        setSelectedDifficulty(value)
        setDifficulty(value)
        resetStats()
        setActiveOnMobile(false)
    }

    const handleClick = () => {
        setActiveOnMobile(!activeOnMobile)
    }

    return (
        <section ref={settingsRef} className="settings">
            <button onClick={handleClick} className="settings__mobile-switcher">
                {
                    !activeOnMobile ? <IoSettingsOutline /> : 'X'
                }
            </button>

            <form className={`settings__form ${activeOnMobile ? '--active' : ''}`}>
                <h3>Difficulty Level:</h3>
                <div className="settings__form-inputs-wrapper">
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
                </div>
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