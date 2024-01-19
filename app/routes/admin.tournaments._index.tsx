import { LoaderFunctionArgs, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { icons } from "~/assets/icons"
import TournamentCard from "~/components/admin/tournament/TournamentCard"
import Cta from "~/components/reusables/Cta"
import Svg from "~/components/reusables/Svg"
import { getTournamentsWithContests } from "~/lib/data/contest.server"

export async function loader({ }: LoaderFunctionArgs) {
    return json({ tournaments: await getTournamentsWithContests() })
}

export default function Tournaments() {
    const { tournaments } = useLoaderData<typeof loader>()
    const numberOfContests = tournaments.reduce((total, tournament) => (total + tournament.contests.length), 0)
    return (
        <main className='w-full overflow-y-auto p-6'>
            <section className="flex justify-between items-center mb-8 sm:mb-16">
                <h1 className="text-2xl font-black text-primary">Tournaments</h1>
                <Cta element="link" to='add' className="hidden sm:flex gap-2 items-center rounded-lg px-3 py-2">
                    <Svg src={icons.addIcon} width={'.9em'} />
                    Create Tournament
                </Cta>
            </section>
            <aside className="sm:flex justify-evenly max-w-xl mx-auto gap-2 p-3 border rounded-md my-4 bg-[#F6F8FA] text-sm">
                <div className='flex gap-3 items-center'>
                    <span className="bg-tertiary p-2 rounded-full border"><Svg src={icons.adminTournamentIcon} className="text-primary" /></span>
                    <span className="grid">
                        <span className='text-primary font-satoshi-black'>{tournaments.length}</span>
                        <span className=''>Tournaments Created</span>
                    </span>
                </div>
                <div className="max-sm:my-2 max-sm:border-t sm:border-r sm:h-10" />
                <div className='flex gap-3 items-center'>
                    <span className="bg-tertiary p-2 rounded-full border"><Svg src={icons.adminContestIcon} className="text-primary" /></span>
                    <span className="grid">
                        <span className='text-primary font-satoshi-black'>{numberOfContests}</span>
                        <span className=''>Contests Created</span>
                    </span>
                </div>
            </aside>
            <Cta element="link" to='add' className="flex sm:hidden gap-2 justify-center items-center rounded-lg px-3 py-2">
                <Svg src={icons.addIcon} width={'.9em'} />
                Create Tournament
            </Cta>
            <section className="my-8 grid sm:grid-cols-2 gap-6">
                {tournaments.map(tournament => (
                    <TournamentCard key={tournament.id} tournament={tournament} />
                ))}
            </section>
        </main>
    )
}