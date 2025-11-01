import { useState } from 'react'
import { Link, NavLink, useLocation } from '@remix-run/react'
import Button from '../reusables/Button'
import Svg from '../reusables/Svg'
import { icons } from '~/assets/icons'
import MobileNavigation from './MobileNavigation'

export default function Navigation() {
    const [showNav, setShowNav] = useState(false)
    const { pathname } = useLocation()
    return (
        <header className='flex justify-between items-center wrapper py-5'>
            <Link to={'/'} aria-label='home'>
                <Svg src={icons.logoIcon} className='w-9 h-9 sm:w-16 sm:h-16' />
            </Link>
            <nav className='hidden md:flex gap-16 items-center'>
                <ul className='flex gap-6 text-xl font-bold'>
                    <li><NavLink to="/contests" className={({ isActive }) => isActive ? 'text-accent flex gap-2 items-center' : ''}>
                        {pathname.includes('/contests') ? <Svg src={icons.activeDotIcon} width={'.5em'} /> : null} Contests
                    </NavLink></li>
                    <li><NavLink to="/winners" className={({ isActive }) => isActive ? 'text-accent flex gap-2 items-center' : ''}>
                        {pathname.includes('/winners') ? <Svg src={icons.activeDotIcon} width={'.5em'} /> : null} Winners
                    </NavLink></li>
                    <li><NavLink to="/results" className={({ isActive }) => isActive ? 'text-accent flex gap-2 items-center' : ''}>
                        {pathname.includes('/results') ? <Svg src={icons.activeDotIcon} width={'.5em'} /> : null} Results
                    </NavLink></li>
                    <li><NavLink to="/#contact" className=''>Contact</NavLink></li>
                </ul>
                <Button element='a' href={'/login'}>Join Now</Button>
            </nav>
            <button
                onClick={() => { setShowNav(true) }}
                title='hamburger'
                className="sm:hidden flex items-center justify-center rounded p-2 px-1 hover:outline outline-primary"
            >
                <Svg src={icons.hamburgerIcon} width={40} height={24} />
            </button>
            <MobileNavigation onClose={() => { setShowNav(false) }} show={showNav} />
        </header>
    )
}
