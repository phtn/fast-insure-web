import { tRPC } from "@/trpc/rsc";

export const uploadSingleFile = async (file: File) => {
  return await tRPC.uploadFile.query({ file })
}
