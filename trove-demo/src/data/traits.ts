export interface TraitInfo {
  title: string
  description: string
  color: string
}

export const traits: Record<string, TraitInfo> = {
  loyalty: { title: "The Anchor", description: "You show up. No hesitation, no calculation — when someone you care about is drowning, you're already in the water.", color: "#3b82f6" },
  empathy: { title: "The Listener", description: "You create space before you fill it. Your first instinct isn't to fix — it's to understand.", color: "#8b5cf6" },
  boundaries: { title: "The Realist", description: "You know that caring for yourself isn't selfish — it's the foundation for caring well.", color: "#06b6d4" },
  discernment: { title: "The Navigator", description: "You read between the lines before you act. Safety first, then depth.", color: "#10b981" },
  ambition: { title: "The Networker", description: "You play the room with intention. Opportunity isn't accidental for you.", color: "#f59e0b" },
  compassion: { title: "The Includer", description: "You see the person everyone else overlooks. That's rare. That's powerful.", color: "#ec4899" },
  observation: { title: "The Reader", description: "You gather data before you commit. Patient eyes, strategic mind.", color: "#6366f1" },
  independence: { title: "The Sovereign", description: "You're comfortable in your own orbit. You don't need the crowd to feel alive.", color: "#78716c" },
  courage: { title: "The Claimant", description: "You don't shrink. When something is yours, you name it.", color: "#ef4444" },
  humility: { title: "The Stoic", description: "You let the work do the talking. Recognition is nice, but it's not why you're here.", color: "#a78bfa" },
  diplomacy: { title: "The Strategist", description: "You fight the right battles in the right rooms. Smart, not silent.", color: "#14b8a6" },
  "self-doubt": { title: "The Questioner", description: "You second-guess yourself — but that means you're listening to all sides, even the uncomfortable ones.", color: "#94a3b8" },
  drive: { title: "The Seeker", description: "You follow the pull. Some people wait for life to happen — you go build it.", color: "#f97316" },
  devotion: { title: "The Keeper", description: "You know what matters. And you choose it, even when it costs you.", color: "#e11d48" },
  resourcefulness: { title: "The Architect", description: "Either/or? You see a third door. You always find the hack.", color: "#8b5cf6" },
  patience: { title: "The Weaver", description: "You hold complexity without rushing to resolve it. That takes more strength than people realize.", color: "#059669" },
  maturity: { title: "The Grounded", description: "You can be stung without being poisoned. You take the hit, learn, move forward.", color: "#7c3aed" },
  resilience: { title: "The Unshaken", description: "You know your worth isn't up for debate in a comment section.", color: "#eab308" },
  introspection: { title: "The Deep Water", description: "You sit with things. You let them reshape you. That's not weakness — that's evolution.", color: "#6366f1" },
  "self-preservation": { title: "The Guarded", description: "You protect your peace. Not everyone gets access, and that's by design.", color: "#64748b" },
}
