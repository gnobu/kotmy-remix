import { ActionFunctionArgs, LoaderFunctionArgs, json, redirect } from '@remix-run/node'
import { useActionData, useLoaderData, useNavigate } from '@remix-run/react'
import { icons } from '~/assets/icons'
import EditContestForm from '~/components/admin/tournament/EditContestForm'
import RoundCta from '~/components/reusables/RoundCta'
import { getTournaments } from '~/lib/data/contest.server'
import { setToast } from '~/lib/session.server'
import { contestRepo, prepareContestPayload } from '~/models/contest/contest.server'

export async function loader({ params, request }: LoaderFunctionArgs) {
    const tournaments = await getTournaments()
    const { data: contest, error } = await contestRepo.getContestById(params.contestId!)
    if (error || !contest) {
        console.log(error)
        const { headers } = await setToast({ request, toast: 'error::The contest was not found' })
        return redirect('/admin/contests', { headers })
    }
    return json({ tournaments, contest })
}

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData()
    const intent = formData.get('intent')
    if (intent) {
        const { error } = await contestRepo.deleteStage({ stageId: formData.get('intent') as string })
        if (error) {
            console.log(JSON.stringify(error))
            const { headers } = await setToast({ request, toast: `error::${error.detail}` })
            return json({ error }, { headers })
        }
        return json({ data: 'deleted' })
    }
    const payload = prepareContestPayload(formData)
    const { data, error } = await contestRepo.updateContest({ contestId: formData.get('contestId') as string, dto: payload })
    if (data) {
        const { headers } = await setToast({ request, toast: 'success::The contest has been updated' })
        return redirect('/admin/contests', { headers })
    } else if (error) {
        console.log(JSON.stringify(error))
        const { headers } = await setToast({ request, toast: `error::${error.detail}` })
        return json({ error }, { headers })
    }
    const { headers } = await setToast({ request, toast: `error::Sorry, this contest no longer exists` })
    return redirect('/admin/contests', { headers })
}
export type EditContestAction = typeof action

export default function EditContest() {
    const { tournaments, contest } = useLoaderData<typeof loader>()
    const navigate = useNavigate()
    return (
        <main className='w-full overflow-y-auto p-6'>
            <div className="flex items-center mb-8 sm:mb-16 gap-4">
                <RoundCta icon={icons.arrowPrevIcon} className="hover:bg-[#F7F7F8] text-primary" onClick={() => navigate(-1)} />
                <span className="font-black text-primary">Edit Contest</span>
            </div>
            <EditContestForm contest={contest} tournaments={tournaments} />
        </main>
    )
}
