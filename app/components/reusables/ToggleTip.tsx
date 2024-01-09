import { useState } from 'react'

type ToggletipProps = {
    mainComponent: React.ReactNode,
    mainContainerClass?: string,
    children: React.ReactNode,
    childContainerClass?: string
}

export default function Toggletip({ mainComponent, children, mainContainerClass = '', childContainerClass = '' }: ToggletipProps) {
    const [open, setOpen] = useState(false)
    return (
        <div onClick={() => { setOpen(prev => !prev) }}
            className={`relative cursor-pointer ${mainContainerClass}`}>
            {mainComponent}
            {open
                ? <div className={`absolute min-w-full rounded-2xl ${childContainerClass}`}>
                    {children}
                </div>
                : null
            }
        </div>
    )
}
