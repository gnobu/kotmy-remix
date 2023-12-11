import React from 'react'
import cn from 'classnames'

export default function Button<El extends keyof JSX.IntrinsicElements>({
    children,
    element,
    className,
    variant = 'solid',
    kind = 'primary',
    ...props
}: {
    element: El;
    variant?: 'solid' | 'outline',
    kind?: 'primary' | 'danger'
} & React.ComponentProps<El>) {
    const Comp = element as string;
    return (
        <Comp {...props} className={cn(`py-4 px-8 text-lg outline outline-accent rounded-md font-black ${className}`, {
            'bg-accent text-secondary': variant === 'solid',
            'text-accent': variant === 'outline',
            'border-red-400': kind === 'danger',
            'text-red-400': kind === 'danger',
        })}>
            {children}
        </Comp>
    )
}
