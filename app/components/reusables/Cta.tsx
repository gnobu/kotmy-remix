import React from 'react'
import { Link } from '@remix-run/react'
import { RemixLinkProps } from '@remix-run/react/dist/components'
import cn from 'classnames'

export type CtaProps = (
    | ({ element: 'button'; } & React.ComponentPropsWithRef<'button'>)
    | ({ element: 'link'; } & RemixLinkProps)
) & {
    variant?: 'solid' | 'outline' | 'ghost';
    kind?: 'primary' | 'danger';
}

export default React.forwardRef(function Cta({ variant = 'solid', kind = 'primary', ...props }: CtaProps, ref: React.ForwardedRef<HTMLButtonElement>) {
    if (props.element === 'button') {
        return <button ref={ref} {...props} className={cn(`border whitespace-nowrap text-center`, {
            'border-disabled text-inherit': props.disabled,
            'bg-accent border-accent hover:bg-accent/90 text-secondary': variant === 'solid',
            'bg-red-600 border-red-600 hover:bg-red-400 text-secondary': variant === 'solid' && kind === 'danger',
            'bg-gray-300 border-disabled': variant === 'solid' && props.disabled,
            'text-accent border-accent border-2': variant === 'outline',
            'border-red-400 text-red-400': kind === 'danger' && !props.disabled,
            'border-none': variant === 'ghost'
        }, props.className)}>{props.children}</button>
    }
    return <Link {...props} className={cn(`border whitespace-nowrap text-center`, {
        'bg-accent border-accent hover:bg-accent/90 text-secondary': variant === 'solid',
        'text-accent border-accent border-2': variant === 'outline',
        'border-red-400': kind === 'danger',
        'text-red-400': kind === 'danger',
    }, props.className)}>{props.children}</Link>
})
