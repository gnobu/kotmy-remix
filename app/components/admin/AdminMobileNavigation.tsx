import { NavLink, useLocation } from '@remix-run/react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/reusables/Accordion'
import { icons } from '~/assets/icons'
import Svg from '../reusables/Svg'
import Toggletip from '../reusables/ToggleTip'
import { cn } from '~/lib/utils'
import { adminAvatar } from '~/assets/images'
import { useEffect, useRef } from 'react'

const primaryNavs = [
    { label: 'Home', icon: icons.adminHomeIcon, url: '/admin/overview' },
    { label: 'Admin Accounts', icon: icons.adminUsersIcon, url: '/admin/accounts' },
    { label: 'Tournaments', icon: icons.adminTournamentIcon, url: '/admin/tournaments' },
    { label: 'Contests', icon: icons.adminContestIcon, url: '/admin/contests' },
    {
        label: 'Transactions', icon: icons.adminFinanceIcon, subitems: [
            { label: 'Tally Votes', url: 'transactions/tally-votes' },
            { label: 'Contest Registrations', url: 'transactions/contest-registrations' },
            { label: 'Income History', url: 'transactions/income-history' },
        ]
    },
]
const secondaryNavs = [
    { label: 'Profile', icon: icons.profileIcon, url: '.' },
    { label: 'Sign Out', icon: icons.signoutIcon, url: '/logout' },
]

export default function AdminMobileNavigation({ show, onClose }: { show: boolean, onClose: () => void }) {
    const mobileNav = useRef<HTMLDivElement>(null)
    useEffect(() => {
        mobileNav.current?.style.setProperty('--left', `0%`)
    }, [])
    const { pathname } = useLocation()
    function isSublinkActive(url: string) { return new RegExp(url, 'i').test(pathname) }
    const mainComponent = (
        <div className="flex justify-between items-center border rounded-lg p-2 text-sm cursor-pointer line-clamp-1 hover:outline outline-1 outline-primary">
            System default
            <Svg src={icons.arrowDownIcon} />
        </div>)
    return (<div data-show={show} ref={mobileNav}
        className='mobileNav sm:hidden flex flex-col fixed w-full h-dvh top-0 z-10 data-[show=true]:animate-slide-in-left data-[show=false]:left-full data-[show=false]:animate-slide-out-left bg-secondary overflow-y-auto'>
        <div className="flex justify-between items-center py-4 px-6 border-b">
            <span className="font-satoshi-bold">NAVIGATION MENU</span>
            <button
                onClick={onClose}
                title='open Menu'
                className="flex items-center justify-center rounded p-2 px-1 hover:outline outline-primary"
            >
                <Svg src={icons.closeIcon} />
            </button>
        </div>
        <div className="flex flex-col justify-between grow">
            <header>
                <nav aria-label='primary navigation'>
                    <div className='flex gap-3 items-center bg-white px-6 py-2 border-b'>
                        <span className="p-2 border border-disabled rounded-full">
                            <img src={adminAvatar} alt="cartoon head" width={24} height={24} />
                        </span>
                        <span className="grid">
                            <span className='block text-sm font-satoshi-bold'>Admin</span>
                            <span className='block text-xs font-satoshi-medium'>admin@kotmy.com</span>
                        </span>
                    </div>
                    <Accordion type="single" collapsible className='w-full py-2 border-b'>
                        <ul className='grid gap-2 font-bold'>
                            {primaryNavs.map(navItem => (!navItem.subitems
                                ? <li key={navItem.label}><NavLink
                                    className={({ isActive }) => `flex gap-3 items-center px-6 py-3 font-semibold border-l-4 hover:bg-[#EEF0FF] ${isActive
                                        ? 'text-accent bg-[#EEF0FF] border-accent'
                                        : 'border-transparent'}`}
                                    to={navItem.url} onClick={onClose}>
                                    <Svg src={navItem.icon} />{navItem.label}
                                </NavLink></li>
                                : <AccordionItem value={navItem.label} key={navItem.label} className='group'>
                                    <AccordionTrigger
                                        className={cn('border-l-4 border-transparent px-6 py-3 font-semibold hover:bg-[#EEF0FF]', {
                                            'text-accent bg-[#EEF0FF] border-accent': isSublinkActive(navItem.label)
                                        })}>
                                        <span className="flex gap-3 items-center">
                                            <Svg src={navItem.icon} />
                                            {navItem.label}
                                        </span>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <ul className='list-disc list-inside p-3 font-normal'>
                                            {navItem.subitems.map(subitem => (
                                                <li key={subitem.label} className='py-2 px-6 hover:bg-[#EEF0FF] rounded-lg has-[.active]:font-semibold has-[.active]:bg-[#EEF0FF]'>
                                                    <NavLink to={subitem.url} onClick={onClose}
                                                        className={({ isActive }) => `${isActive ? 'active' : ''}`}>
                                                        {subitem.label}
                                                    </NavLink>
                                                </li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </ul>
                    </Accordion>
                </nav>
                <nav className='my-1' aria-label='secondary navigation'>
                    <ul className='grid font-bold'>
                        {secondaryNavs.map(navItem => (
                            <li key={navItem.label}><NavLink
                                className={`flex gap-3 items-center px-6 py-3 font-semibold border-l-4 hover:bg-[#EEF0FF] border-transparent`}
                                to={navItem.url} onClick={onClose}>
                                <Svg src={navItem.icon} />{navItem.label}
                            </NavLink></li>
                        ))}
                    </ul>
                </nav>
            </header>
            <aside className='border-t px-6 py-4'>
                <span className='flex items-center gap-1 mb-4 font-satoshi-bold'>
                    <Svg src={icons.themeIcon} />
                    Theme
                </span>
                <Toggletip mainComponent={mainComponent}
                    childContainerClass="bottom-[110%] left-0 bg-tertiary p-2 border text-sm whitespace-nowrap">
                    <span className='p-2 flex items-center gap-2 hover:bg-[#EEF0FF] rounded-lg font-satoshi-medium'>System default</span>
                    <span className='p-2 flex items-center gap-2 hover:bg-[#EEF0FF] rounded-lg font-satoshi-medium'>Light</span>
                    <span className='p-2 flex items-center gap-2 hover:bg-[#EEF0FF] rounded-lg font-satoshi-medium'>Dark</span>
                </Toggletip>
            </aside>
        </div>
    </div >)
}

