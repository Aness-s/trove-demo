export interface Scenario {
  setup: string
  context: string
  emoji: string
  choices: { text: string; trait: string; label: string }[]
  chatMessages?: { sender: string; text: string; isUser?: boolean; delay: number }[]
}

export const midnightScenarios: Scenario[] = [
  {
    setup: "The Midnight Text",
    context: "It's 1:47 AM. An old friend you haven't spoken to in two years just sent you this:",
    emoji: "🌙",
    chatMessages: [
      { sender: "Alex", text: "hey", delay: 800 },
      { sender: "Alex", text: "i know it's been a while", delay: 2000 },
      { sender: "Alex", text: "i really messed up and i don't know who else to call", delay: 3500 },
    ],
    choices: [
      { text: "Call them immediately", trait: "loyalty", label: "The Anchor" },
      { text: "Reply: \"I'm here. What happened?\"", trait: "empathy", label: "The Listener" },
      { text: "Wait until morning — you need rest too", trait: "boundaries", label: "The Realist" },
      { text: "Reply: \"Are you safe?\" — then decide", trait: "discernment", label: "The Navigator" },
    ],
  },
  {
    setup: "The Confession",
    context: "Alex tells you they got fired for something they actually did. They lied to their partner about it, spent the savings, and now everything is unraveling. They're crying. They say: \"I know I don't deserve your help.\"",
    emoji: "💔",
    choices: [
      { text: "\"You don't need to deserve it. I'm here.\"", trait: "compassion", label: "The Includer" },
      { text: "\"That's a lot. Let's take this one thing at a time.\"", trait: "patience", label: "The Weaver" },
      { text: "\"I love you, but you need to tell your partner the truth.\"", trait: "courage", label: "The Claimant" },
      { text: "Listen silently — they need a witness, not advice", trait: "introspection", label: "The Deep Water" },
    ],
  },
  {
    setup: "The Ask",
    context: "After an hour of talking, Alex asks if they can stay at your place for a few days. \"Just until I figure things out.\" You have a small apartment. You have work in the morning. But you can hear in their voice — they have nowhere else to go.",
    emoji: "🚪",
    choices: [
      { text: "\"Of course. Come over now.\"", trait: "loyalty", label: "The Anchor" },
      { text: "\"Yes, but let's set some ground rules first.\"", trait: "diplomacy", label: "The Strategist" },
      { text: "\"I can't tonight, but I'll help you find a place tomorrow.\"", trait: "boundaries", label: "The Realist" },
      { text: "\"Let me think about it and text you in the morning.\"", trait: "discernment", label: "The Navigator" },
    ],
  },
  {
    setup: "The Discovery",
    context: "Two days in, you find out Alex wasn't fully honest. They didn't just get fired — they burned a bridge with a mutual friend of yours in the process. That friend texts you: \"I can't believe you're helping them after what they did to me.\"",
    emoji: "🪞",
    choices: [
      { text: "Call your friend and hear their side fully before reacting", trait: "discernment", label: "The Navigator" },
      { text: "Confront Alex directly — \"What else aren't you telling me?\"", trait: "courage", label: "The Claimant" },
      { text: "Tell your friend: \"I hear you, but I can care about both of you.\"", trait: "compassion", label: "The Includer" },
      { text: "Start to quietly pull back — protect yourself", trait: "self-preservation", label: "The Guarded" },
    ],
  },
  {
    setup: "The Morning After",
    context: "Alex has left. Things are calmer now. You're sitting alone with your coffee, replaying the whole week. Your phone buzzes — it's Alex: \"Thank you. I mean it. I'm sorry for everything.\" You stare at the message.",
    emoji: "☕",
    choices: [
      { text: "\"I'm glad you're okay. Let's get lunch soon.\"", trait: "loyalty", label: "The Anchor" },
      { text: "Heart-react the message but don't reply yet", trait: "patience", label: "The Weaver" },
      { text: "\"I care about you, but I need some space after all this.\"", trait: "boundaries", label: "The Realist" },
      { text: "Sit with it — you're still processing how you feel", trait: "introspection", label: "The Deep Water" },
    ],
  },
]

