import { adminAvatar } from '~/assets/images'
import Svg from '../reusables/Svg'
import { icons } from '~/assets/icons'
import { Link, useNavigate } from '@remix-run/react'
import Toggletip from '../reusables/ToggleTip'
import { useEffect, useState } from 'react'
import { useUserManager } from '~/lib/store/store_managers/tokenManager'
import { UserAtom } from '~/lib/store/atoms/token'

export default function UserToolbar() {

    const [user, setUser] = useState<UserAtom | null>(null);
    const { getUserStoreManager } = useUserManager();
    const navigate = useNavigate();
    useEffect(() => {
            const currentUser = getUserStoreManager();
            if(!currentUser) navigate('/login');
            setUser(currentUser);
    
        }, [])
        
    const mainComponent = (
        <div tabIndex={0}
            className='relative p-2 rounded-full border flex items-center gap-4 cursor-pointer bg-tertiary hover:bg-[#EEF0FF]'>
            <div className='flex gap-3 items-center'>
                <span className="p-2 border border-disabled rounded-full">
                    <img src={adminAvatar} alt="cartoon head" width={24} height={24} />
                </span>
                <span className="grid">
                    <span className='block text-sm font-satoshi-bold'>{user?.fullName}</span>
                    <span className='block text-xs font-satoshi-medium'>{user?.email}</span>
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