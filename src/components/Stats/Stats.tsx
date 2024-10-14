import { useEffect, useRef, useState } from "react"
import useStatsStore from "../../store/statsStore"
import "./Stats.scss"
import { formatTime } from "../../utils/formatTime"
import { IoIosStats } from "react-icons/io";
import GameHistory from "../GameHistory/GameHistory";

const Stats = () => {
    const { attempts, diffLevel, matchedPairs, time, incrementTime, resetTime, addGameToHistory, gameStatus } = useStatsStore()
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
    const [ activeOnMobile, setActiveOnMobile ] = useState(false)
    const statsRef = useRef<HTMLDivElement | null>(null)
    const [ showHistory, setShowHistory ] = useState(false)

    useEffect(() => {
        if (gameStatus === 'in-progress') {

            resetTime()
            
            timerRef.current = setInterval(() => {
                incrementTime()
            }, 1000)
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current)
            }
        }
    }, [diffLevel, resetTime, incrementTime, gameStatus])

    useEffect(() => {
        if (matchedPairs === diffLevel && timerRef.current) {
            clearInterval(timerRef.current)
            addGameToHistory()
        }
    }, [matchedPairs, diffLevel, addGameToHistory])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            
            if (statsRef.current && !statsRef.current.contains(event.target as Node)) {
                setActiveOnMobile(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleMobileSwitcherClick = () => setActiveOnMobile(!activeOnMobile)

    const handleHistoryButtonClick = () => setShowHistory(true)

    const handleGameHistoryClose = () => setShowHistory(false)

    return (
        <section ref={statsRef} className="stats">
            <button onClick={handleMobileSwitcherClick} className="stats__mobile-switcher">
                {!activeOnMobile ? <IoIosStats /> : 'X'}
            </button>

            <div className={`stats__wrapper ${activeOnMobile ? '--active' : ''}`}>
                <p>Attempts: {attempts}</p>
                <p>Matched pairs: {`${matchedPairs} / ${diffLevel}`}</p>
                <p>Time: {formatTime(time)}</p>
                <button onClick={handleHistoryButtonClick} className="stats__history-button">Show history of games</button>
            </div>

            <GameHistory isHistoryActive={showHistory} handleGameHistoryClose={handleGameHistoryClose} />
        </section>
    )
}

export default Stats