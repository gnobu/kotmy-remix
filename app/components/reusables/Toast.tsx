import { Alert, Message, ToastMessage } from "~/lib/types/toast"
import Svg from "./Svg"
import { icons } from "~/assets/icons"
import cn from "classnames"
import { Form, useLocation } from "@remix-run/react"
import { ElementRef, useEffect, useRef } from "react"

const svgIcon: Record<Alert, string> = {
    error: icons.closeIcon,
    success: icons.alertCheckIcon
}
const TIMER = 1500

export default function Toast({ toast }: { toast?: ToastMessage }) {
    const { pathname } = useLocation()
    const closeBtn = useRef<ElementRef<'button'>>(null)
    useEffect(() => {
        const timeout = setTimeout(() => {
            closeBtn.current?.click()
        }, TIMER)
        return () => { clearTimeout(timeout) }
    }, [toast])

    if (!toast) return null
    
    const [type, message] = toast.split('::') as [Alert, Message]
    return (
        <aside className={cn("absolute top-20 right-6 border-2 rounded-lg p-6 flex items-center gap-4", {
            'border-success-700 bg-success-500': type === 'success',
            'border-red-500 bg-red-50': type === 'error',
        })}>
            <Svg src={svgIcon[type]} width={24} height={24} />
            <p className="font-medium">{message}</p>
            <Form method="GET" action={pathname}>
                <button type="submit" title="dismiss" ref={closeBtn}>
                    <Svg src={icons.closeIcon} width={16} height={16} />
                </button>
            </Form>
        </aside>
    )
}
