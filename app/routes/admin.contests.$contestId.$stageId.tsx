import { LoaderFunctionArgs, json, redirect } from "@remix-run/node"
import { useLoaderData, useNavigate } from "@remix-run/react"

import { contestRepo } from "~/models/contest/contest.server"
import { setToast } from "~/lib/session.server"
import { icons } from "~/assets/icons"
import ContestantTable from "~/components/admin/contest/ContestantTable"
import RoundCta from "~/components/reusables/RoundCta"
import { editContestant } from "~/models/contestant/actions.server"

export async function loader({ params, request }: LoaderFunctionArgs) {
    const { contestId, stageId } = params
    const { data: contest, error } = await contestRepo.getContestById(contestId!)
    if (error) {
        const { headers } = await setToast({ request, toast: 'error::Error fetching the contest' })
        return redirect('/admin/contests', { headers })
    }
    const { data: stage } = await contestRepo.getContestantsInStage({ stageId: stageId! })
    if (!stage) {
        const { headers } = await setToast({ request, toast: 'error::Error fetching the contestants' })
        return redirect('/admin/contests', { headers })
    }
    return json({ contest, stage })
}
export type StageContestantsLoader = typeof loader

export async function action({ params, request }: LoaderFunctionArgs) {
    const { contestId, stageId } = params
    const formData = await request.formData()
    const intent = formData.get('intent') as 'delete' | 'edit' | 'admit' | 'evict'
    if (intent === 'edit') {
        return await editContestant({
            dto: formData,
            contestantId: formData.get('contestant_id') as string
        }, request)
    }
    // if (intent === 'delete') return await deleteContest(formData, request)
    // if (intent === 'admit') return await toggleRegistration(formData, request)
    // if (intent === 'evict') return await toggleRegistration(formData, request)
    console.log(...formData)
    const { headers } = await setToast({ request, toast: 'error::This action is not yet supported' })
    return json(null, { headers })
}

export default function StageContestants() {
    const { contest, stage } = useLoaderData<typeof loader>()
    const navigate = useNavigate()
    return (
        <main className='w-full overflow-y-auto p-6'>
            <div className="flex items-start mb-16 gap-4">
                <RoundCta icon={icons.arrowPrevIcon} className="hover:bg-[#F7F7F8] text-primary" onClick={() => navigate(-1)} />
                <h1 className="text-lg xs:text-xl font-black text-primary capitalize">{contest.name} - Stage {stage.stage} contestants</h1>
            </div>
            <section className='my-12'>
                <ContestantTable data={stage.contestants} />
            </section>
        </main>
    )
}
