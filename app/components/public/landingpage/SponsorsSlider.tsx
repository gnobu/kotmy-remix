import { sponsorLogo } from '~/assets/images'
import AutoplayCarousel from '~/components/reusables/AutoplayCarousel'
import CarouselItem from '~/components/reusables/CarouselItem'


export default function SponsorsSlider() {
    return (
        <AutoplayCarousel>
            <CarouselItem><img src={sponsorLogo} alt="Zendesk" /></CarouselItem>
        </AutoplayCarousel>
    )
}
