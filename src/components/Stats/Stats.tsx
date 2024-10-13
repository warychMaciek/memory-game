import { useEffect, useRef } from "react"
import useStatsStore from "../../store/statsStore"
import "./Stats.scss"

const Stats = () => {
    const { attempts, diffLevel, matchedPairs, time, incrementTime, resetTime } = useStatsStore()
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
        }
    }, [matchedPairs, diffLevel])

    const formatTime = (time: number) => {
        const mins = Math.floor(time / 60)
        const secs = time % 60
        return `${mins < 10 ? `0${mins}` : mins}:${secs < 10 ? `0${secs}` : secs}`
    }

    return (
        <section className="stats">
            <p>Attempts: {attempts}</p>
            <p>Matched pairs: {`${matchedPairs} / ${diffLevel}`}</p>
            <p>Time: {formatTime(time)}</p>
        </section>
    )
}

export default Stats