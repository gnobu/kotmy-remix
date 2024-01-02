import { useState } from 'react'
import { icons } from '~/assets/icons'
import Svg from '~/components/reusables/Svg'
import ContestGuidelines from './ContestGuidelines'
import RegistrationSuccess from './RegistrationSuccess'
import RegistrationForm from './RegistrationForm'
import { Contest } from '~/lib/types/contest.interface'
import ContestantSlider from '../ContestantSlider'
import { hero1, hero2, hero3 } from '~/assets/images'
import ContestTimer from './ContestTimer'

export default function RegisteringContest({ contest }: { contest: Contest }) {
    const [registered, setRegistered] = useState(false)
    return (
        <>
            <header className="wrapper my-16 grid md:grid-cols-2 justify-between gap-6 md:gap-8">
                <div className="grid">
                    <div className="max-w-2xl">
                        <h1 className="text-accent text-2xl lg:text-4xl font-satoshi-black max-w-3xl mb-3">{contest.title}</h1>
                        <p className="font-satoshi-medium">Lorem ipsum dolor sit amet consectetur. Dolor ut porta id in placerat.
                            Neque egestas tellus facilisis varius eu pretium id.
                            Commodo sed pellentesque lacus consequat ipsum. Enim elit elit
                        </p>
                    </div>
                    <ContestTimer deadline={new Date(Date.now() + 104705000)} title='registration ends in' />
                </div>
                <img src={contest.image} alt="kid smiling" className="w-full rounded-3xl" />
            </header>
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
