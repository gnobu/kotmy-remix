import React from 'react'

export default function Select({ children, containerClass, className, label, ...selectProps }: { containerClass?: string, label?: string } & React.ComponentProps<'select'>) {
    return (
        <label className='font-bold'>{label}
            <div className={`border hover:border-primary rounded-lg font-normal overflow-hidden ${containerClass}`}>
                <select className={`bg-transparent focus:outline-none p-3 mr-2 cursor-pointer w-[98%] ${className}`} {...selectProps}>
                    {children}
                </select>
            </div>
        </label>
    )
}
