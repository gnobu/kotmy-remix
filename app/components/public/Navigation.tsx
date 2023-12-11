import { Link } from '@remix-run/react'

export default function Navigation() {
    return (
        <header>
            <span><Link to={'/'}>KOTMY</Link></span>
            <nav>
                <ul>
                    <li><Link to="/contests">Contests</Link></li>
                    <li><Link to="/#contacts">Contacts</Link></li>
                    <li><Link to="/winners">Winners</Link></li>
                    <li><Link to="/results">Results</Link></li>
                </ul>
                <Link to={'/'}>Join Now</Link>
            </nav>
        </header>
    )
}
