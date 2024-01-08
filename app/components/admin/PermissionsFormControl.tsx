import React, { ElementRef, useRef, useState } from 'react'
import cn from 'classnames'
import Svg from '../reusables/Svg'
import { icons } from '~/assets/icons'
import Cta from '../reusables/Cta'
import FormControl from '../reusables/FormControl'

export default function PermissionsFormControl(props: React.ComponentProps<'fieldset'>) {
    const [open, setOpen] = useState(false)
    const fieldset = useRef<ElementRef<'fieldset'>>(null)
    function resetFieldset(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.currentTarget.form?.permission.forEach((item: HTMLInputElement) => {
            item.checked = item.defaultChecked
        })
    }
    return (
        <fieldset ref={fieldset} {...props} className='p-4 rounded-lg bg-transparent border border-primary col-span-2'>
            <div className="flex justify-between">
                <span className='flex gap-2 items-center font-bold cursor-pointer grow' onClick={() => setOpen(prev => !prev)}>
                    <Svg src={icons.arrowDownIcon} className={open ? '' : '-rotate-90'} />
                    Permissions
                </span>
                <Cta element='button' type='button' variant='outline' kind='danger'
                    className='px-8 py-2 rounded-lg font-medium'
                    onClick={resetFieldset}
                >Restore defaults</Cta>
            </div>
            <div className={cn("grid grid-cols-3 gap-6 my-6 mx-3", { 'hidden': !open })}>
                <FormControl as='input' type='checkbox' name='permission' value={'manage_users'} labelText='Manage Users' labelClassNames='flex whitespace-nowrap items-center justify-between px-4' className='w-min' />
                <FormControl as='input' type='checkbox' name='permission' value={'edit_content'} labelText='Edit Content' labelClassNames='flex whitespace-nowrap items-center justify-between px-4' className='w-min' />
                <FormControl as='input' type='checkbox' name='permission' value={'edit_blog'} labelText='Edit Blog' labelClassNames='flex whitespace-nowrap items-center justify-between px-4' className='w-min' defaultChecked />
            </div>
        </fieldset>
    )
}
