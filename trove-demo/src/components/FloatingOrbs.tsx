import { motion } from 'framer-motion'
import type { ThemeConfig } from '../theme'

interface Props {
  theme: ThemeConfig
}

export default function FloatingOrbs({ theme }: Props) {
  const positions = [
    { x: '10%', y: '20%', size: 300 },
    { x: '80%', y: '10%', size: 200 },
    { x: '70%', y: '70%', size: 250 },
    { x: '15%', y: '75%', size: 180 },
    { x: '50%', y: '40%', size: 150 },
  ]

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {positions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: pos.size,
            height: pos.size,
            left: pos.x,
            top: pos.y,
            background: theme.orbColors[i] || theme.orbColors[0],
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  )
}
