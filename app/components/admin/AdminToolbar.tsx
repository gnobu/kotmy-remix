import { adminAvatar } from '~/assets/images'
import Svg from '../reusables/Svg'
import { icons } from '~/assets/icons'
import { Link } from '@remix-run/react'
import Toggletip from '../reusables/ToggleTip'

export default function AdminToolbar() {
    const mainComponent = (
        <div tabIndex={0}
            className='relative p-2 rounded-full border flex items-center gap-4 cursor-pointer bg-tertiary hover:bg-[#EEF0FF]'>
            <div className='flex gap-3 items-center'>
                <span className="p-2 border border-disabled rounded-full">
                    <img src={adminAvatar} alt="cartoon head" width={24} height={24} />
                </span>
                <span className="grid">
                    <span className='block text-sm font-satoshi-bold'>Admin</span>
                    <span className='block text-xs font-satoshi-medium'>admin@kotmy.com</span>
                </span>
            </div>
            <Svg src={icons.arrowDownIcon} />
        </div>
    )
    return (
        <Toggletip mainComponent={mainComponent}
            childContainerClass="top-[110%] right-0 bg-tertiary p-2 border  text-xs whitespace-nowrap">
            <Link to={'.'} className='p-2 flex items-center gap-2 hover:bg-[#EEF0FF] rounded-lg font-satoshi-medium'>
                <Svg src={icons.profileIcon} /> Profile
            </Link>
            <Link to={'/logout'} className='p-2 flex items-center gap-2 hover:bg-[#EEF0FF] rounded-lg font-satoshi-medium'>
                <Svg src={icons.signoutIcon} /> Sign Out
            </Link>
        </Toggletip>
    )
}