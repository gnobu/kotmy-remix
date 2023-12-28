import { LoaderFunctionArgs, json, redirect } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import OngoingContest from "~/components/public/contests/OngoingContest"
import RegisteringContest from "~/components/public/contests/RegisteringContest"
import { contests } from "~/lib/data/landingPage.data"

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
            {contest.status === 'registering'
                ? <RegisteringContest contest={contest} />
                : <OngoingContest contest={contest} />
            }
        </main>
    )
}
