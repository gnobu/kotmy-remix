import { Link } from '@remix-run/react'

export default function Footer() {
    return (
        <footer className='wrapper flex flex-wrap gap-6 gap-x-12 justify-between font-bold pb-8'>
            <nav className='flex gap-6 items-center'>
                <ul className='flex gap-6'>
                    <li><Link to="/contests">Contests</Link></li>
                    <li><Link to="/#contacts">Contact</Link></li>
                    <li><Link to="/winners">Winners</Link></li>
                    <li><Link to="/results">Results</Link></li>
                </ul>
            </nav>
            <span>Privacy Policy</span>
            <span className='md:order-first'>KOTMY © 2023  All rights reserved</span>
        </footer>
    )
}
