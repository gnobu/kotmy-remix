import { useState } from 'react'
import { icons } from '~/assets/icons'
import Svg from '~/components/reusables/Svg'
import ContestGuidelines from './ContestGuidelines'
import RegistrationSuccess from './RegistrationSuccess'
import RegistrationForm from './RegistrationForm'
import { Contest } from '~/lib/types/contest.interface'
import ContestantSlider from '../ContestantSlider'
import { hero1, hero2, hero3 } from '~/assets/images'

export default function RegisteringContest({ contest }: { contest: Contest }) {
    const [registered, setRegistered] = useState(false)
    return (
        <>
            <header className="wrapper my-16 flex flex-col sm:flex-row justify-between items-center gap-6 md:gap-8">
                <div className="max-w-2xl">
                    <h1 className="text-accent text-2xl lg:text-4xl font-satoshi-black max-w-3xl mb-3">{contest.title}</h1>
                    <p className="font-satoshi-medium">Lorem ipsum dolor sit amet consectetur. Dolor ut porta id in placerat.
                        Neque egestas tellus facilisis varius eu pretium id.
                        Commodo sed pellentesque lacus consequat ipsum. Enim elit elit
                    </p>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <p className="text-xl font-satoshi-bold">Start Date - End Date</p>
                    <span className="p-4 rounded-full border border-primary bg-secondary flex items-center gap-2 whitespace-nowrap sm:text-xl font-satoshi-bold">
                        <Svg src={icons.clockIcon} />
                        Registration ends November 7
                    </span>
                </div>
            </header>
            <img src={contest.image} alt="kid smiling" className="wrapper w-full rounded-3xl my-16" />
            <section className="sm:wrapper my-16">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-6 sm:gap-8">
                    <ContestGuidelines />
                    {registered ? <RegistrationSuccess /> : <RegistrationForm onSubmit={() => setRegistered(true)} />}
                </div>
            </section>
            <section className='my-8 md:my-16'>
                <h2 className='text-2xl sm:text-[40px] leading-snug font-satoshi-black w-4/5 max-w-lg text-center mx-auto my-10'>Over 500 registered participants and counting</h2>
                <ContestantSlider contestants={[{ id: 'sdjc', image: hero1 }, { id: 'adcn', image: hero2 }, { id: 'kjsd', image: hero3 }]} />
            </section>
        </>
    )
}
