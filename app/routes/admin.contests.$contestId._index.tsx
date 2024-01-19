import { ActionFunctionArgs, LoaderFunctionArgs, json, redirect } from '@remix-run/node'
import { useLoaderData, useNavigate } from '@remix-run/react'
import { icons } from '~/assets/icons'
import EditContestForm from '~/components/admin/tournament/EditContestForm'
import RoundCta from '~/components/reusables/RoundCta'
import { getContestWStages, getTournaments } from '~/lib/data/contest.server'
import { setToast } from '~/lib/session.server'

export async function loader({ params, request }: LoaderFunctionArgs) {
    const tournaments = await getTournaments()
    const contest = await getContestWStages(params.contestId!)
    if (!contest) {
        const { headers } = await setToast({ request, toast: 'error::The contest was not found' })
        return redirect('/admin/contests', { headers })
    }
    return json({ tournaments, contest })
}

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData()
    console.log(...formData)
    console.log(formData.getAll('category'))
    const { headers } = await setToast({ request, toast: 'success::The contest has been updated' })
    return redirect('/admin/contests', { headers })
}

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
