import { create } from "zustand"

type GameHistoryType = {
    attempts: number,
    diffLevel: number,
    matchedPairs: number,
    time: number,
    date: string
}

type StatsType = {
    attempts: number,
    addAttempt: () => void,
    diffLevel: number,
    setDiffLevel: (diffLevel: number) => void,
    matchedPairs: number,
    addMatchedPair: () => void,
    resetStats: () => void,
    time: number,
    incrementTime: () => void,
    resetTime: () => void,
    gameHistory: GameHistoryType[],
    addGameToHistory: () => void,
    loadGameHistory: () => void
}

const useStatsStore = create<StatsType>((set) => ({
    attempts: 0,
    diffLevel: 8,
    matchedPairs: 0,
    time: 0,
    gameHistory: [],

    addAttempt: () => set((state) => ({ attempts: state.attempts + 1 })),

    setDiffLevel: (diffLevel: number) => set({ diffLevel }),

    addMatchedPair: () => set((state) => ({ matchedPairs: state.matchedPairs + 1 })),

    resetStats: () => set({ attempts: 0, matchedPairs: 0 }),

    incrementTime: () => set((state) => ({ time: state.time + 1 })),

    resetTime: () => set({ time: 0 }),

    addGameToHistory: () => set((state) => {
        const newGame: GameHistoryType = {
            attempts: state.attempts,
            diffLevel: state.diffLevel,
            matchedPairs: state.matchedPairs,
            time: state.time,
            date: new Date().toLocaleDateString()
        }

        const updatedHistory = [...state.gameHistory, newGame]
        localStorage.setItem('gameHistory', JSON.stringify(updatedHistory))

        return { gameHistory: updatedHistory }
    }),

    loadGameHistory: () => {
        const savedHistory = localStorage.getItem('gameHistory')
        if (savedHistory) {
            set({ gameHistory: JSON.parse(savedHistory) })
        }
    }

}))

export default useStatsStore