export const goldenScenarios: Scenario[] = [
  {
    setup: "The Interview",
    context: "Final round. You're meeting the founder. She's brilliant — but 20 minutes in, she checks her phone twice, interrupts your answer, and says: \"Sorry, crazy day. Where were we?\" You were mid-sentence about your best work.",
    emoji: "🤝",
    chatMessages: [
      { sender: "Recruiter", text: "She loved the portfolio btw", delay: 800 },
      { sender: "Recruiter", text: "don't read into the phone thing, she does that with everyone", delay: 2200 },
      { sender: "Recruiter", text: "you're the top candidate right now 👀", delay: 3800 },
    ],
    choices: [
      { text: "Restart your point with more energy — win the room back", trait: "resilience", label: "The Unshaken" },
      { text: "Pause and say: \"Want me to come back another time?\"", trait: "courage", label: "The Claimant" },
      { text: "Adapt — shorten your answers, match her pace", trait: "observation", label: "The Reader" },
      { text: "Finish the interview but note this as a yellow flag", trait: "discernment", label: "The Navigator" },
    ],
  },
  {
    setup: "The Overheard",
    context: "Day two. You're grabbing coffee in the kitchen and overhear two teammates around the corner: \"The last person in this role couldn't handle the ambiguity. Helen kept changing direction and they just... shut down.\" They don't know you're there.",
    emoji: "👂",
    choices: [
      { text: "Walk in casually — pretend you heard nothing", trait: "diplomacy", label: "The Strategist" },
      { text: "Walk in and say: \"I like ambiguity. Tell me more.\"", trait: "courage", label: "The Claimant" },
      { text: "File it away — now you know what to watch for", trait: "observation", label: "The Reader" },
      { text: "Feel a knot in your stomach — is this a mistake?", trait: "self-doubt", label: "The Questioner" },
    ],
  },
  {
    setup: "The Brief",
    context: "Your first real project. The brief is one Slack message: \"We need the onboarding flow to feel magical. Think less wizard, more campfire. Ship by Friday.\" It's Wednesday. There are no wireframes, no user research, no design system.",
    emoji: "✨",
    choices: [
      { text: "Love it. Open Figma and start riffing immediately", trait: "drive", label: "The Seeker" },
      { text: "Ask three sharp clarifying questions before touching anything", trait: "discernment", label: "The Navigator" },
      { text: "Ship a rough v1 by tonight — iterate from there", trait: "resourcefulness", label: "The Architect" },
      { text: "Spend Wednesday on research — ship something great Thursday", trait: "patience", label: "The Weaver" },
    ],
  },
  {
    setup: "The Meeting",
    context: "Friday standup. You present your onboarding flow. The founder loves the concept but says: \"What if we made it multiplayer?\" The engineer groans. You spent 20 hours on this. Multiplayer changes everything. She looks at you expectantly.",
    emoji: "🎯",
    choices: [
      { text: "\"I love that. Give me the weekend and I'll have a new direction.\"", trait: "devotion", label: "The Keeper" },
      { text: "\"Here's what multiplayer could look like — and here's what we'd lose.\"", trait: "diplomacy", label: "The Strategist" },
      { text: "\"Let's ship this version first and test multiplayer in v2.\"", trait: "resourcefulness", label: "The Architect" },
      { text: "\"That's a different product. Why multiplayer?\"", trait: "courage", label: "The Claimant" },
    ],
  },
  {
    setup: "The Offer",
    context: "End of your first month. The founder says: \"You're good. Really good.\" That same day, a bigger company messages you on LinkedIn — double the salary, half the chaos. You look around the tiny office. The whiteboard still has your sketches on it.",
    emoji: "💌",
    choices: [
      { text: "Don't even open the LinkedIn message", trait: "loyalty", label: "The Anchor" },
      { text: "Take the call — you owe it to yourself to hear them out", trait: "ambition", label: "The Networker" },
      { text: "Tell the founder about the offer — see how she responds", trait: "courage", label: "The Claimant" },
      { text: "Sit with it quietly — money isn't the only thing that matters", trait: "introspection", label: "The Deep Water" },
    ],
  },
]
