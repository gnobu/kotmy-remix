import React from 'react'
import { Link } from '@remix-run/react'
import { RemixLinkProps } from '@remix-run/react/dist/components'
import cn from 'classnames'

type CtaProps = (
    | ({ element: 'button'; } & React.ButtonHTMLAttributes<HTMLButtonElement>)
    | ({ element: 'link'; } & RemixLinkProps)
) & {
    variant?: 'solid' | 'outline' | 'ghost';
    kind?: 'primary' | 'danger';
}

export default function Cta({ variant = 'solid', kind = 'primary', ...props }: CtaProps) {
    if (props.element === 'button') {
        return <button {...props} className={cn(`border whitespace-nowrap text-center ${props.className}`, {
            'border-disabled text-inherit': props.disabled,
            'bg-accent border-accent text-secondary': variant === 'solid',
            'bg-gray-300 border-disabled': variant === 'solid' && props.disabled,
            'text-accent border-accent border-2': variant === 'outline',
            'border-red-400 text-red-400': kind === 'danger' && !props.disabled,
        })}>{props.children}</button>
    }
    return <Link {...props} className={cn(`border whitespace-nowrap text-center ${props.className}`, {
        'bg-accent border-accent text-secondary': variant === 'solid',
        'text-accent border-accent border-2': variant === 'outline',
        'border-red-400': kind === 'danger',
        'text-red-400': kind === 'danger',
    })}>{props.children}</Link>
}
