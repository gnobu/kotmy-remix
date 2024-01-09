import { NavLink } from '@remix-run/react'
import { icons } from '~/assets/icons'
import Svg from '../reusables/Svg'
import Toggletip from '../reusables/ToggleTip'

const navs = [
    { label: 'Home', icon: icons.adminHomeIcon, url: '/admin/overview' },
    { label: 'Admin Accounts', icon: icons.adminUsersIcon, url: '/admin/accounts' },
    { label: 'Tournaments', icon: icons.adminTournamentIcon, url: '/admin/tournaments' },
    { label: 'Contests', icon: icons.adminContestIcon, url: '/admin/contests' },
    { label: 'Finances', icon: icons.adminFinanceIcon, url: '/admin/finances' },
]

export default function AdminNavigation({ show }: { show: boolean }) {
    const mainComponent = (
        <div className="flex justify-between items-center border border-primary rounded-lg p-2 text-sm cursor-pointer line-clamp-1 hover:outline outline-1 outline-primary">
            System default
            <Svg src={icons.arrowDownIcon} />
        </div>)
    return (show
        ? <header className='bg-secondary border-r border-primary flex flex-col justify-between min-w-[280px]'>
            <nav className='py-6'>
                <span className='inline-block mb-2 px-6 py-3 font-satoshi-bold'>Navigation Menu</span>
                <ul className='grid gap-2 font-bold'>
                    {navs.map(navItem => (
                        <li key={navItem.label}><NavLink to={navItem.url}
                            className={({ isActive }) => `${isActive ? 'text-accent bg-[#EEF0FF] border-accent' : 'border-transparent'} flex gap-3 items-center px-6 py-3 font-semibold border-l-4 hover:bg-[#EEF0FF]`}
                        >
                            <Svg src={navItem.icon} />{navItem.label}
                        </NavLink></li>
                    ))}
                </ul>
            </nav>
            <aside className='border-t border-primary px-6 py-3'>
                <span className='flex items-center gap-1 mb-2 font-satoshi-bold'>
                    <Svg src={icons.themeIcon} />
                    Theme
                </span>
                <Toggletip mainComponent={mainComponent}
                    childContainerClass="bottom-[110%] left-0 bg-tertiary p-2 border border-primary text-xs whitespace-nowrap">
                    <span className='p-2 flex items-center gap-2 hover:bg-[#EEF0FF] rounded-lg font-satoshi-medium'>System default</span>
                    <span className='p-2 flex items-center gap-2 hover:bg-[#EEF0FF] rounded-lg font-satoshi-medium'>Light</span>
                    <span className='p-2 flex items-center gap-2 hover:bg-[#EEF0FF] rounded-lg font-satoshi-medium'>Dark</span>
                </Toggletip>
            </aside>
        </header >
        : null
    )
}
