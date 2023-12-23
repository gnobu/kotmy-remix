import React from 'react'

export default function Select({ children, ...selectProps }: React.ComponentProps<'select'>) {
    return (
        <div className='bg-secondary border border-primary rounded-lg'>
            <select className="bg-transparent focus:outline-none p-3 mr-2 cursor-pointer" {...selectProps}>
                {children}
            </select>
        </div>
    )
}
