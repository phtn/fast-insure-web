'use server'

import { tRPC } from "@/trpc/rsc"


export const readImage = async (url: string) => {
  return await tRPC.runOCR.query({ url }).then(res => res)
}


