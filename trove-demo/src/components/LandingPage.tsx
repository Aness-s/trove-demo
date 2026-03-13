import { useState } from 'react'
import { motion } from 'framer-motion'
import type { TangleTheme } from '../theme'
import { themes } from '../theme'

interface Props {
  onStart: (theme: TangleTheme) => void
}

const sparkleVariants = {
  animate: {
    rotate: [0, 15, -10, 0],
    scale: [1, 1.2, 0.9, 1],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const },
  },
}

export default function LandingPage({ onStart }: Props) {
  const [hovered, setHovered] = useState<TangleTheme | null>(null)

  const bgColor = hovered === 'golden' ? themes.golden.bg : '#0a0a0f'
  const textColor = hovered === 'golden' ? themes.golden.textPrimary : '#f5f0ff'
  const subColor = hovered === 'golden' ? themes.golden.textSecondary : '#a0a0b8'
  const handColor = hovered === 'golden' ? themes.golden.handwritingColor : '#c4b5fd'
  const sparkColors = hovered === 'golden'
    ? ['#d97706', '#ea580c', '#d97706']
    : ['#a78bfa', '#f472b6', '#a78bfa']

  // Floating orbs adapt to hovered theme
  const orbSets = {
    midnight: [
      { size: 300, x: '10%', y: '20%', color: 'rgba(168, 85, 247, 0.15)' },
      { size: 200, x: '80%', y: '10%', color: 'rgba(236, 72, 153, 0.12)' },
      { size: 250, x: '70%', y: '70%', color: 'rgba(99, 102, 241, 0.12)' },
      { size: 180, x: '15%', y: '75%', color: 'rgba(52, 211, 153, 0.1)' },
    ],
    golden: [
      { size: 300, x: '10%', y: '20%', color: 'rgba(251, 191, 36, 0.3)' },
      { size: 200, x: '80%', y: '10%', color: 'rgba(234, 88, 12, 0.22)' },
      { size: 250, x: '70%', y: '70%', color: 'rgba(217, 119, 6, 0.25)' },
      { size: 180, x: '15%', y: '75%', color: 'rgba(245, 158, 11, 0.18)' },
    ],
    neutral: [
      { size: 300, x: '10%', y: '20%', color: 'rgba(120, 120, 140, 0.08)' },
      { size: 200, x: '80%', y: '10%', color: 'rgba(120, 120, 140, 0.06)' },
      { size: 250, x: '70%', y: '70%', color: 'rgba(120, 120, 140, 0.06)' },
      { size: 180, x: '15%', y: '75%', color: 'rgba(120, 120, 140, 0.05)' },
    ],
  }
  const activeOrbs = hovered ? orbSets[hovered] : orbSets.neutral

  return (
    <motion.div
      className="min-h-svh flex flex-col items-center justify-center relative px-6"
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background */}
      <motion.div
        className="fixed inset-0 -z-10"
        animate={{ backgroundColor: bgColor }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />

      {/* Floating orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {activeOrbs.map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{ left: orb.x, top: orb.y }}
            animate={{
              width: orb.size,
              height: orb.size,
              backgroundColor: orb.color,
              x: [0, 30, -20, 0],
              y: [0, -40, 20, 0],
              scale: [1, 1.1, 0.95, 1],
            }}
            transition={{
              x: { duration: 8 + i * 2, repeat: Infinity, ease: 'easeInOut' },
              y: { duration: 8 + i * 2, repeat: Infinity, ease: 'easeInOut' },
              scale: { duration: 8 + i * 2, repeat: Infinity, ease: 'easeInOut' },
              backgroundColor: { duration: 0.8, ease: 'easeInOut' },
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-3xl w-full text-center">
        {/* Sparkles */}
        <motion.div
          className="flex justify-center mb-8 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {['✦', '◈', '✦'].map((char, i) => (
            <motion.span
              key={i}
              className="text-2xl"
              animate={{ color: sparkColors[i] }}
              variants={sparkleVariants}
              whileInView="animate"
              transition={{ color: { duration: 0.6 } }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>

        {/* Label */}
        <motion.p
          className="text-base tracking-widest uppercase mb-4"
          style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '1.05rem', letterSpacing: '0.08em', fontStyle: 'italic' }}
          animate={{ color: handColor }}
          transition={{ duration: 0.6 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          a tiny experiment in character
        </motion.p>

        {/* Title */}
        <motion.h1
          className="text-5xl md:text-7xl font-normal mb-6 leading-tight"
          style={{ fontFamily: "'DM Serif Display', serif" }}
          animate={{ color: textColor }}
          transition={{ duration: 0.6 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Who Are You
          <br />
          <motion.span
            className="italic"
            animate={{ color: hovered === 'golden' ? '#d97706' : '#c084fc' }}
            transition={{ duration: 0.6 }}
          >
            Really
          </motion.span>
          ?
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl mb-16 leading-relaxed max-w-md mx-auto"
          animate={{ color: subColor }}
          transition={{ duration: 0.6 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          Two tangles. Two worlds. Your choices reveal
          more than you think.
        </motion.p>

        {/* Tangle Cards */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch">
          {/* Midnight Tangle */}
          <motion.button
            className="flex-1 max-w-sm mx-auto md:mx-0 rounded-3xl p-px cursor-pointer border-0 text-left"
            style={{
              background: hovered === 'midnight'
                ? 'linear-gradient(145deg, rgba(168,85,247,0.5), rgba(99,102,241,0.3), rgba(236,72,153,0.4))'
                : 'linear-gradient(145deg, rgba(168,85,247,0.2), rgba(99,102,241,0.1), rgba(236,72,153,0.15))',
            }}
            onMouseEnter={() => setHovered('midnight')}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onStart('midnight')}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="rounded-[23px] px-8 py-10 h-full" style={{ background: '#12121f' }}>
              <span className="text-4xl block mb-4">🌙</span>
              <h3
                className="text-xl mb-2"
                style={{ fontFamily: "'DM Serif Display', serif", color: '#f5f0ff' }}
              >
                The Midnight Tangle
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#9ca3b8' }}>
                A friend you forgot calls at 1:47 AM. One night. Five moments that reveal who you really are when it matters.
              </p>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {['#a78bfa', '#c084fc', '#e879f9', '#f472b6'].map((c, i) => (
                    <div key={i} className="w-2 h-2 rounded-full" style={{ background: c }} />
                  ))}
                </div>
                <span className="text-xs" style={{ color: '#6b6b80', fontFamily: "'Libre Baskerville', serif", fontSize: '0.75rem', fontStyle: 'italic' }}>
                  ~ 2 min ~
                </span>
              </div>
            </div>
          </motion.button>

          {/* Golden Hour Tangle */}
          <motion.button
            className="flex-1 max-w-sm mx-auto md:mx-0 rounded-3xl p-px cursor-pointer border-0 text-left"
            style={{
              background: hovered === 'golden'
                ? 'linear-gradient(145deg, rgba(251,191,36,0.5), rgba(234,88,12,0.35), rgba(217,119,6,0.45))'
                : hovered === 'midnight'
                  ? 'linear-gradient(145deg, rgba(251,191,36,0.1), rgba(234,88,12,0.05), rgba(217,119,6,0.08))'
                  : 'linear-gradient(145deg, rgba(251,191,36,0.15), rgba(234,88,12,0.1), rgba(217,119,6,0.12))',
            }}
            onMouseEnter={() => setHovered('golden')}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onStart('golden')}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <div
              className="rounded-[23px] px-8 py-10 h-full"
              style={{
                background: hovered === 'golden' ? '#faf6ee' : '#1a1812',
              }}
            >
              <span className="text-4xl block mb-4">☀️</span>
              <h3
                className="text-xl mb-2"
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  color: hovered === 'golden' ? '#1a1510' : '#f5edd8',
                }}
              >
                The Golden Hour Tangle
              </h3>
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: hovered === 'golden' ? '#6b5e50' : '#9c9380' }}
              >
                Your first week at a startup that might change everything. Five crossroads that show who you are under pressure.
              </p>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {['#fbbf24', '#f59e0b', '#d97706', '#ea580c'].map((c, i) => (
                    <div key={i} className="w-2 h-2 rounded-full" style={{ background: c }} />
                  ))}
                </div>
                <span
                  className="text-xs"
                  style={{
                    color: hovered === 'golden' ? '#a09585' : '#6b6b5e',
                    fontFamily: "'Libre Baskerville', serif",
                    fontSize: '0.75rem', fontStyle: 'italic',
                  }}
                >
                  ~ 2 min ~
                </span>
              </div>
            </div>
          </motion.button>
        </div>

        {/* Bottom hint */}
        <motion.p
          className="mt-10 text-sm"
          style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '0.85rem', fontStyle: 'italic' }}
          animate={{ color: hovered === 'golden' ? '#a09585' : '#6b6b80' }}
          transition={{ duration: 0.6 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          ~ no right answers. just you. ~
        </motion.p>
      </div>
    </motion.div>
  )
}
