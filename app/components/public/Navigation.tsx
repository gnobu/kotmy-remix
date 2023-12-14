import { Link } from '@remix-run/react'
import Button from '../reusables/Button'
import Svg from '../reusables/Svg'
import { icons } from '~/assets/icons'

export default function Navigation() {
    return (
        <header className='flex justify-between items-center wrapper py-5'>
            <span className='text-2xl font-black'><Link to={'/'}>KOTMY</Link></span>
            <nav className='hidden md:flex gap-16 items-center'>
                <ul className='flex gap-6 text-xl font-bold'>
                    <li><Link to="/contests">Contests</Link></li>
                    <li><Link to="/#contact">Contact</Link></li>
                    <li><Link to="/winners">Winners</Link></li>
                    <li><Link to="/results">Results</Link></li>
                </ul>
                <Button element='a' href={'/'}>Join Now</Button>
            </nav>
            <Svg src={icons.hamburgerIcon} width={50} className='sm:hidden' />
        </header>
    )
}
