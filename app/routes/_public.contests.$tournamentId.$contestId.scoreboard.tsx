import { LoaderFunctionArgs, json, redirect } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import ContestTimer from "~/components/public/contests/ContestTimer"
import MobileScoreboard from "~/components/public/contests/MobileScoreboard"
import ScoreboardTable from "~/components/public/contests/ScoreboardTable"
import FormControl from "~/components/reusables/FormControl"
import Pagination from "~/components/reusables/Pagination"
import Select from "~/components/reusables/Select"
import StatusTag from "~/components/reusables/StatusTag"
import { contests } from "~/lib/data/landingPage.data"
import { scoreboardData } from "~/lib/data/scoreboardData"

export async function loader({ params }: LoaderFunctionArgs) {
    const { contestId } = params
    const contest = contests.find(contest => contest._id === contestId)
    if (!contest) return redirect('/contests')
    return json({ contest })
}

export default function ContestPage() {
    const { contest } = useLoaderData<typeof loader>()
    return (
        <main className='grow'>
            <header className="wrapper my-16 grid md:grid-cols-2 justify-between gap-6 md:gap-8">
                <div className="grid">
                    <div className="max-w-2xl">
                        <h1 className="text-accent text-2xl lg:text-4xl font-satoshi-black max-w-3xl mb-3 uppercase">{contest.title}</h1>
                        <p className="font-satoshi-medium">Lorem ipsum dolor sit amet consectetur. Dolor ut porta id in placerat.
                            Neque egestas tellus facilisis varius eu pretium id.
                            Commodo sed pellentesque lacus consequat ipsum. Enim elit elit
                        </p>
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-2 max-w-4xl">
                        <div className="">
                            <span className="block font-satoshi-bold mb-1">Status</span>
                            <StatusTag status={contest.status} />
                        </div>
                        <div className="">
                            <span className="block font-satoshi-bold mb-1">Age Categories</span>
                            <span className="block">0 - 14 Years</span>
                        </div>
                        <div className="col-span-2">
                            <span className="block font-satoshi-bold mb-1">Prizes</span>
                            <span className="block">3 million naira worth of prizes for winners.</span>
                        </div>
                    </div>
                    <ContestTimer deadline={new Date(Date.now() + 104705000)} title='contest ends in' />
                </div>
                <img src={contest.image} alt="kid smiling" className="w-full rounded-3xl" />
            </header>
            <section className="sm:bg-white">
                <div className="wrapper my-16">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-y-4 gap-x-6 sm:gap-x-8 py-6 flex-wrap">
                        <span className="font-satoshi-medium text-xl">1000 Contestants</span>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <FormControl as='input' type='search' className='min-w-[280px] bg-white' placeholder='Search contestant by name' />
                            <Select containerClass='bg-white'>
                                <option value="1">Stage 1</option>
                            </Select>
                        </div>
                        <Link to={`/results/${contest._id}`} className="text-accent font-bold hover:underline underline-offset-4">See result table</Link>
                    </div>
                    <ScoreboardTable data={scoreboardData} />
                    <MobileScoreboard data={scoreboardData} />
                    <Pagination className="p-6" />
                </div>
            </section>
        </main>
    )
}
