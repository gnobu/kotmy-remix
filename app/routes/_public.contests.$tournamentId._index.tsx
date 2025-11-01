import { LoaderFunctionArgs, json, redirect } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

import Button from "~/components/reusables/Button"
import ContestCard from "~/components/reusables/ContestCard"
import { contestRepo } from "~/services/contest/contest.server"
import { tournamentRepo } from "~/services/tournament/tournament.server"

export async function loader({ params }: LoaderFunctionArgs) {
    const { tournamentId } = params
    if (!tournamentId) return redirect('/contests')
    const { data: tournament, error } = await tournamentRepo.getTournamentById(tournamentId)
    const { data: contests } = await contestRepo.getContestsInTournament(tournamentId)
    if (error) return redirect('/contests')
    return json({
        tournament: {
            ...tournament,
            contests: contests?.toReversed() ?? tournament.contests.filter(contest => contest.status !== 'yet_to_start').toReversed()
        }
    })
}

export default function TournamentPage() {
    const { tournament } = useLoaderData<typeof loader>()
    return (
        <main className='grow'>
            <header className="wrapper my-16">
                <h1 className='text-accent text-2xl lg:text-4xl font-satoshi-bold max-w-3xl'>
                    {tournament.name}
                </h1>
            </header>
            <section className='wrapper'>
                <div className="p-2 rounded-full bg-secondary flex w-fit text-xs sm:text-base">
                    <span className="whitespace-nowrap p-2 sm:px-4 sm:py-3 rounded-full font-satoshi-medium bg-accent text-white">All KOTM</span>
                    <span className="whitespace-nowrap p-2 sm:px-4 sm:py-3 rounded-full font-satoshi-medium">Ongoing</span>
                    <span className="whitespace-nowrap p-2 sm:px-4 sm:py-3 rounded-full font-satoshi-medium">Registering</span>
                    <span className="whitespace-nowrap p-2 sm:px-4 sm:py-3 rounded-full font-satoshi-medium">Completed</span>
                </div>
            </section>
            <section className='wrapper my-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center'>
                {tournament.contests.map(contest => (
                    <ContestCard key={contest.id} contest={contest} to={contest.id} withTag />
                ))}
            </section>
            <div className="wrapper my-20 flex justify-center">
                <Button element="button" variant="outline">See more contests</Button>
            </div>
        </main>
    )
}
