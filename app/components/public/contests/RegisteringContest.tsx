import { useActionData } from '@remix-run/react'

import ContestGuidelines from './ContestGuidelines'
import RegistrationSuccess from './RegistrationSuccess'
import RegistrationForm from './RegistrationForm'
import ContestantSlider from '../ContestantSlider'
import ContestTimer from './ContestTimer'
import { hero1, hero2, hero3, noImage } from '~/assets/images'
import { IContest } from '~/services/contest/types/contest.interface'
import { RegisterAction } from '~/routes/_public.contests.$tournamentId.$contestId._index'

export default function RegisteringContest({ contest }: { contest: IContest }) {
    const actionRes = useActionData<RegisterAction>()
    return (
        <>
            <header className="wrapper my-16 grid md:grid-cols-2 justify-between gap-6 md:gap-8">
                <div className="flex flex-col justify-around">
                    <div className="max-w-2xl">
                        <h1 className="text-accent text-2xl lg:text-4xl font-satoshi-black max-w-3xl mb-3">{contest.name}</h1>
                        <p className="font-satoshi-medium">{contest.desc}</p>
                    </div>
                    <ContestTimer deadline={new Date(contest.reg_deadline)} title='registration ends in' />
                </div>
                <img src={contest.image || noImage} alt="kid smiling" className="w-full rounded-3xl h-[350px] object-cover" />
            </header>
            <section className="sm:wrapper my-16">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-6 sm:gap-8">
                    <ContestGuidelines contest={contest} />
                    {/* @ts-ignore */}
                    {actionRes?.data // @ts-ignore
                        ? <RegistrationSuccess contestant={actionRes.data} contest={contest} />
                        : <RegistrationForm contest={contest} />
                    }
                </div>
            </section>
            <section className='my-8 md:my-16'>
                <h2 className='text-2xl sm:text-[40px] leading-snug font-satoshi-black w-4/5 max-w-lg text-center mx-auto my-10'>Over 500 registered participants and counting</h2>
                <ContestantSlider contestants={[{ id: 'sdjc', image: hero1 }, { id: 'adcn', image: hero2 }, { id: 'kjsd', image: hero3 }]} />
            </section>
        </>
    )
}
