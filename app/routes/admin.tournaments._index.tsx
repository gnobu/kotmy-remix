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
    return (
        <main className='w-full overflow-y-auto p-6'>
            <section className="flex justify-between items-center mb-16">
                <h1 className="text-2xl font-black text-primary">Tournaments</h1>
                <Cta element="link" to='add' className="flex gap-2 items-center rounded-lg px-3 py-2">
                    <Svg src={icons.addIcon} width={'.9em'} />
                    Create Tournament
                </Cta>
            </section>
            <section className="my-6 grid grid-cols-2 gap-6">
                {tournaments.map(tournament => (
                    <TournamentCard key={tournament.id} tournament={tournament} />
                ))}
            </section>
        </main>
    )
}