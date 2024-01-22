import { Link, NavLink, useLocation } from '@remix-run/react'
import Svg from '../reusables/Svg'
import { icons } from '~/assets/icons'
import Button from '../reusables/Button'
import { useRef } from 'react'

export default function MobileNavigation({ show, onClose }: { show: boolean, onClose: () => void }) {
    const { pathname } = useLocation()
    const mobileNav = useRef<HTMLDivElement>(null)
    mobileNav.current?.style.setProperty('--left', `0%`)
    return (<div data-show={show} ref={mobileNav}
        className="sm:hidden fixed top-0 left-0 bg-primary w-full h-dvh z-10 flex flex-col justify-between mobileNav data-[show=true]:animate-slide-in-left data-[show=false]:left-full data-[show=false]:animate-slide-out-left">
        <header className='wrapper py-5'>
            <div className='flex justify-between items-center' >
                <Link to={'/'} onClick={onClose} aria-label='home'><Svg src={icons.logoIcon} width={37} height={36} /></Link>
                <button onClick={onClose} title='close menu' className="flex gap-1 items-center rounded p-2 hover:outline outline-primary">
                    <Svg src={icons.closeIcon} width={24} height={24} className='sm:hidden' />
                </button>
            </div >
            <nav className=''>
                <ul className='grid gap-6 my-12 text-xl font-bold'>
                    <li><NavLink onClick={onClose} to="/contests" className={({ isActive }) => isActive ? 'text-accent flex gap-2 items-center' : ''}>
                        {pathname.includes('/contests') ? <Svg src={icons.activeDotIcon} width={'.5em'} /> : null} Contests
                    </NavLink></li>
                    <li><NavLink onClick={onClose} to="/winners" className={({ isActive }) => isActive ? 'text-accent flex gap-2 items-center' : ''}>
                        {pathname.includes('/winners') ? <Svg src={icons.activeDotIcon} width={'.5em'} /> : null} Winners
                    </NavLink></li>
                    <li><NavLink onClick={onClose} to="/results" className={({ isActive }) => isActive ? 'text-accent flex gap-2 items-center' : ''}>
                        {pathname.includes('/results') ? <Svg src={icons.activeDotIcon} width={'.5em'} /> : null} Results
                    </NavLink></li>
                    <li><NavLink onClick={onClose} to="/#contact" className=''>Contact</NavLink></li>
                </ul>
                <Button element='a' onClick={onClose} href={'/contests'} className='block w-full sm:w-auto'>Join Now</Button>
            </nav>
        </header>
        <aside className='wrapper py-5'>
            <div className='mb-12'>
                <span className='block font-satoshi-black mb-2'>Follow Us</span>
                <span className='flex gap-4'>
                    <Svg src={icons.twitterXIcon} width={'24px'} height={'24px'} />
                    <Svg src={icons.instagramIcon} width={'24px'} height={'24px'} />
                    <Svg src={icons.facebookIcon} width={'24px'} height={'24px'} />
                    <Svg src={icons.youtubeIcon} width={'24px'} height={'24px'} />
                </span>
            </div>
            <div className='flex gap-6 justify-between items-end font-satoshi-bold'>
                <span className='text-sm whitespace-nowrap'>KOTMY © 2023  All rights reserved</span>
                <span className='text-xs whitespace-nowrap'>Privacy Policy</span>
            </div>
        </aside>
    </div>)
}
