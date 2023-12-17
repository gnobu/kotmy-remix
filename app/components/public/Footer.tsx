import { Link } from '@remix-run/react'

export default function Footer() {
    return (
        <footer className='border-t border-primary py-8'>
            <div className='wrapper flex flex-wrap gap-6 gap-x-12 justify-between font-bold'>
                <nav className='flex gap-6 items-center'>
                    <ul className='flex gap-6'>
                        <li><Link to="/contests">Contests</Link></li>
                        <li><Link to="/#contact">Contact</Link></li>
                        <li><Link to="/winners">Winners</Link></li>
                        <li><Link to="/results">Results</Link></li>
                    </ul>
                </nav>
                <span>Privacy Policy</span>
                <span className='md:order-first'>KOTMY © 2023  All rights reserved</span>
            </div>
        </footer>
    )
}
