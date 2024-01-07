import { adminAvatar } from '~/assets/images'
import Svg from '../reusables/Svg'
import { icons } from '~/assets/icons'
import { Link } from '@remix-run/react'
import { useState } from 'react'

export default function AdminToolbar() {
    const [open, setOpen] = useState(false)
    return (
        <div onClick={() => { setOpen(prev => !prev) }} tabIndex={0}
            className='relative p-2 rounded-full border border-primary flex items-center gap-4 cursor-pointer hover:bg-[#EEF0FF]'>
            <div className='flex gap-3 items-center'>
                <img src={adminAvatar} alt="cartoon head" width={40} height={40} />
                <span className="grid">
                    <span className='block text-sm font-satoshi-bold'>Admin</span>
                    <span className='block text-xs font-satoshi-medium'>admin@kotmy.com</span>
                </span>
            </div>
            <Svg src={icons.arrowDownIcon} />
            {open
                ? <ul className='absolute top-[105%] left-0 bg-tertiary w-full p-2 rounded-2xl border border-primary text-xs'>
                    <li><Link to={'.'} className='p-2 flex items-center gap-2 hover:bg-[#EEF0FF] rounded-lg font-satoshi-medium'>
                        <Svg src={icons.profileIcon} /> Profile
                    </Link></li>
                    <li><Link to={'/logout'} className='p-2 flex items-center gap-2 hover:bg-[#EEF0FF] rounded-lg font-satoshi-medium'>
                        <Svg src={icons.signoutIcon} /> Sign Out
                    </Link></li>
                </ul>
                : null
            }
        </div>
    )
}
