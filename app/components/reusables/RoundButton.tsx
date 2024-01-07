import React from 'react'
import Svg from './Svg'

export default function RoundButton({ icon, className = '' }: { icon: string } & React.ComponentProps<'button'>) {
    return (
        <button className={`flex items-center justify-center border p-2 w-9 h-9 rounded-full ${className}`}>
            <Svg src={icon} />
        </button>
    )
}
