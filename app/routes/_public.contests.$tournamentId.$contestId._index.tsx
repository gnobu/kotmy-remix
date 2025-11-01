import { LoaderFunctionArgs, json } from "@remix-run/node"
import { useRouteLoaderData } from "@remix-run/react"

import { getTallyLink, registerContestant, voteContestant } from "~/services/contestant/actions.server"
import { setToast } from "~/lib/session.server"
import OngoingContest from "~/components/public/contests/OngoingContest"
import RegisteringContest from "~/components/public/contests/RegisteringContest"
import { StageContestantsLoader } from "./_public.contests.$tournamentId.$contestId"


export async function action({ request }: LoaderFunctionArgs) {
    const formData = await request.formData()
    const intent = formData.get("intent") as "register" | "tally_vote" | "kotmy_vote"
    if (intent === "register") return await registerContestant(formData, request)
    if (intent === "tally_vote") return await getTallyLink(formData, request)
    if (intent === "kotmy_vote") return await voteContestant(formData, request)
    const { headers } = await setToast({ request, toast: `error::This action is not yet supported::${Date.now()}` })
    return json(null, { headers })
}
export type RegisterAction = typeof action

export default function ContestPage() {
    const stageContestants = useRouteLoaderData<StageContestantsLoader>("routes/_public.contests.$tournamentId.$contestId")
    if (!stageContestants) throw new Error("Could not load stage contestants")
    const { contest, stage } = stageContestants
    return (
        <main className="grow">
            {contest.status === "registering"
                ? <RegisteringContest contest={contest} />
                : <OngoingContest contest={contest} stage={stage} />
            }
        </main>
    )
}
