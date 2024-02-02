export interface AccountItem {
  title: string
  description: string
  cover: string
}

export const accountItems: AccountItem[] = [
  {
    title: "Black Widow",
    description: "Audi R8",
    cover: "/images/spyder.webp",
  },
]

export const plugins: AccountItem[] = [
  {
    title: "Road-side Assist",
    description: "Get road-side assistance anywhere.",
    cover: "/peaks/peaks_v1.svg",
  },

  {
    title: "Towing Service",
    description: "Towing Service (NCR)",
    cover: "/peaks/peaks_v4.svg",
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
