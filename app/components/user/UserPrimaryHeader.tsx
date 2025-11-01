import { Link } from '@remix-run/react'
import FormControl from '../reusables/FormControl'
import Svg from '../reusables/Svg'
import { icons } from '~/assets/icons'
import UserToolbar from './UserToolBar'

export default function UserPrimaryHeader({ toggleNav }: { toggleNav: () => void }) {
    return (
        <header className='h-[85px] hidden sm:flex justify-between items-center gap-4 px-6 py-3 bg-secondary border-b'>
            <div className="flex gap-6">
                <button
                    onClick={toggleNav}
                    title='Toggle Menu'
                    className="flex items-center justify-center rounded p-2 px-1 hover:outline outline-primary"
                >
                    <Svg src={icons.adminHamburgerIcon} width={40} height={24} />
                </button>
                <Link to={'/'} className='text-accent flex items-center gap-6 whitespace-nowrap font-satoshi-black'>
                    <Svg src={icons.logoIcon} width={37} height={36} />
                    KOTMY-USER
                </Link>
            </div>
            <FormControl as='input' type='search' className='min-w-[280px] bg-white' placeholder='Search...' />
            <UserToolbar />
        </header>
    )
}
