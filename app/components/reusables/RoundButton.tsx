import React from 'react'
import Svg from './Svg'

export default function RoundButton({ icon, className = '', ...props }: { icon: string } & React.ComponentProps<'button'>) {
    return (
        <button {...props} className={`flex items-center justify-center border p-2 w-9 h-9 rounded-full ${className}`}>
            <Svg src={icon} />
        </button>
    )
}
