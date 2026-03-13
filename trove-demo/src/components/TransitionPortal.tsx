import { useEffect } from 'react'
import { motion } from 'framer-motion'
import type { TangleTheme } from '../theme'
import { themes } from '../theme'

interface Props {
  theme: TangleTheme
  onComplete: () => void
}

const PARTICLE_COUNT = 36
const PORTAL_DURATION_MS = 3200
const EASE_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function TransitionPortal({ theme, onComplete }: Props) {
  const t = themes[theme]

  useEffect(() => {
    const timer = setTimeout(onComplete, PORTAL_DURATION_MS)
    return () => clearTimeout(timer)
  }, [onComplete])

  const vw = typeof window !== 'undefined' ? window.innerWidth : 1000
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800
  const maxDim = Math.max(vw, vh)

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ background: t.bg }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
        const angle = (i / PARTICLE_COUNT) * Math.PI * 2
        const radius = maxDim * 0.55
        const startX = Math.cos(angle) * radius
        const startY = Math.sin(angle) * radius
        const len = 40 + Math.random() * 80
        const width = 1.5 + Math.random() * 1.5
        return (
          <motion.div
            key={`particle-${i}`}
            className="absolute"
            style={{
              width,
              height: len,
              borderRadius: width,
              background: `linear-gradient(to bottom, ${t.transitionColors[i % t.transitionColors.length]}, transparent)`,
              transformOrigin: 'center',
              rotate: `${(angle * 180) / Math.PI + 90}deg`,
            }}
            initial={{ x: startX, y: startY, opacity: 0, scale: 0 }}
            animate={{
              x: [startX, 0],
              y: [startY, 0],
              opacity: [0, 0.85, 0],
              scale: [0.4, 1.3, 0.6],
            }}
            transition={{
              duration: 1.8,
              delay: 0.05 + Math.random() * 0.4,
              ease: EASE_EXPO,
              opacity: { duration: 1.8, times: [0, 0.5, 1] },
            }}
          />
        )
      })}

      <motion.div
        className="absolute rounded-full"
        style={{
          width: 180,
          height: 180,
          background: `radial-gradient(circle, ${t.transitionColors[0]}40 0%, ${t.transitionColors[1]}15 50%, transparent 70%)`,
          filter: 'blur(30px)',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 1.8, 2.5],
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 2.2,
          delay: 0.8,
          ease: [0.16, 1, 0.3, 1],
          opacity: { duration: 2.2, delay: 0.8, times: [0, 0.4, 1] },
        }}
      />

      <motion.div
        className="absolute text-center z-10"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{
          opacity: [0, 1, 1, 0],
          scale: [0.85, 1, 1, 1.05],
          y: [10, 0, 0, -8],
        }}
        transition={{
          duration: 2.8,
          times: [0, 0.25, 0.7, 1],
          ease: 'easeOut',
        }}
      >
        <p className="text-2xl md:text-3xl font-serif" style={{ color: t.textPrimary }}>
          {theme === 'midnight' ? "let's see who you are" : "let's see how you move"}
        </p>
        <motion.p
          className="text-sm mt-2 font-hand"
          style={{ color: t.accent, fontSize: '0.85rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 1, 0] }}
          transition={{ duration: 2.8, times: [0, 0.35, 0.55, 1] }}
        >
          {theme === 'midnight' ? 'beneath the surface ✦' : 'under the light ✦'}
        </motion.p>
      </motion.div>

      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, transparent 0%, ${t.bg} 75%)`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0, 1] }}
        transition={{ duration: 3.2, times: [0, 0.5, 0.75, 1], ease: 'easeInOut' }}
      />
    </motion.div>
  )
}
