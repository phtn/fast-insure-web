import { LightningBoltIcon } from "@radix-ui/react-icons"
import { Separator } from "@radix-ui/react-select"
import { ImageIcon, MousePointerSquareDashedIcon, PlusIcon, UploadIcon, XIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useContext, useEffect, type ChangeEvent } from "react"
import { Button } from "../_components/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../_components/dialog"
import { InputField } from "../_components/input"
import { Label } from "../_components/label"
import { ScrollArea, ScrollBar } from "../_components/scroll-area"
import { TabsContent } from "../_components/tabs"
import { AuthContext } from "../context"
import { accountItems, plugins as addOns } from "./data"
import { useFileHandler, useFileUploader } from "./hooks"
import { AccountItem } from "./item"

export const Autos = () => {

  const userCreds = useContext(AuthContext)
  const { files, handleFileChange, handleFileRemove, imageData } = useFileHandler()
  const { fileUploader, downloadURL, readImage, ocrProgress, ocrStatus, tp } = useFileUploader(userCreds?.user?.uid, imageData)

  useEffect(() => {
    tp && console.log(tp)

  }, [tp])

  return (
    <TabsContent
      value="autos"
      className="border-none p-0 outline-none"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-2">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              All Autos
            </h2>

            <AddAuto
              fileChange={handleFileChange}
              readImage={readImage}
              imageData={imageData}
              fileUploader={fileUploader}
              files={files && [...files]}
              removeFile={handleFileRemove}
              ocrStatus={ocrStatus}
              ocrProgress={ocrProgress}
            />

          </div>
          <p className="text-sm text-muted-foreground">
            All registered vehicles. <Link href={downloadURL ?? '#'}>{downloadURL ? 'Image' : null}</Link>
          </p>
        </div>
      </div>

      <div className="relative">
        <ScrollArea className="w-full">
          <div className="flex space-x-6 pb-4">
            {accountItems.map((item) => (
              <AccountItem
                key={item.title}
                accountItem={item}
                className="w-[300px]"
                width={250}
                height={330}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <div className="mt-6 space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">
          Add-ons
        </h2>
        <p className="text-sm text-muted-foreground">
          Add Coverage Add-ons to your vehicles.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="relative">
        <ScrollArea>
          <div className="flex space-x-6 pb-4">
            {addOns.map((item) => (
              <AccountItem
                key={item.title}
                accountItem={item}
                className="w-[250px]"
                aspectRatio="square"
                width={150}
                height={150}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </TabsContent>
  )
}

type AddAutoProps = {
  files: File[] | null
  fileChange: (e: ChangeEvent<HTMLInputElement>) => void
  removeFile: () => void
  fileUploader: (file: File) => void
  imageData: string | null
  readImage: () => void
  ocrProgress: number
  ocrStatus: string | null
}

const AddAuto = ({ files, fileChange, readImage, removeFile, fileUploader, imageData, ocrStatus, ocrProgress }: AddAutoProps) => {
  const file = files?.[0]
  const handleFileUpload = () => {
    files?.length && fileUploader(files[0]!)
    readImage()
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full h-6 w-6" size='icon'>
          <PlusIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-100 border-blue-950">
        <DialogHeader className="my-4 pb-2 border-b-2 border-gray-200">
          <DialogTitle className="text-blue-100 text-blue-950 md:text-2xl">Add New Vehicle</DialogTitle>
          <DialogDescription className="text-blue-800/90">
            {`Upload your vehicle's Certificate of Registration.`}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8">
          <div className="pt-4">
            <div className="flex items-center space-x-2 mb-2">
              <p className="text-lg font-bold text-blue-900 italic">Express</p>
              <LightningBoltIcon fill='gold' className="h-5 w-5" />
            </div>
            <FileItem imageData={imageData} removeFile={removeFile} ocrProgress={ocrProgress} ocrStatus={ocrStatus} readImage={readImage} name={file?.name ?? ''} size={file?.size ?? 0} type={file?.type ?? ''} />
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="url"></Label>
                <InputField onChange={fileChange} icon={UploadIcon} name="upload" id="url" type="file" placeholder="Certificate of Registration" />
              </div>
            </div>
            <DialogFooter>
              <Button size='lg' disabled={!imageData} onClick={handleFileUpload}>Upload {files && [...files].length > 1 ? `Files` : `File`}</Button>
            </DialogFooter>
          </div>
          <div className="h-full bg-white rounded-lg border border-blue-400 shadow-md col-span-2 p-4">
            <div className=" flex items-center"><p className="text-lg font-bold text-blue-900">Manual</p></div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

type FileItemProps = {
  index?: number;
  name: string;
  size: number;
  type: string;
  onPress?: (index: number) => void;
  imageData: string | null
  removeFile: () => void
  readImage: () => void
  ocrProgress: number
  ocrStatus: string | null
};

const FileItem = (props: FileItemProps) => (
  <div>

    <div className="flex items-center jusfify-end h-4 w-full">
      {props.imageData ? <Button size='icon' variant='ghost' onClick={props.removeFile}><XIcon /></Button> : null}
    </div>

    <div className="flex h-[200px] rounded-lg items-center justify-center w-full bg-blue-100/20 border outline-slate-300 outline-dashed shadow-md shadow-inner">
      {props.imageData ? <Image alt={props.name} src={props.imageData} width={200} height={200} /> : <div className="flex flex-col space-y-4 items-center"><ImageIcon className="text-slate-300 font-medium h-10 w-10" /><div className="text-blue-500 tracking-wide space-x-2 flex items-center"><MousePointerSquareDashedIcon className="h-4 w-4" /><span>Drop image file here.</span></div></div>}
    </div>

    <div className="flex items-center justify-between mt-4 h-20 bg-slate-400 rounded-lg shadow-inner shadow-lg shadow-slate-700/50">
      {props.ocrStatus ? props.ocrProgress !== 1 ? <span className="animate-pulse text-blue-400 font-medium">{props.ocrStatus}</span> : <span className="text-blue-500">{props.ocrStatus}</span> : <span className="text-blue-500">{props.name}</span>}
      <span className="font-bold text-blue-500">{props.ocrProgress ? `${Math.floor(props.ocrProgress * 100)}%` : ''}</span>
    </div>
  </div>
)



