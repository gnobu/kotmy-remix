// import { useState } from "react"
import { FileUploader } from "react-drag-drop-files"
import Svg from "../reusables/Svg"
import { icons } from "~/assets/icons"

const fileTypes = ["JPG", "PNG"]

export default function DragnDrop() {
    // const [files, setFiles] = useState<Blob[]>([])
    const handleChange = (file: Blob) => {
        console.log(file)
        // setFiles(prev => ([...prev, file]))
    }
    return (
        <div>
            <span className="font-bold">Upload Images</span>
            <FileUploader
                handleChange={handleChange}
                name="images"
                types={fileTypes}
                multiple={true}
            >
                <div className="flex flex-col gap-4 items-center p-6 border-2 border-primary border-dashed rounded-lg">
                    <div className="border-2 border-black p-4 rounded-full w-fit">
                        <Svg src={icons.imageIcon} />
                    </div>
                    <div className="flex flex-col items-center">
                        <p><span className="underline underline-offset-4 font-bold cursor-pointer">Click here to upload</span> <span>or drag and drop</span></p>
                        <span className="font-bold text-gray-400">JPG, PNG (max. 5mb)</span>
                    </div>
                </div>
            </FileUploader>
        </div>
    )
}