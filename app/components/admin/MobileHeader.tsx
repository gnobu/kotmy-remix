import { icons } from "~/assets/icons"
import Svg from "../reusables/Svg"
import { Link } from "@remix-run/react"
import { logo } from "~/assets/images"

export default function MobileHeader({ toggleNav }: { toggleNav: () => void }) {
    return (
        <div className="flex items-center gap-4 p-4 border-b">
            <Link to={'/'}>
                <img src={logo} alt="KOTMY" />
            </Link>
            <p className="grid font-medium text-primary text-xs">
                <span className="text-base font-satoshi-bold line-clamp-1">Hello Admin</span>
                <span className="line-clamp-1">Welcome back to KOTMY 👋</span>
            </p>
            <button
                onClick={toggleNav}
                title='open Menu'
                className="ml-auto flex items-center justify-center rounded p-2 px-1 hover:outline outline-primary"
            >
                <Svg src={icons.adminHamburgerIcon} width={30} height={24} />
            </button>
        </div>
    )
}
