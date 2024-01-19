import React, { ElementRef, useRef, useState } from 'react'
import cn from 'classnames'
import Svg from '../reusables/Svg'
import { icons } from '~/assets/icons'
import Cta from '../reusables/Cta'
import FormControl from '../reusables/FormControl'
import { CounterClockwiseClockIcon as Restore } from '@radix-ui/react-icons'

export default function PermissionsFormControl({ permissions, defaultPermissions, ...props }: { permissions: string[], defaultPermissions?: string[] } & React.ComponentProps<'fieldset'>) {
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
        <fieldset ref={fieldset} {...props} className='p-2 sm:p-4 rounded-lg bg-transparent border hover:border-primary sm:col-span-2'>
            <div data-open={open} className="flex justify-between data-[open=true]:pb-2 sm:data-[open=true]:pb-3 data-[open=true]:border-b">
                <span className='flex gap-2 items-center font-bold cursor-pointer grow' onClick={() => setOpen(prev => !prev)}>
                    <Svg src={icons.arrowDownIcon} className={open ? '' : '-rotate-90'} />
                    Permissions
                </span>
                <Cta element='button' type='button' variant='outline' aria-label='restore defaults'
                    className='p-2 sm:px-8 sm:py-2 rounded-lg font-medium text-red-500 border-secondary active:border-red-300 sm:hover:border-red-300'
                    onClick={resetFieldset}
                >
                    <Restore className='text-inherit sm:hidden' />
                    <span className="hidden sm:inline">Restore defaults</span>
                </Cta>
            </div>
            <div className={cn("grid sm:grid-cols-3 gap-6 mt-4 sm:mx-3", { 'hidden': !open })}>
                {permissions.map(permission => (
                    <FormControl key={permission} as='input' type='checkbox' name='permission' value={permission} className='w-min'
                        defaultChecked={defaultPermissions?.includes(permission)} labelText={labelize(permission)}
                        labelClassNames='flex capitalize whitespace-nowrap items-center justify-between px-4'
                    />
                ))}
            </div>
        </fieldset>
    )
}
