import useStatsStore from "../../store/statsStore"
import "./GameHistory.scss"
import { formatTime } from "../../utils/formatTime"

const GameHistory = () => {
    const gameHistory = useStatsStore(state => state.gameHistory)

    const getDifficultyLabel = (difficulty: number): string => {
        switch (difficulty) {
            case 6:
                return 'Easy'
            case 8:
                return 'Medium'
            case 12:
                return 'Hard'
            default:
                return ''
        }
    }

    return (
        <section className="game-history">
            <h2>Game History</h2>
            <table>
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Date</th>
                        <th>Difficulty</th>
                        <th>Attempts</th>
                        <th>Matched pairs</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {gameHistory.map((game, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{game.date}</td>
                            <td>{getDifficultyLabel(game.diffLevel)}</td>
                            <td>{game.attempts}</td>
                            <td>{`${game.matchedPairs} / ${game.diffLevel}`}</td>
                            <td>{formatTime(game.time)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}

export default GameHistory