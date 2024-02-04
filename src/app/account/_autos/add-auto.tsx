import { fileSize, fileType, limitText } from "@/utils/helpers"
import { FileDigitIcon, InfoIcon, MousePointerSquareDashedIcon, PlusIcon, ScanTextIcon, UploadIcon, XIcon } from "lucide-react"
import Image from "next/image"
import { useCallback, useContext } from "react"
import { Button } from "@@components/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@@components/dialog"
import { InputFile } from "@@components/input"
import { AuthContext } from "../../context"
import { useFileHandler, useFileUploader } from "./hooks"


export const AddAuto = () => {

  const userCreds = useContext(AuthContext)
  const { file, handleFileChange, handleFileRemove, imageData } = useFileHandler()
  const { fileUploader, uploadProgress, scanResult, loading, status } = useFileUploader(userCreds?.user?.uid)

  const handleFileUpload = useCallback(() => {
    if (file) {
      fileUploader(file).then(() => console.log('Upload complete.')).catch((err: Error) => err)
    }
  }, [file, fileUploader])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full h-6 w-6" size='icon'>
          <PlusIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="">

        <DialogHeader className="my-3 pb-2 border-b-2 border-ash">
          <DialogTitle className="text-fast md:text-2xl">Add New Vehicle</DialogTitle>
          <DialogDescription className="text-clay flex items-center space-x-1">
            <InfoIcon className="text-blue-400 h-4 w-4" strokeWidth={3} />
            <span>
              {`Upload your vehicle's Certificate of Registration to autofill the form.`}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 md:gap-x-6">


          <div className="space-y-4">
            <div className="flex items-center space-x-3 px-2">
              <ScanTextIcon className="h-6 w-6 text-clay" strokeWidth={1} />
              <p className="text-lg font-medium tracking-tighter text-coal">Upload & Scan</p>
            </div>

            <div className="space-y-4">
              {imageData
                ? <div className="flex h-[318px] rounded-lg items-center justify-center overflow-scroll overflow-clip w-full bg-gradient-to-r from-gray-800/80 to-gray-800/60 border shadow-md shadow-inner">
                  <Image alt={file?.name ?? ''} className="hover:scale-[250%] transition-all duration-500 ease-in-out" src={imageData} width={200} height={200} />
                </div>
                : <div>
                  <InputFile id='file-explorer' onChange={(e) => {
                    handleFileChange(e.target.files)
                  }} icon={MousePointerSquareDashedIcon} name="upload" type="file" placeholder="Certificate of Registration" />
                </div>
              }


              <div className="flex items-center justify-between h-14 bg-white border border-blue-400 rounded-lg px-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 flex items-center justify-center">
                    <FileDigitIcon className="text-blue-500" strokeWidth={1} />
                  </div>
                  <div className="space-y-[1px] overflow-clip">
                    <div className="w-full ">
                      <span className="font-mono text-fast font-medium text-sm">{limitText(file?.name, 25)}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="font-mono font-thin text-clay text-[12px] tracking-tight uppercase">{fileType(file?.type)}</span>
                      <span className="font-mono font-thin text-clay text-[12px]">{fileSize(file?.size)}</span>
                    </div>
                  </div>

                </div>
                <div>
                  <Button variant='casper' size='icon' className="hover:bg-paper" onClick={handleFileRemove}><XIcon className="text-clay" strokeWidth={1} /></Button>

                </div>
              </div>

            </div>


            <DialogFooter className="flex items-center">
              <div className="w-full flex flex-col items-center justify-center rounded-lg h-[50px] border border-ash bg-void">
                <p className="font-mono text-green-500 text-[17px] leading-none">{uploadProgress}<span className="text-[10px] text-ash/80 ml-[2px]">%</span></p>
                <span className="uppercase text-[11px] text-ash tracking-wide">upload</span>
              </div>
              <div className="w-full flex flex-col items-center justify-center rounded-lg h-[50px] border border-ash bg-void">
                <p className="font-mono text-blue-400 text-[17px] leading-none">{uploadProgress !== 100 ? 0 : scanResult ? `100` : `50`}<span className="text-[10px] text-ash/80 ml-[2px]">%</span></p>
                <span className="uppercase text-[11px] text-ash">scan</span>
              </div>
              <Button variant='outline' size='lg' disabled={!imageData || loading} onClick={handleFileUpload} className="space-x-4">
                <span>{status}</span>
                <UploadIcon className="h-4 w-4" />
              </Button>
            </DialogFooter>
          </div>


          <div className="bg-white rounded-lg h-[500px] overflow-scroll shadow-sm border-[0.33px] border-ash/50 col-span-2 p-4">
            <div className=" flex items-center"><p className="text-lg font-bold text-blue-900">Results:</p></div>
            {scanResult?.base64.fields.map(item => (
              <div key={item.key}>
                <p><span className="text-fast">{item.key}</span>: <span className="text-blue-500 font-mono">{item.value}</span></p>
              </div>
            ))}
            <p></p>
            <div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
