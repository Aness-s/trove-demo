import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ThemeConfig } from '../theme'
import { themeVars } from '../theme'

interface Message {
  sender: string
  text: string
  isUser?: boolean
  delay: number
}

interface Props {
  messages: Message[]
  theme: ThemeConfig
  onComplete: () => void
}

const CHAT_COMPLETE_DELAY = 600

export default function PhoneChat({ messages, theme, onComplete }: Props) {
  const [visibleMessages, setVisibleMessages] = useState<number>(0)
  const [typing, setTyping] = useState(false)
  const vars = themeVars(theme)

  useEffect(() => {
    if (visibleMessages >= messages.length) {
      setTimeout(onComplete, CHAT_COMPLETE_DELAY)
      return
    }

    const msg = messages[visibleMessages]
    setTyping(true)

    const typingTimer = setTimeout(() => {
      setTyping(false)
      setVisibleMessages(v => v + 1)
    }, msg.delay)

    return () => clearTimeout(typingTimer)
  }, [visibleMessages, messages, onComplete])

  return (
    <motion.div
      className="mx-auto max-w-sm"
      style={vars}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div
        className="rounded-3xl p-1 relative overflow-hidden"
        style={{ background: theme.artifactGradient }}
      >
        <div className="rounded-[22px] overflow-hidden bg-chat">
          <div className="flex items-center justify-between px-6 py-3 bg-surface-faint">
            <span className="text-xs text-muted">
              {theme.id === 'midnight' ? '1:47 AM' : '9:14 AM'}
            </span>
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-2.5 rounded-sm border relative"
                style={{ borderColor: 'var(--battery-border)' }}
              >
                <div
                  className="absolute inset-0.5 rounded-xs"
                  style={{ width: '40%', background: 'var(--battery-fill)' }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 px-5 py-3 border-b border-subtle">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium"
              style={{ background: theme.gradient, color: '#fff' }}
            >
              {messages[0]?.sender?.[0] || 'A'}
            </div>
            <div>
              <p className="text-sm font-medium text-primary">
                {messages[0]?.sender || 'Unknown'}
              </p>
              <p className="text-xs text-muted">iMessage</p>
            </div>
          </div>

          <div className="px-4 py-5 min-h-[180px] flex flex-col justify-end gap-2">
            <AnimatePresence>
              {messages.slice(0, visibleMessages).map((msg, i) => (
                <motion.div
                  key={i}
                  className="flex"
                  style={{ justifyContent: msg.isUser ? 'flex-end' : 'flex-start' }}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.25 }}
                >
                  <div
                    className="px-4 py-2.5 rounded-2xl max-w-[80%] text-sm"
                    style={{
                      background: msg.isUser ? theme.gradient : 'var(--chat-bubble)',
                      color: msg.isUser ? '#fff' : 'var(--bubble-text)',
                      borderBottomLeftRadius: msg.isUser ? '16px' : '4px',
                      borderBottomRightRadius: msg.isUser ? '4px' : '16px',
                    }}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <AnimatePresence>
              {typing && visibleMessages < messages.length && (
                <motion.div
                  className="flex items-center gap-1 px-4 py-3 rounded-2xl w-16"
                  style={{ background: 'var(--chat-bubble)', borderBottomLeftRadius: '4px' }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: 'var(--text-muted)' }}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="px-4 pb-5 pt-2">
            <div
              className="flex items-center rounded-full px-4 py-2.5"
              style={{
                background: 'var(--input-bg)',
                border: '1px solid var(--input-border)',
              }}
            >
              <span className="text-sm text-muted">iMessage</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
