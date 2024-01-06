import { NavLink, useLocation } from '@remix-run/react'
import { icons } from '~/assets/icons'
import Svg from '../reusables/Svg'
import Select from '../reusables/Select'

const navs = [
    { label: 'Home', icon: icons.adminHomeIcon, url: '/admin/overview' },
    { label: 'Admin Accounts', icon: icons.adminUsersIcon, url: '/admin/accounts' },
    { label: 'Contests', icon: icons.adminContestIcon, url: '/admin/contests' },
    { label: 'Tournaments', icon: icons.adminTournamentIcon, url: '/admin/tournaments' },
    { label: 'Finances', icon: icons.adminFinanceIcon, url: '/admin/finances' },
]

export default function AdminNavigation({ show }: { show: boolean }) {
    const { pathname } = useLocation()
    return (show
        ? <header className='bg-secondary border-r border-primary flex flex-col justify-between min-w-[280px]'>
            <nav className='py-6'>
                <span className='inline-block mb-2 px-6 py-3 font-satoshi-bold'>Navigation Menu</span>
                <ul className='grid gap-2 text-xl font-bold'>
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
                <Select>
                    <option value="default">System default</option>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </Select>
            </aside>
        </header >
        : null
    )
}
