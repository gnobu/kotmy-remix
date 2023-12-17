import { Link, NavLink } from '@remix-run/react'
import Button from '../reusables/Button'
import Svg from '../reusables/Svg'
import { icons } from '~/assets/icons'
import { logo } from '~/assets/images'

export default function Navigation() {
    return (
        <header className='flex justify-between items-center wrapper py-5'>
            <span className='text-2xl font-black'><Link to={'/'}>
                <img src={logo} alt="KOTMY" />
            </Link></span>
            <nav className='hidden md:flex gap-16 items-center'>
                <ul className='flex gap-6 text-xl font-bold'>
                    <li><NavLink to="/contests" className={({ isActive }) => isActive ? 'activeNav text-accent' : ''}>Contests</NavLink></li>
                    <li><NavLink to="/#contact" className={({ isActive }) => isActive ? 'activeNav text-accent' : ''}>Contact</NavLink></li>
                    <li><NavLink to="/winners" className={({ isActive }) => isActive ? 'activeNav text-accent' : ''}>Winners</NavLink></li>
                    <li><NavLink to="/results" className={({ isActive }) => isActive ? 'activeNav text-accent' : ''}>Results</NavLink></li>
                </ul>
                <Button element='a' href={'/'}>Join Now</Button>
            </nav>
            <Svg src={icons.hamburgerIcon} width={50} className='sm:hidden' />
        </header>
    )
}
