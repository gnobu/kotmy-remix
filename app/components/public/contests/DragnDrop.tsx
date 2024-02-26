import { FileUploader } from "react-drag-drop-files"
import Svg from "../../reusables/Svg"
import { icons } from "~/assets/icons"

const fileTypes = ["JPG", "PNG"]

export default function DragnDrop({ className = '', labelText = 'Upload Images', name = 'images', multiple = true }: { className?: string, labelText?: string, name?: string, multiple?: boolean }) {
    return (
        <div className={`w-full max-w-full overflow-hidden ${className}`}>
            <span className="font-bold">{labelText}</span>
            <FileUploader
                name={name}
                types={fileTypes}
                multiple={multiple}
            >
                <div className="flex flex-col gap-4 items-center p-6 border-2 hover:border-primary border-dashed rounded-lg">
                    <div className="border-2 border-black p-4 rounded-full w-fit">
                        <Svg src={icons.imageIcon} />
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-center">
                            <span className="underline underline-offset-4 font-bold cursor-pointer">Click here to upload</span> <span>or drag and drop</span>
                        </p>
                        <span className="font-bold text-gray-400">JPG, PNG (max. 5mb)</span>
                    </div>
                </div>
            </FileUploader>
        </div>
    )
}