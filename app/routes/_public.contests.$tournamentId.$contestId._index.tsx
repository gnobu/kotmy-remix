import { LoaderFunctionArgs, json } from "@remix-run/node"
import { useRouteLoaderData } from "@remix-run/react"

import { setToast } from "~/lib/session.server"
import { contestantRepo } from "~/models/contestant/contestant.server"
import OngoingContest from "~/components/public/contests/OngoingContest"
import RegisteringContest from "~/components/public/contests/RegisteringContest"
import { StageContestantsLoader } from "./_public.contests.$tournamentId.$contestId"


export async function action({ request }: LoaderFunctionArgs) {
    const formData = await request.formData()
    const contestId = formData.get('contestId') as string
    const { data, error } = await contestantRepo.registerContestant({ contestId, dto: formData })
    if (error) {
        const { headers } = await setToast({ request, toast: `error::${error.detail ?? 'Error registering the contestant'}` })
        return json({ data: null }, { headers })
    }
    return json({ data })
}
export type RegisterAction = typeof action

export default function ContestPage() {
    const stageContestants = useRouteLoaderData<StageContestantsLoader>("routes/_public.contests.$tournamentId.$contestId")
    if (!stageContestants) throw new Error("Could not load stage contestants")
    const { contest, stage } = stageContestants
    return (
        <main className='grow'>
            {contest.status === 'registering'
                ? <RegisteringContest contest={contest} />
                : <OngoingContest contest={contest} stage={stage} />
            }
        </main>
    )
}
