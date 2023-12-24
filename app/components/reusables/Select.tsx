import React from 'react'

export default function Select({ children, containerClass, ...selectProps }: { containerClass?: string } & React.ComponentProps<'select'>) {
    return (
        <div className={`border border-primary rounded-lg ${containerClass}`}>
            <select className="bg-transparent focus:outline-none p-3 mr-2 cursor-pointer w-[98%]" {...selectProps}>
                {children}
            </select>
        </div>
    )
}
