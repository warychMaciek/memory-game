import { useEffect, useRef } from "react"
import useStatsStore from "../../store/statsStore"
import "./Stats.scss"
import { formatTime } from "../../utils/formatTime"

const Stats = () => {
    const { attempts, diffLevel, matchedPairs, time, incrementTime, resetTime, addGameToHistory } = useStatsStore()
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

    useEffect(() => {
        resetTime()

        timerRef.current = setInterval(() => {
            incrementTime()
        }, 1000)

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current)
            }
        }
    }, [diffLevel, resetTime, incrementTime])

    useEffect(() => {
        if (matchedPairs === diffLevel && timerRef.current) {
            clearInterval(timerRef.current)
            addGameToHistory()
        }
    }, [matchedPairs, diffLevel])

    return (
        <section className="stats">
            <p>Attempts: {attempts}</p>
            <p>Matched pairs: {`${matchedPairs} / ${diffLevel}`}</p>
            <p>Time: {formatTime(time)}</p>
        </section>
    )
}

export default Stats