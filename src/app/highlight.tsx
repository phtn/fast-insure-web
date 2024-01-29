'use client'

import { BadgeCheckIcon, ShieldCheckIcon, SirenIcon } from "lucide-react"
import { type BannerItem, Tet } from "./_components/banner"
import { Grid } from "./_components/grid"

const data: BannerItem[] = [
  { id: 0, title: "Secure Payments", description: 'Credit/Debit Cards & E-wallets.', icon: ShieldCheckIcon },
  { id: 1, title: "24/7 Support", description: 'Anytime, Anywhere Service Coverage.', icon: SirenIcon },
  { id: 2, title: "Best Rates", description: 'Selected from trusted providers.', icon: BadgeCheckIcon },
]

export const Highlight = () => {
  return (
    <Grid>
      <Tet data={data} />
    </Grid>
  )
}
