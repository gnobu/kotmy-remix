import { LoaderFunctionArgs, json, redirect } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import OngoingContest from "~/components/public/contests/OngoingContest"
import RegisteringContest from "~/components/public/contests/RegisteringContest"
import { getContest } from "~/lib/data/contest.server"

export async function loader({ params }: LoaderFunctionArgs) {
    const { tournamentId, contestId } = params
    if (!contestId) return redirect(`/contests/${tournamentId}`)
    const contest = await getContest(contestId)
    if (!contest) return redirect(`/contests/${tournamentId}`)
    return json({ contest })
}

export default function ContestPage() {
    const { contest } = useLoaderData<typeof loader>()
    return (
        <main className='grow'>
            {contest.status === 'registering'
                ? <RegisteringContest contest={contest} />
                : <OngoingContest contest={contest} />
            }
        </main>
    )
}
