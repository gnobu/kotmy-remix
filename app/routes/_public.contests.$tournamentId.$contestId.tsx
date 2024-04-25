import { LoaderFunctionArgs, json, redirect } from "@remix-run/node"
import { Outlet } from "@remix-run/react"

import { contestRepo } from "~/models/contest/contest.server"

export async function loader({ params, request }: LoaderFunctionArgs) {
    const { tournamentId, contestId } = params
    if (!contestId) return redirect(`/contests/${tournamentId}`)
    const { data: contest, error } = await contestRepo.getContestById(contestId)
    if (error) return redirect(`/contests/${tournamentId}`)

    if (contest.status === 'registering') return json({ contest, stage: null })

    const url = new URL(request.url)
    const stageQ = url.searchParams.get("stage")
    const stageId = (stageQ
        ? contest.stages.find(stage => stage.stage == +stageQ)?._id
        : contest.stages.find(stage => stage.active)?._id
    ) ?? contest.stages.find(stage => stage.stage == 1)?._id
    const stage = stageId ? (await contestRepo.getContestantsInStage({ stageId })).data ?? null : null
    return json({ contest, stage })
}
export type StageContestantsLoader = typeof loader


export default function ContestLayout() {
    return (<Outlet />)
}
