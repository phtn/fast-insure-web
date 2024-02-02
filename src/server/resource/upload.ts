import { z } from "zod";

export const FileUploadResource = z.object({
  name: z.string(),
  size: z.number(),
  type: z.string(),
  lastModified: z.number(),
  webkitRelativePath: z.string().optional()
})

// const ACCEPTED_IMAGE_TYPES = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp', 'image/mp4', 'application/pdf',]

// const maxFileSize = 10000000


export const LimitFile = z.object({
  file: z.custom<File>()
})

export type FileResourceType = z.infer<typeof LimitFile>
