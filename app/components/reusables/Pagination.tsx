import Svg from './Svg'
import { icons } from '~/assets/icons'

export default function Pagination({ className = '' }: { className?: string }) {
    return (
        <div className={`flex gap-6 md:gap-8 justify-center items-center font-semibold ${className}`}>
            <button className="flex gap-1 items-center rounded py-1 px-2 hover:outline outline-primary">
                <Svg src={icons.arrowPrevIcon} /> Prev
            </button>
            <span className="whitespace-nowrap">1 of 20</span>
            <button className="flex gap-1 items-center rounded py-1 px-2 hover:outline outline-primary">
                Next <Svg src={icons.arrowNextIcon} />
            </button>
        </div>
    )
}
