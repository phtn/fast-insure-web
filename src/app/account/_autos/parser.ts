import { type OCR_GOOG_Schema } from "@/server/resource/ocr";

export const parser = (scanResult: OCR_GOOG_Schema) => {
  const textResult = scanResult.google.text
  const textList = textResult.split(' ')
  const docType = `${textList[8]} ${textList[9]} ${textList[10]}`
  const crNo = `${textList[42]}`
  const mvFileNo = `${textList[12]}`
  const plateNo = `${textList[50]}`
  const engineNo = `${textList[62]}`
  const chassisNo = `${textList[145]}`
  const denomination = `${textList[13]} ${textList[14]}`
  const pistonDisp = `${textList[51]}`
  const cylinders = `${textList[72]}`
  const fuel = `${textList[148]}`

  const crDetails = [docType, crNo, mvFileNo, plateNo, engineNo, chassisNo, denomination, pistonDisp, cylinders, fuel]
  // const make = `${textList[18]} ${textList[19]} ${textList[20]}`
  // const series = `${textList[18]} ${textList[19]} ${textList[20]}`
  // const bodyType = `${textList[18]} ${textList[19]} ${textList[20]}`
  // const bodyNo = `${textList[18]} ${textList[19]} ${textList[20]}`
  // const yearModel = `${textList[18]} ${textList[19]} ${textList[20]}`
  // const grossWt = `${textList[18]} ${textList[19]} ${textList[20]}`
  // const netWt = `${textList[18]} ${textList[19]} ${textList[20]}`
  // const shippingWt = `${textList[18]} ${textList[19]} ${textList[20]}`
  // const netCap = `${textList[18]} ${textList[19]} ${textList[20]}`
  // const ownerName = `${textList[18]} ${textList[19]} ${textList[20]}`
  // const ownerAddress = `${textList[18]} ${textList[19]} ${textList[20]}`
  // const encumbenedTo = `${textList[18]} ${textList[19]} ${textList[20]}`
  // const firstRegDetails = `${textList[18]} ${textList[19]} ${textList[20]}`
  // const orNo = `${textList[18]} ${textList[19]} ${textList[20]}`
  // const odDate = `${textList[18]} ${textList[19]} ${textList[20]}`
  // const amount = `${textList[18]} ${textList[19]} ${textList[20]}`
  // const signatured = `${textList[18]} ${textList[19]} ${textList[20]}`
  return [textList, textList.length, crDetails]
} 
