export interface AccountItem {
  title: string
  description: string
  cover: string
}

export const accountItems: AccountItem[] = [
  {
    title: "React Rendezvous",
    description: "Ethan Byte",
    cover: "/images/spyder.webp",
  },
  {
    title: "Async Awakenings",
    description: "Nina Netcode",
    cover: "/images/spyder.webp",
  },
  {
    title: "The Art of Reusability",
    description: "Lena Logic",
    cover: "/images/spyder.webp",
  },
  {
    title: "Stateful Symphony",
    description: "Beth Binary",
    cover: "/images/spyder.webp",
  },
]

export const plugins: AccountItem[] = [
  {
    title: "Thinking Components",
    description: "Lena Logic",
    cover: "/images/spyder.webp",
  },
  {
    title: "Functional Fury",
    description: "Beth Binary",
    cover: "/images/spyder.webp",
  },
  {
    title: "React Rendezvous",
    description: "Ethan Byte",
    cover: "/images/spyder.webp",
  },
  {
    title: "Stateful Symphony",
    description: "Beth Binary",
    cover: "/images/spyder.webp",
  },
  {
    title: "Async Awakenings",
    description: "Nina Netcode",
    cover: "/images/spyder.webp",
  },
  {
    title: "The Art of Reusability",
    description: "Lena Logic",
    cover: "/images/spyder.webp",
  },
]

export type Playlist = (typeof playlists)[number]

export const playlists = [
  "Recently Added",
  "Recently Played",
  "Top Songs",
  "Top Albums",
  "Top descriptions",
  "Logic Discography",
  "Bedtime Beats",
  "Feeling Happy",
  "I miss Y2K Pop",
  "Runtober",
  "Mellow Days",
  "Eminem Essentials",
]
