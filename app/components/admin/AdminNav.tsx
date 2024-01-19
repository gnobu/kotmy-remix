import { NavLink, useLocation } from '@remix-run/react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@radix-ui/react-accordion'
import { icons } from '~/assets/icons'
import Svg from '../reusables/Svg'
import Toggletip from '../reusables/ToggleTip'
import { cn } from '~/lib/utils'

const navs = [
    { label: 'Home', icon: icons.adminHomeIcon, url: '/admin/overview' },
    { label: 'Admin Accounts', icon: icons.adminUsersIcon, url: '/admin/accounts' },
    { label: 'Tournaments', icon: icons.adminTournamentIcon, url: '/admin/tournaments' },
    { label: 'Contests', icon: icons.adminContestIcon, url: '/admin/contests' },
]

const navsWSubs = [
    {
        label: 'Transactions', icon: icons.adminFinanceIcon, subitems: [
            { label: 'Tally Votes', url: 'transactions/tally-votes' },
            { label: 'Contest Registrations', url: 'transactions/contest-registrations' },
            { label: 'Income History', url: 'transactions/income-history' },
        ]
    },
]

export default function AdminNavigation({ show }: { show: boolean }) {
    const { pathname } = useLocation()
    function isSublinkActive(url: string) { return new RegExp(url, 'i').test(pathname) }
    const mainComponent = (
        <div className="flex justify-between items-center border  rounded-lg p-2 text-sm cursor-pointer line-clamp-1 hover:outline outline-1 outline-primary">
            System default
            <Svg src={icons.arrowDownIcon} />
        </div>)
    return (show
        ? <header className='bg-secondary border-r hidden sm:flex flex-col justify-between min-w-[280px]'>
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
                <Accordion type="single" collapsible className='w-full mt-2'>
                    {navsWSubs.map(item => (
                        <AccordionItem value={item.label} key={item.label} className='group'>
                            <AccordionTrigger
                                className={cn('border-l-4 border-transparent group w-full flex gap-3 items-center justify-between px-6 py-3 font-semibold hover:bg-[#EEF0FF]', {
                                    'text-accent bg-[#EEF0FF] border-accent': isSublinkActive(item.label)
                                })}>
                                <span className="flex gap-3 items-center">
                                    <Svg src={item.icon} />
                                    {item.label}
                                </span>
                                <Svg src={icons.arrowDownIcon} className='group-[[data-state=open]]:rotate-180 transition-transform duration-200' />
                            </AccordionTrigger>
                            <AccordionContent>
                                <ul className='list-disc list-inside p-3'>
                                    {item.subitems.map(subitem => (
                                        <li key={subitem.label} className='py-2 px-6 hover:bg-[#EEF0FF] rounded-lg has-[.active]:font-semibold has-[.active]:bg-[#EEF0FF]'>
                                            <NavLink to={subitem.url}
                                                className={({ isActive }) => `${isActive ? 'active' : ''}`}>
                                                {subitem.label}
                                            </NavLink>
                                        </li>
                                    ))}

                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </nav>
            <aside className='border-t  px-6 py-3'>
                <span className='flex items-center gap-1 mb-2 font-satoshi-bold'>
                    <Svg src={icons.themeIcon} />
                    Theme
                </span>
                <Toggletip mainComponent={mainComponent}
                    childContainerClass="bottom-[110%] left-0 bg-tertiary p-2 border  text-xs whitespace-nowrap">
                    <span className='p-2 flex items-center gap-2 hover:bg-[#EEF0FF] rounded-lg font-satoshi-medium'>System default</span>
                    <span className='p-2 flex items-center gap-2 hover:bg-[#EEF0FF] rounded-lg font-satoshi-medium'>Light</span>
                    <span className='p-2 flex items-center gap-2 hover:bg-[#EEF0FF] rounded-lg font-satoshi-medium'>Dark</span>
                </Toggletip>
            </aside>
        </header >
        : null
    )
}
