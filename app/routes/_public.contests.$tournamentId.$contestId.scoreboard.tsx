import { ActionFunctionArgs, json } from "@remix-run/node"
import { Link, useRouteLoaderData, useSearchParams } from "@remix-run/react"

import { getTallyLink, voteContestant } from "~/services/contestant/actions.server"
import { setToast } from "~/lib/session.server"
import ContestTimer from "~/components/public/contests/ContestTimer"
import FormControl from "~/components/reusables/FormControl"
import MobileScoreboard from "~/components/public/contests/MobileScoreboard"
import { noImage } from "~/assets/images"
import ScoreboardTable from "~/components/public/contests/ScoreboardTable"
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "~/components/reusables/select-shad"
import StatusTag from "~/components/reusables/StatusTag"
import { StageContestantsLoader } from "./_public.contests.$tournamentId.$contestId"

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData()
    const intent = formData.get('intent') as 'tally_vote'
    if (intent === 'tally_vote') return await getTallyLink(formData, request)
    if (intent === "kotmy_vote") return await voteContestant(formData, request)
    const { headers } = await setToast({ request, toast: `error::This action is not yet supported::${Date.now()}` })
    return json(null, { headers })
}

export default function Scoreboard() {
    const stageContestants = useRouteLoaderData<StageContestantsLoader>("routes/_public.contests.$tournamentId.$contestId")
    if (!stageContestants) throw new Error("Could not load stage contestants")
    const { contest, stage } = stageContestants
    const [_, setUrlSearchParams] = useSearchParams()
    const color = contest!.status === 'registering'
        ? 'yellow' : contest!.status === 'ongoing'
            ? 'green' : contest!.status === 'completed'
                ? 'red' : 'gray'
    return (
        <main className='grow'>
            <header className="wrapper my-16 grid md:grid-cols-2 justify-between gap-6 md:gap-8">
                <div className="grid">
                    <div className="max-w-2xl">
                        <h1 className="text-accent text-2xl lg:text-4xl font-satoshi-black max-w-3xl mb-3 uppercase">{contest!.name}</h1>
                        <p className="font-satoshi-medium">{contest!.desc}</p>
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-2 max-w-4xl">
                        <div className="">
                            <span className="block font-satoshi-bold mb-1">Status</span>
                            <StatusTag status={contest!.status} color={color} />
                        </div>
                        <div className="">
                            <span className="block font-satoshi-bold mb-1">Categories</span>
                            <div className="flex gap-4 flex-wrap capitalize">
                                {contest!.categories.map(category => (<span key={category}>~ {category}</span>))}
                            </div>
                        </div>
                        <div className="col-span-2">
                            <span className="block font-satoshi-bold mb-1">Prizes</span>
                            <span className="block">{contest!.prizes}</span>
                        </div>
                    </div>
                    <ContestTimer deadline={new Date(contest!.end_date)} title='contest ends in' />
                </div>
                <img src={contest!.image || noImage} alt="kid smiling" className="w-full rounded-3xl h-[350px] object-cover" />
            </header>
            <section className="sm:bg-white">
                <div className="wrapper my-16">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-y-4 gap-x-6 sm:gap-x-8 py-6 flex-wrap">
                        <span className="font-satoshi-medium text-xl">{stage?.contestants.length ?? 0} Contestants</span>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <FormControl as='input' type='search' className='min-w-[280px] bg-white' placeholder='Search contestant by name' />
                            <Select value={String(stage?.stage)} onValueChange={(val) => setUrlSearchParams(prev => { prev.set('stage', val); return prev })}>
                                <SelectTrigger className="sm:w-[180px] h-auto rounded-lg shadow-none bg-white hover:border-accent">
                                    <SelectValue placeholder={"Stage 1"} />
                                </SelectTrigger>
                                <SelectContent>
                                    {contest!.stages.map(stage => (
                                        <SelectItem key={stage.stage} value={String(stage.stage)} className='focus:bg-blue-700/25'>Stage {stage.stage}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <Link to={`/results/${contest!.id}`} className="w-fit text-accent font-bold hover:underline underline-offset-4">See result table</Link>
                    </div>
                    <ScoreboardTable contestants={stage?.contestants ?? []} socialMediaType={stage?.rates.social_media.type ?? 'kotmy'} />
                    <MobileScoreboard contestants={stage?.contestants ?? []} socialMediaType={stage?.rates.social_media.type ?? 'kotmy'} />
                    {/* <Pagination className="p-6" /> */}
                </div>
            </section>
        </main>
    )
}
