import { Link } from 'react-router-dom'

import { hero5, noImage } from '~/assets/images'
import FormControl from '~/components/reusables/FormControl'
import Select from '~/components/reusables/Select'
import StatusTag from '~/components/reusables/StatusTag'
import ContestantCard from './ContestantCard'
import Button from '~/components/reusables/Button'
import ContestTimer from './ContestTimer'
import { Contestant } from '~/lib/types/contestant.interface'
import { IContestWStage } from '~/models/contest/types/contest.interface'

const contestant: Contestant = {
    id: '1',
    fullName: 'Bakare Great Ireayomide',
    email: 'bakaregreat@hotmail.com',
    dob: '09-12-2019',
    gender: 'female',
    image: hero5,
    state_of_residence: 'Abuja',
    votes: {
        social_media: { type: 'facebook', count: 0, url: '.' },
        givah: 0,
        tally: 0
    }
}

export default function OngoingContest({ contest }: { contest: IContestWStage }) {
    const status = contest.status
    const color = status === 'ongoing'
        ? 'green' : status === 'completed'
            ? 'red' : 'gray'
    console.log(contest.stages)
    return (
        <>
            <header className="wrapper my-16 grid md:grid-cols-2 justify-between gap-6 md:gap-8">
                <div className="grid">
                    <div className="max-w-2xl">
                        <h1 className="text-accent text-2xl lg:text-4xl font-satoshi-black max-w-3xl mb-3 uppercase">{contest.name}</h1>
                        <p className="font-satoshi-medium">{contest.description}</p>
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
                        <FormControl as='input' type='search' className='min-w-[280px] bg-white' placeholder='Search contestant by name' />
                        <Select containerClass='bg-white'>
                            <option value="1">Stage 1</option>
                        </Select>
                    </div>
                    <Link to={'scoreboard'} className="text-accent font-bold hover:underline underline-offset-4">See scoreboard</Link>
                </div>
                <div className="my-16 grid sm:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-16">
                    {(new Array(10).fill(contestant) as Contestant[]).map((contestant, index) => (
                        <ContestantCard key={index} contestant={contestant} />
                    ))}
                </div>
                <div className="wrapper my-20 flex justify-center">
                    <Button element="button" variant="outline">See more contestants</Button>
                </div>
            </section>
        </>
    )
}
