import React from 'react'
import Svg from './Svg'
import { Link } from '@remix-run/react'
import type { RemixLinkProps } from '@remix-run/react/dist/components'
import cn from 'classnames'

type RoundCtaProps = (
    | ({ element?: 'button'; } & React.ComponentPropsWithRef<'button'>)
    | ({ element: 'link'; } & RemixLinkProps)
) & { icon: string, iconClass?: string }

export default React.forwardRef(function RoundCta({ icon, className = '', iconClass = '', ...props }: RoundCtaProps, ref: React.ForwardedRef<HTMLButtonElement>) {
    const disabled = props.element === 'link' ? props['aria-disabled'] : props.disabled || props['aria-disabled']
    const classNames = cn(`flex items-center justify-center border min-w-[32px] min-h-[32px] rounded-full ${className}`, {
        'bg-slate-100 border-slate-400 text-slate-400 cursor-not-allowed': disabled
    })
    if (props.element === 'link') {
        return <Link  {...props} className={classNames}>
            <Svg src={icon} className={iconClass} />
        </Link>
    }
    return (
        <button ref={ref} {...props} className={classNames}>
            <Svg src={icon} className={iconClass} />
        </button>
    )
})
