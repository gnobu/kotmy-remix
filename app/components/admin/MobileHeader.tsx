import { icons } from "~/assets/icons"
import Svg from "../reusables/Svg"

export default function MobileHeader({ toggleNav }: { toggleNav: () => void }) {
    return (
        <div className="flex justify-between items-center p-4 border-b">
            <p className="font-medium text-primary text-xs">
                <span className="block text-base font-satoshi-bold">Hello Admin</span>
                <span className="block">Welcome back to KOTMY 👋</span>
            </p>
            <button
                onClick={toggleNav}
                title='open Menu'
                className="flex items-center justify-center rounded p-2 px-1 hover:outline outline-primary"
            >
                <Svg src={icons.adminHamburgerIcon} width={30} height={24} />
            </button>
        </div>
    )
}
