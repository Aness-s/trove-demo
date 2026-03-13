import type { GameAnswer } from '../App'

export interface Archetype {
  name: string
  traits: string[]
  description: string
  emoji: string
}

export const archetypes: Archetype[] = [
  {
    name: "The Still Flame",
    traits: ["empathy", "introspection", "patience", "humility", "compassion"],
    description: "You burn steady, not bright. People come to you because you make them feel seen without performing it. Your power is quiet, but it fills every room.",
    emoji: "🕯",
  },
  {
    name: "The Lightning Rod",
    traits: ["courage", "drive", "ambition", "resilience", "resourcefulness"],
    description: "You move through the world like a current. Bold, unafraid, forward. Where others hesitate, you've already started. People either follow you or get out of the way.",
    emoji: "⚡",
  },
  {
    name: "The Weaver",
    traits: ["diplomacy", "resourcefulness", "observation", "patience", "discernment"],
    description: "You see the threads others miss. Where people see problems, you see patterns. You don't force — you connect, rearrange, architect.",
    emoji: "🕸",
  },
  {
    name: "The Harbor",
    traits: ["loyalty", "devotion", "compassion", "boundaries", "self-preservation"],
    description: "You are the safe place. Not because you're soft — because you're strong enough to hold space for others without losing yourself.",
    emoji: "🏔",
  },
]

export function getArchetype(answers: GameAnswer[]): Archetype {
  const answerTraits = answers.map(a => a.trait)
  let best = archetypes[0]
  let bestScore = 0

  for (const arch of archetypes) {
    const score = answerTraits.filter(t => arch.traits.includes(t)).length
    if (score > bestScore) {
      bestScore = score
      best = arch
    }
  }
  return best
}
