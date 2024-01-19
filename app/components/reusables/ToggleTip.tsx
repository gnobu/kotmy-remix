import { ElementRef, useEffect, useRef, useState } from 'react'

type ToggletipProps = {
    mainComponent: React.ReactNode,
    mainContainerClass?: string,
    children: React.ReactNode,
    childContainerClass?: string
}

export default function Toggletip({ mainComponent, children, mainContainerClass = '', childContainerClass = '' }: ToggletipProps) {
    const [open, setOpen] = useState(false)
    const toggletip = useRef<ElementRef<'div'>>(null)
    function handleOutsideClick(e: MouseEvent) {
        if (e.target !== toggletip.current && !toggletip.current?.contains(e.target as HTMLElement)) {
            setOpen(false)
        }
    }
    useEffect(() => {
        document.addEventListener('click', handleOutsideClick)
        return () => (document.removeEventListener('click', handleOutsideClick))
    }, [])
    return (
        <div ref={toggletip} onClick={() => { setOpen(prev => !prev) }}
            className={`relative cursor-pointer ${mainContainerClass}`}>
            {mainComponent}
            <div className={`absolute min-w-full rounded-2xl z-10 ${open ? '' : 'hidden'} ${childContainerClass}`}>
                {children}
            </div>
        </div>
    )
}
