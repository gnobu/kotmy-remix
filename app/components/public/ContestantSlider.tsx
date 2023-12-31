import AutoplayCarousel from '../reusables/AutoplayCarousel'
import CarouselItem from '../reusables/CarouselItem'

export default function ContestantSlider({ contestants }: { contestants: { id: string | number, image: string }[] }) {
    return (
        <>
            <AutoplayCarousel slideDuration={30}>
                {contestants.map(contestant => (
                    <CarouselItem key={contestant.id} className={'h-24 md:h-72 aspect-square rounded-lg overflow-hidden mx-2 md:mx-6'}>
                        <img src={contestant.image} alt="person smiling" className='h-full aspect-square object-cover' />
                    </CarouselItem>
                ))}
            </AutoplayCarousel>
            <AutoplayCarousel slideDuration={30} reverse>
                {contestants.map(contestant => (
                    <CarouselItem key={contestant.id} className={'h-24 md:h-72 aspect-square rounded-lg overflow-hidden mx-2 md:mx-6'}>
                        <img src={contestant.image} alt="person smiling" className='h-full aspect-square object-cover' />
                    </CarouselItem>
                ))}
            </AutoplayCarousel>
        </>
    )
}
