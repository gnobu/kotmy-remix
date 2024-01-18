import { Link } from '@remix-run/react'
import FormControl from '../reusables/FormControl'
import AdminToolbar from './AdminToolbar'
import Svg from '../reusables/Svg'
import { logo } from '~/assets/images'
import { icons } from '~/assets/icons'

export default function PrimaryHeader({ toggleNav }: { toggleNav: () => void }) {
    return (
        <header className='flex justify-between items-center gap-4 px-6 py-3 bg-secondary border-b'>
            <div className="flex gap-6">
                <button
                    onClick={toggleNav}
                    title='Toggle Menu'
                    className="flex items-center justify-center rounded p-2 px-1 hover:outline outline-primary"
                >
                    <Svg src={icons.adminHamburgerIcon} width={40} height={24} />
                </button>
                <Link to={'/'} className='text-accent flex items-center gap-6 whitespace-nowrap font-satoshi-black'>
                    <img src={logo} alt="KOTMY" className='' />
                    KOTMY-ADMIN
                </Link>
            </div>
            <FormControl as='input' type='search' className='min-w-[280px] bg-white' placeholder='Search...' />
            <AdminToolbar />
        </header>
    )
}
