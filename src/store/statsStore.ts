import { create } from "zustand"

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
}

const useStatsStore = create<StatsType>((set) => ({
    attempts: 0,
    addAttempt: () => set((state) => ({ attempts: state.attempts + 1 })),
    diffLevel: 8,
    setDiffLevel: (diffLevel: number) => set({ diffLevel }),
    matchedPairs: 0,
    addMatchedPair: () => set((state) => ({ matchedPairs: state.matchedPairs + 1 })),
    resetStats: () => set({ attempts: 0, matchedPairs: 0 }),
    time: 0,
    incrementTime: () => set((state) => ({ time: state.time + 1 })),
    resetTime: () => set({ time: 0 }),
}))

export default useStatsStore