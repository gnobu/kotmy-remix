import { LoaderFunctionArgs, json, redirect } from "@remix-run/node"
import { Outlet } from "@remix-run/react"

import { contestRepo } from "~/services/contest/contest.server"
import { getFingerprint, setToast } from "~/lib/session.server"
import { callTallyWebhook } from "~/services/contestant/actions.server"

export async function loader({ params, request }: LoaderFunctionArgs) {
    const { tournamentId, contestId } = params
    if (!contestId) return redirect(`/contests/${tournamentId}`)

    const url = new URL(request.url)
    // Process transaction response
    const tx_status = url.searchParams.get("status")
    const tx_ref = url.searchParams.get("tx_ref")
    if (tx_status && tx_ref) {
        // call the webhook
        await callTallyWebhook(tx_ref)
        // create toast
        const toast = tx_status === "completed"
            ? `success::Your payment has been received. Your vote will reflect shortly.::${Date.now()}` as const
            : `error::There seems to be an issue with your payment. Please try again later.::${Date.now()}` as const
        const { headers } = await setToast({ request, toast })
        // clear other query strings and show success toast
        url.searchParams.delete('status')
        url.searchParams.delete('tx_ref')
        url.searchParams.delete('transaction_id')
        console.log("Redirecting to:", `${url.pathname}?${url.searchParams.toString()}`)
        throw redirect(`${url.pathname}?${url.searchParams.toString()}`, { headers })
    }

    const { data: contest, error } = await contestRepo.getContestById(contestId)
    if (error) return redirect(`/contests/${tournamentId}`)
    if (contest.status === 'registering') return json({ contest, stage: null, baseUrl: process.env._BASE_URL })

    const stageQ = url.searchParams.get("stage")
    const stageId = (stageQ
        ? contest.stages.find(stage => stage.stage == +stageQ)?._id
        : contest.stages.find(stage => stage.active)?._id
    ) ?? contest.stages.find(stage => stage.stage == 1)?._id
    const { fingerprint, headers } = await getFingerprint({ request })
    const stage = stageId ? (await contestRepo.getContestantsInStage(stageId, { fingerprint })).data ?? null : null

    return json({ contest, stage, baseUrl: process.env._BASE_URL }, { headers })
}
export type StageContestantsLoader = typeof loader


export default function ContestLayout() {
    return (<Outlet />)
}
