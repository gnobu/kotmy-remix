import { hero1, hero2, hero3, hero4, hero5 } from '~/assets/images'
import Button from '~/components/public/reusables/Button'

export default function LandingPage() {
    return (
        <main>
            <section className='wrapper flex flex-col md:flex-row gap-10 xl:gap-24 md:items-center py-8 md:py-16'>
                <div className='flex flex-col gap-4 sm:gap-8'>
                    <h1 className='font-black text-4xl sm:text-5xl xl:text-[64px] leading-tight sm:leading-snug whitespace-nowrap'>
                        Capturing Moments
                        <br />
                        Creating <span className='text-accent'>Memories.</span>
                    </h1>
                    <p className='text-xl'>Join our monthly/yearly photo contests open to kids, both male and female aged 0-14 years and discover a world of imagination and inspiration.</p>
                    <div className='flex gap-4 flex-wrap'>
                        <Button element='button'>Join Now</Button>
                        <Button element='button' variant='outline'>Explore Contests</Button>
                    </div>
                </div>
                <div className='grid grid-cols-3 gap-8 xl:gap-9 w-full'>
                    <div className='flex flex-col gap-8 xl:gap-9'>
                        <div className='aspect-3/7 overflow-hidden rounded-full outline-dashed outline-offset-4'>
                            <img className='object-cover object-center h-full w-full' src={hero1} alt="kid smiling" />
                        </div>
                        <div className='aspect-3/4 grow overflow-hidden rounded-full outline-dashed outline-offset-4'>
                            <img className='object-cover object-center h-full w-full' src={hero2} alt="kid smiling" />
                        </div>
                    </div>
                    <div className='flex flex-col gap-8 xl:gap-9 justify-center'>
                        <div className='aspect-square overflow-hidden rounded-full outline-dashed outline-offset-4'>
                            <img className='object-cover object-center h-full w-full' src={hero3} alt="kid smiling" />
                        </div>
                        <div className='aspect-3/7 overflow-hidden rounded-full outline-dashed outline-offset-4'>
                            <img className='object-cover object-center h-full w-full' src={hero4} alt="kid smiling" />
                        </div>
                    </div>
                    <div className='flex flex-col justify-center'>
                        <div className='aspect-3/7 overflow-hidden rounded-full outline-dashed outline-offset-4'>
                            <img className='object-cover object-center h-full w-full' src={hero5} alt="kid smiling" />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
