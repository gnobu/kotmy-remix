import React from 'react'

export default function Select({ children, containerClass, label, ...selectProps }: { containerClass?: string, label?: string } & React.ComponentProps<'select'>) {
    return (
        <label className='font-bold'>{label}
            <div className={`border border-primary rounded-lg font-normal ${containerClass}`}>
                <select className="bg-transparent focus:outline-none p-3 mr-2 cursor-pointer w-[98%]" {...selectProps}>
                    {children}
                </select>
            </div>
        </label>
    )
}
