import { onError, onSuccess } from "@/utils/toast"
import { runOCR } from "./ocr"
import { useState } from "react"
import { createWorker } from "tesseract.js"
import { type OCR_GOOG_Schema } from "@/server/resource/ocr"

export const useOCR = (file_url: string) => {
  runOCR({ file_url }).then((res: { data: OCR_GOOG_Schema } | Error) => {
    onSuccess('Scan complete.')
    console.log(res)
  }).catch((err: Error) => {
    onError(err.name, err.message)
  })
}

export const useImageReader = async () => {


  const [ocrProgress, setOcrProgress] = useState(0)
  const [ocrStatus, setOcrStatus] = useState('')
  const [ocrResult, setOcrResult] = useState('')
  const [tp, setTP] = useState<Tesseract.Line[]>()

  const worker = await createWorker('eng', 1, {
    logger: message => {
      if ('progress' in message) {
        setOcrProgress(message.progress)
        setOcrStatus(message.progress == 1 ? 'Complete.' : 'Reading...')
      }
    }
  })
  const result = await worker.recognize('')
  setOcrResult(result.data.text)
  setTP(result.data.paragraphs[0]?.lines)
  await worker.terminate()

  return { ocrStatus, ocrResult, ocrProgress, tp }
}
