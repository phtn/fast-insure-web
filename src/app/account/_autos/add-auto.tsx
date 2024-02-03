import { fileSize, fileType, limitText } from "@/utils/helpers"
import { InfoCircledIcon } from "@radix-ui/react-icons"
import { FileDigitIcon, MousePointerSquareDashedIcon, PlusIcon, ScanTextIcon, UploadIcon, XIcon } from "lucide-react"
import Image from "next/image"
import { useContext } from "react"
import { Button } from "../../_components/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../_components/dialog"
import { InputFile } from "../../_components/input"
import { AuthContext } from "../../context"
import { useFileHandler, useFileUploader } from "./hooks"


export const AddAuto = () => {

  const userCreds = useContext(AuthContext)
  const { file, handleFileChange, handleFileRemove, imageData } = useFileHandler()
  const { fileUploader, readImage } = useFileUploader(userCreds?.user?.uid, imageData)

  const handleFileUpload = () => {
    file && fileUploader(file)
    readImage()
  }

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
            <InfoCircledIcon className="text-blue-500" strokeWidth={4} />
            <span>
              {`Upload your vehicle's Certificate of Registration to autofill the form.`}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6">


          <div className=" space-y-4">
            <div className="flex items-center space-x-3 px-2">
              <ScanTextIcon className="h-6 w-6 text-clay" strokeWidth={1} />
              <p className="text-lg font-medium tracking-tighter text-coal">Upload & Scan</p>
            </div>

            <div className="space-y-4">
              {imageData
                ? <div className="flex h-[200px] rounded-lg items-center justify-center overflow-scroll overflow-clip w-full bg-gradient-to-r from-gray-800/80 to-gray-800/60 border shadow-md shadow-inner">
                  <Image alt={file?.name ?? ''} className="hover:scale-[250%] transition-all duration-500 ease-in-out" src={imageData} width={200} height={200} />
                </div>
                : <div>
                  <InputFile id='file-explorer' onChange={(e) => {
                    handleFileChange(e.target.files)
                  }} icon={MousePointerSquareDashedIcon} name="upload" type="file" placeholder="Certificate of Registration" />
                </div>
              }


              <div className="flex items-center justify-between h-14 bg-white border border-ash/80 rounded-lg px-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 flex items-center justify-center">
                    <FileDigitIcon className="text-blue-500" strokeWidth={1} />
                  </div>
                  <div className="space-y-[1px] overflow-clip">
                    <div className="w-full ">
                      <span className="font-mono text-fast font-medium text-sm">{limitText(file?.name)}</span>
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


            <DialogFooter>
              <Button variant='outline' size='lg' disabled={!imageData} onClick={handleFileUpload} className="space-x-4"><UploadIcon className="h-4 w-4" /><span>Upload file</span></Button>
            </DialogFooter>
          </div>
          <div className="h-full bg-white rounded-lg shadow-sm border-[0.33px] border-ash/50 col-span-2 p-4">
            <div className=" flex items-center"><p className="text-lg font-bold text-blue-900">Manual</p></div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
