import React from 'react'
import Svg from './Svg'
import { Link } from '@remix-run/react'
import type { RemixLinkProps } from '@remix-run/react/dist/components'

type RoundCtaProps = (
    | ({ element?: 'button'; } & React.ButtonHTMLAttributes<HTMLButtonElement>)
    | ({ element: 'link'; } & RemixLinkProps)
) & { icon: string }

export default function RoundCta({ icon, className = '', ...props }: RoundCtaProps) {
    if (props.element === 'link') {
        return <Link  {...props} className={`flex items-center justify-center border p-2 w-9 h-9 rounded-full ${className}`}>
            <Svg src={icon} />
        </Link>
    }
    return (
        <button {...props} className={`flex items-center justify-center border p-2 w-9 h-9 rounded-full ${className}`}>
            <Svg src={icon} />
        </button>
    )
}
