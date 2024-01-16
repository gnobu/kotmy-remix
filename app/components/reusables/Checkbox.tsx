import React from 'react'

type CheckboxProps = React.ComponentProps<'input'>
    & { onCheckedChange?: (value: boolean) => void }

export default function Checkbox({ className, checked = false, onCheckedChange = () => { }, ...props }: CheckboxProps) {
    return (
        <input type='checkbox' checked={checked} className={`cursor-pointer ${className}`}
            onChange={() => onCheckedChange(checked)} {...props} />
    )
}
