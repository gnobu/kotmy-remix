import { useEffect, useRef, useState } from "react"

export default function useFilePreview(fileList: FileList | null) {
    const [filePreview, setFilePreview] = useState<string | null>(null)
    const fileName = useRef('')
    useEffect(() => {
        if (fileList && fileList[0]) {
            fileName.current = fileList[0].name
            const newUrl = URL.createObjectURL(fileList[0])
            if (newUrl !== filePreview) setFilePreview(newUrl)
        }
    }, [fileList])
    function clearFilePreview() {
        setFilePreview(null)
        fileName.current = ''
    }
    return { filePreview, clearFilePreview, fileName: fileName.current }
}