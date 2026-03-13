import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import type { TangleTheme } from './theme'
import LandingPage from './components/LandingPage'
import TransitionPortal from './components/TransitionPortal'
import GameFlow from './components/GameFlow'
import ResultsPage from './components/ResultsPage'

export type GamePhase = 'landing' | 'transition' | 'playing' | 'results'

export interface GameAnswer {
  questionIndex: number
  choice: string
  trait: string
}

function App() {
  const [phase, setPhase] = useState<GamePhase>('landing')
  const [answers, setAnswers] = useState<GameAnswer[]>([])
  const [activeTheme, setActiveTheme] = useState<TangleTheme>('midnight')

  const handleStart = (theme: TangleTheme) => {
    setActiveTheme(theme)
    setPhase('transition')
  }
  const handleTransitionDone = () => setPhase('playing')
  const handleComplete = (finalAnswers: GameAnswer[]) => {
    setAnswers(finalAnswers)
    setPhase('results')
  }
  const handleRestart = () => {
    setAnswers([])
    setPhase('landing')
  }

  return (
    <AnimatePresence mode="wait">
      {phase === 'landing' && (
        <LandingPage key="landing" onStart={handleStart} />
      )}
      {phase === 'transition' && (
        <TransitionPortal key="transition" theme={activeTheme} onComplete={handleTransitionDone} />
      )}
      {phase === 'playing' && (
        <GameFlow key="playing" theme={activeTheme} onComplete={handleComplete} />
      )}
      {phase === 'results' && (
        <ResultsPage key="results" theme={activeTheme} answers={answers} onRestart={handleRestart} />
      )}
    </AnimatePresence>
  )
}

export default App
