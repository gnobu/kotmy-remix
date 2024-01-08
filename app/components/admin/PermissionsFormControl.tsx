import React, { ElementRef, useRef, useState } from 'react'
import cn from 'classnames'
import Svg from '../reusables/Svg'
import { icons } from '~/assets/icons'
import Cta from '../reusables/Cta'
import FormControl from '../reusables/FormControl'

export default function PermissionsFormControl({ permissions, ...props }: { permissions: string[] } & React.ComponentProps<'fieldset'>) {
    const [open, setOpen] = useState(false)
    const fieldset = useRef<ElementRef<'fieldset'>>(null)
    function resetFieldset(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.currentTarget.form?.permission.forEach((item: HTMLInputElement) => {
            item.checked = item.defaultChecked
        })
    }
    function labelize(persission: string) {
        return persission.split('_').join(' ')
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
                {permissions.map(permission => (
                    <FormControl key={permission} as='input' type='checkbox' name='permission' value={permission} className='w-min'
                        labelText={labelize(permission)} labelClassNames='flex capitalize whitespace-nowrap items-center justify-between px-4'
                    />
                ))}
            </div>
        </fieldset>
    )
}
