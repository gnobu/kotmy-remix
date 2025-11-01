import { LoaderFunctionArgs, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import AdminSummary from "~/components/admin/AdminSummary"
import ArticleSummary from "~/components/admin/ArticleSummary"
import ContestSummary from "~/components/admin/ContestSummary"
import TournamentSummary from "~/components/admin/TournamentSummary"
import TransactionSummary from "~/components/admin/TransactionSummary"
import { adminUsers } from "~/lib/data/admin"
import { contestRepo } from "~/services/contest/contest.server"
import { tournamentRepo } from "~/services/tournament/tournament.server"

export async function loader({ }: LoaderFunctionArgs) {
    const { data: contests } = await contestRepo.getContests()
    const { data: tournaments } = await tournamentRepo.getTournaments()
    return json({
        adminUsers: adminUsers,
        tournaments: tournaments ?? [],
        contests: contests ?? [],
        transactions: {
            '2024': { product: 23000, registration: 10000, tally: 42094 },
            '2023': { product: 20000, registration: 9000, tally: 30500 },
            '2022': { product: 17000, registration: 2000, tally: 12000 },
        }
    })
}

export default function Home() {
    const { adminUsers, tournaments, contests, transactions } = useLoaderData<typeof loader>()
    return (
        <main className='w-full overflow-y-auto p-6'>
            <h1 className="grid font-medium text-primary">
                <span className="text-xl sm:text-2xl font-satoshi-bold line-clamp-1">Hello Admin</span>
                <span className="line-clamp-1">Welcome back to KOTMY 👋</span>
            </h1>
            <section className="my-6 grid sm:flex flex-wrap items-start gap-6">
                <AdminSummary users={adminUsers} />
                <ArticleSummary />
                <TournamentSummary tournaments={tournaments} />
                <TransactionSummary data={transactions} />
                <ContestSummary contests={contests} />
            </section>
        </main>
    )
}
