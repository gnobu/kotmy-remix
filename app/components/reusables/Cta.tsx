import React from 'react'
import cn from 'classnames'

export default function Cta<El extends 'button' | 'a'>({
    children,
    element,
    className,
    variant = 'solid',
    kind = 'primary',
    ...props
}: {
    element: El;
    variant?: 'solid' | 'outline' | 'ghost',
    kind?: 'primary' | 'danger'
} & React.ComponentProps<El>) {
    const Comp = element as string;
    return (
        <Comp {...props} className={cn(`border whitespace-nowrap text-center ${className}`, {
            'bg-accent border-accent text-secondary': variant === 'solid',
            'text-accent border-accent border-2': variant === 'outline',
            'border-red-400': kind === 'danger',
            'text-red-400': kind === 'danger',
        })}>
            {children}
        </Comp>
    )
}
