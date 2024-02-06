import { LoaderFunctionArgs, json, redirect } from "@remix-run/node"
import { useLoaderData, useNavigate } from "@remix-run/react"
import { icons } from "~/assets/icons"
import ContestantTable from "~/components/admin/contest/ContestantTable"
import RoundCta from "~/components/reusables/RoundCta"
import { getContestWStages } from "~/lib/data/contest.server"
import { contestants } from "~/lib/data/contestants.server"
import { setToast } from "~/lib/session.server"

export async function loader({ params, request }: LoaderFunctionArgs) {
    const contest = await getContestWStages(params.contestId!)
    if (!contest) {
        const { headers } = await setToast({ request, toast: 'error::The contest does not exist' })
        return redirect('/admin/contests', { headers })
    }
    const stage = contest.stages.find(stage => stage.id === params.stageId)
    if (!stage) {
        const { headers } = await setToast({ request, toast: 'error:: The stage does not exist' })
        return redirect('/admin/contests', { headers })
    }
    return json({ contest, stage, contestants: contestants })
}

export default function StageContestants() {
    const { contest, stage, contestants } = useLoaderData<typeof loader>()
    const navigate = useNavigate()
    return (
        <main className='w-full overflow-y-auto p-6'>
            <div className="flex items-start mb-16 gap-4">
                <RoundCta icon={icons.arrowPrevIcon} className="hover:bg-[#F7F7F8] text-primary" onClick={() => navigate(-1)} />
                <h1 className="text-lg xs:text-xl font-black text-primary capitalize">{contest.name} - Stage {stage.stage} contestants</h1>
            </div>
            <section className='my-12'>
                <ContestantTable data={contestants} />
            </section>
        </main>
    )
}
