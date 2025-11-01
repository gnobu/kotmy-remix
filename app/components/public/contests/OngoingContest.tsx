import { Link } from 'react-router-dom'
import { useSearchParams } from '@remix-run/react'

import FormControl from '~/components/reusables/FormControl'
import StatusTag from '~/components/reusables/StatusTag'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/reusables/select-shad'
import ContestantCard from './ContestantCard'
import ContestTimer from './ContestTimer'
import { noImage } from '~/assets/images'
import { IContestWStage, IStageWContestant } from '~/services/contest/types/contest.interface'

export default function OngoingContest({ contest, stage }: { contest: IContestWStage, stage: IStageWContestant | null }) {
    const [searchParams, setUrlSearchParams] = useSearchParams()
    const status = contest.status
    const color = status === 'ongoing'
        ? 'green' : status === 'completed'
            ? 'red' : 'gray'

    return (
        <>
            <header className="wrapper my-16 grid md:grid-cols-2 justify-between gap-6 md:gap-8">
                <div className="grid">
                    <div className="max-w-2xl">
                        <h1 className="text-accent text-2xl lg:text-4xl font-satoshi-black max-w-3xl mb-3 uppercase">{contest.name}</h1>
                        <p className="font-satoshi-medium">{contest.desc}</p>
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-2 max-w-4xl">
                        <div className="">
                            <span className="block font-satoshi-bold mb-1">Status</span>
                            <StatusTag status={status} color={color} />
                        </div>
                        <div className="">
                            <span className="block font-satoshi-bold mb-1">Categories</span>
                            <div className="flex gap-4 flex-wrap capitalize">
                                {contest.categories.map(category => (<span key={category}>~ {category}</span>))}
                            </div>
                        </div>
                        <div className="col-span-2">
                            <span className="block font-satoshi-bold mb-1">Prizes</span>
                            <span className="block">{contest.prizes}</span>
                        </div>
                    </div>
                    <ContestTimer deadline={new Date(contest.end_date)} title='contest ends in' />
                </div>
                <img src={contest.image || noImage} alt="kid smiling" className="w-full rounded-3xl h-[350px] object-cover" />
            </header>
            <section className="wrapper my-16">
                <h2 className="text-accent text-lg lg:text-2xl font-satoshi-bold mb-3 sm:mb-6 uppercase">{contest.name} contestants</h2>
                <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 sm:gap-8">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <FormControl as='input' type='search' className='min-w-[280px] bg-white py-2 text-sm' placeholder='Search contestant by name' />
                        <Select value={String(stage?.stage)} onValueChange={(val) => setUrlSearchParams(prev => { prev.set('stage', val); return prev })}>
                            <SelectTrigger className="sm:w-[180px] h-auto rounded-lg shadow-none bg-white hover:border-accent">
                                <SelectValue placeholder={"Stage 1"} />
                            </SelectTrigger>
                            <SelectContent>
                                {contest.stages.map(stage => (
                                    <SelectItem key={stage.stage} value={String(stage.stage)} className='focus:bg-blue-700/25'>Stage {stage.stage}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Link to={`scoreboard?${searchParams.toString()}`} className="w-fit text-accent font-bold hover:underline underline-offset-4">See scoreboard</Link>
                </div>
                <div className="my-16 grid sm:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-16">
                    {stage?.contestants.map((contestant) => (
                        <ContestantCard key={contestant.code} contestant={contestant} socialMedia={stage.rates.social_media.type} />
                    ))}
                </div>
                {/* <div className="wrapper my-20 flex justify-center">
                    <Button element="button" variant="outline">See more contestants</Button>
                </div> */}
            </section>
        </>
    )
}
