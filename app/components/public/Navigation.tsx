import { useState } from 'react'
import { Link, NavLink } from '@remix-run/react'
import Button from '../reusables/Button'
import Svg from '../reusables/Svg'
import { icons } from '~/assets/icons'
import { logo } from '~/assets/images'
import MobileNavigation from './MobileNavigation'

export default function Navigation() {
    const [showNav, setShowNav] = useState(false)
    return (
        <header className='flex justify-between items-center wrapper py-5'>
            <Link to={'/'}>
                <img src={logo} alt="KOTMY" className='sm:w-16' />
            </Link>
            <nav className='hidden md:flex gap-16 items-center'>
                <ul className='flex gap-6 text-xl font-bold'>
                    <li><NavLink to="/contests" className={({ isActive }) => isActive ? 'activeNav text-accent' : ''}>Contests</NavLink></li>
                    <li><NavLink to="/winners" className={({ isActive }) => isActive ? 'activeNav text-accent' : ''}>Winners</NavLink></li>
                    <li><NavLink to="/results" className={({ isActive }) => isActive ? 'activeNav text-accent' : ''}>Results</NavLink></li>
                    <li><NavLink to="/#contact" className=''>Contact</NavLink></li>
                </ul>
                <Button element='a' href={'/'}>Join Now</Button>
            </nav>
            <button
                onClick={() => { setShowNav(true) }}
                className="sm:hidden flex items-center justify-center rounded p-2 px-1 hover:outline outline-primary"
            >
                <Svg src={icons.hamburgerIcon} width={40} height={24} />
            </button>
            <MobileNavigation onClose={() => { setShowNav(false) }} show={showNav} />
        </header>
    )
}
