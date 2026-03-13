import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import type { GameAnswer } from '../App'
import type { TangleTheme } from '../theme'
import { themes, themeVars } from '../theme'
import { traits } from '../data/traits'
import { getArchetype } from '../data/archetypes'
import FloatingOrbs from './FloatingOrbs'

interface Props {
  theme: TangleTheme
  answers: GameAnswer[]
  onRestart: () => void
}

const midnightLabels = ['Midnight Text', 'The Confession', 'The Ask', 'The Discovery', 'The Morning After']
const goldenLabels = ['The Interview', 'The Overheard', 'The Brief', 'The Meeting', 'The Offer']

export default function ResultsPage({ theme, answers, onRestart }: Props) {
  const t = themes[theme]
  const vars = themeVars(t)
  const [revealed, setRevealed] = useState(false)
  const archetype = getArchetype(answers)
  const labels = theme === 'midnight' ? midnightLabels : goldenLabels

  useEffect(() => {
    setTimeout(() => setRevealed(true), 1500)
  }, [])

  return (
    <motion.div
      className="min-h-svh flex flex-col items-center justify-center relative px-6 py-16 bg-page"
      style={vars}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <FloatingOrbs theme={t} />

      <div className="relative z-10 w-full max-w-lg">
        {!revealed && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.p
              className="text-xl font-hand text-accent"
              style={{ fontSize: '1.1rem' }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              reading between the lines...
            </motion.p>
          </motion.div>
        )}

        {revealed && (
          <>
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <motion.span
                className="text-6xl block mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, -10, 10, 0] }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {archetype.emoji}
              </motion.span>

              <motion.p
                className="text-sm tracking-widest uppercase mb-2 font-hand text-accent"
                style={{ fontSize: '0.9rem', letterSpacing: '0.15em' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                you are
              </motion.p>

              <motion.h1
                className="text-4xl md:text-5xl mb-4 font-serif text-primary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                {archetype.name}
              </motion.h1>

              <motion.p
                className="text-base md:text-lg leading-relaxed max-w-md mx-auto text-secondary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                {archetype.description}
              </motion.p>
            </motion.div>

            <motion.div
              className="space-y-3 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <p className="text-center text-sm tracking-widest uppercase mb-4 font-hand text-muted" style={{ fontSize: '0.85rem' }}>
                your choices revealed
              </p>

              {answers.map((answer, i) => {
                const trait = traits[answer.trait]
                if (!trait) return null
                return (
                  <motion.div
                    key={i}
                    className="rounded-2xl px-5 py-4 border bg-card border-card"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.4 + i * 0.15 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium tracking-wider uppercase" style={{ color: trait.color }}>
                        {trait.title}
                      </span>
                      <span className="text-xs text-muted">{labels[i]}</span>
                    </div>
                    <p className="text-sm text-secondary">{trait.description}</p>
                  </motion.div>
                )
              })}
            </motion.div>

            <motion.div
              className="rounded-3xl p-px mb-10 overflow-hidden"
              style={{ background: t.artifactGradient }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2 }}
            >
              <div className="rounded-[23px] px-6 py-8 text-center bg-artifact">
                <p className="text-xs tracking-widest uppercase mb-4 text-muted">
                  Your Character Artifact
                </p>
                <div className="flex justify-center gap-2 mb-4">
                  {answers.map((a, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 rounded-full"
                      style={{ background: traits[a.trait]?.color || '#666' }}
                    />
                  ))}
                </div>
                <p className="text-lg mb-1 font-serif text-primary">
                  {archetype.name}
                </p>
                <p className="text-xs font-hand text-muted" style={{ fontSize: '0.75rem' }}>
                  minted from behavior, not biography
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
            >
              <button
                onClick={onRestart}
                className="px-8 py-3 rounded-full text-sm font-medium cursor-pointer border-0"
                style={{
                  background: t.gradient,
                  color: '#fff',
                  boxShadow: '0 0 30px var(--glow)',
                }}
              >
                Play Again
              </button>
              <p className="text-xs font-hand text-muted" style={{ fontSize: '0.8rem' }}>
                different choices, different you ✦
              </p>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  )
}
