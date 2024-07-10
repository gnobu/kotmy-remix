import { icons } from "~/assets/icons"
import Svg from "~/components/reusables/Svg"

export default function CarouselButtonGroup({ next, previous }: { next?: () => void, previous?: () => void }) {
    return (
        <div className="carousel-button-group">
            <button className="small rounded bg-pry carousel-button"
                onClick={() => { if (previous) previous() }}>
                <Svg src={icons.arrowLeftIcon} />
            </button>
            <button className="small rounded bg-pry carousel-button"
                onClick={() => { if (next) next() }}>
                <Svg src={icons.arrowRightIcon} />
            </button>
        </div>
    )
}