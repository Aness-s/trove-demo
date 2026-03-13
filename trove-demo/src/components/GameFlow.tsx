import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { GameAnswer } from '../App'
import type { TangleTheme } from '../theme'
import { themes, themeVars } from '../theme'
import { midnightScenarios, goldenScenarios } from '../scenarios'
import FloatingOrbs from './FloatingOrbs'
import PhoneChat from './PhoneChat'

interface Props {
  theme: TangleTheme
  onComplete: (answers: GameAnswer[]) => void
}

const CHOICE_DELAY_AFTER_CHAT = 0.3
const CHOICE_DELAY_DEFAULT = 0.5
const CHOICE_STAGGER = 0.1
const SELECTION_HOLD_MS = 800

export default function GameFlow({ theme, onComplete }: Props) {
  const t = themes[theme]
  const vars = themeVars(t)
  const scenarios = theme === 'midnight' ? midnightScenarios : goldenScenarios

  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<GameAnswer[]>([])
  const [showChat, setShowChat] = useState(false)
  const [chatDone, setChatDone] = useState(false)
  const [selected, setSelected] = useState<number | null>(null)

  const scenario = scenarios[currentQ]
  const hasChat = !!scenario.chatMessages

  useEffect(() => {
    if (hasChat) {
      setShowChat(true)
      setChatDone(false)
    } else {
      setShowChat(false)
      setChatDone(true)
    }
  }, [currentQ, hasChat])

  const handleChoice = (choiceIndex: number) => {
    if (selected !== null) return
    setSelected(choiceIndex)

    const choice = scenario.choices[choiceIndex]
    const newAnswers = [...answers, {
      questionIndex: currentQ,
      choice: choice.text,
      trait: choice.trait,
    }]

    setTimeout(() => {
      if (currentQ < scenarios.length - 1) {
        setAnswers(newAnswers)
        setCurrentQ(currentQ + 1)
        setSelected(null)
      } else {
        onComplete(newAnswers)
      }
    }, SELECTION_HOLD_MS)
  }

  const choiceDelay = hasChat ? CHOICE_DELAY_AFTER_CHAT : CHOICE_DELAY_DEFAULT

  return (
    <motion.div
      className="min-h-svh flex flex-col items-center justify-center relative px-6 py-12 bg-page"
      style={vars}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <FloatingOrbs theme={t} />

      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="h-1 bg-surface-subtle">
          <motion.div
            className="h-full"
            style={{ background: t.progressGradient }}
            animate={{ width: `${((currentQ) / scenarios.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="flex justify-between px-6 py-3">
          <span className="text-xs tracking-widest uppercase text-muted">{t.name.replace('The ', '').replace(' Tangle', '')}</span>
          <span className="text-xs text-muted">{currentQ + 1} / {scenarios.length}</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          className="relative z-10 w-full max-w-lg"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-4xl mb-3 block">{scenario.emoji}</span>
            <h2 className="text-2xl md:text-3xl mb-3 font-serif text-primary">
              {scenario.setup}
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-secondary">
              {scenario.context}
            </p>
          </motion.div>

          {hasChat && showChat && (
            <PhoneChat
              messages={scenario.chatMessages!}
              theme={t}
              onComplete={() => setChatDone(true)}
            />
          )}

          {(chatDone || !hasChat) && (
            <motion.div
              className="space-y-3 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: choiceDelay }}
            >
              {scenario.choices.map((choice, i) => (
                <motion.button
                  key={i}
                  onClick={() => handleChoice(i)}
                  className={`w-full text-left px-6 py-4 rounded-2xl border cursor-pointer transition-all duration-150 ease-out ${selected === null ? 'hover:translate-x-1' : ''}`}
                  style={{
                    background: selected === i ? t.selectedBg : 'var(--card-bg)',
                    borderColor: selected === i ? 'var(--selected-border)' : 'var(--card-border)',
                    color: selected === i ? 'var(--text-primary)' : 'var(--text-secondary)',
                  }}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: choiceDelay + i * CHOICE_STAGGER }}
                  onMouseEnter={(e) => {
                    if (selected !== null) return
                    const el = e.currentTarget
                    el.style.borderColor = 'var(--hover-border)'
                    el.style.background = 'var(--hover-bg)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.borderColor = selected === i ? 'var(--selected-border)' : 'var(--card-border)'
                    el.style.background = selected === i ? 'var(--selected-bg)' : 'var(--card-bg)'
                  }}
                >
                  <span className="text-sm md:text-base">{choice.text}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
