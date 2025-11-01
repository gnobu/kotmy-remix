import { ActionFunctionArgs, LoaderFunctionArgs, json, redirect } from '@remix-run/node'
import { useLoaderData, useNavigate } from '@remix-run/react'

import { setToast } from '~/lib/session.server'
import { tournamentRepo } from '~/services/tournament/tournament.server'
import { contestRepo, prepareContestPayload } from '~/services/contest/contest.server'
import CreateContestForm from '~/components/admin/tournament/CreateContestForm'
import RoundCta from '~/components/reusables/RoundCta'
import { icons } from '~/assets/icons'

export async function loader({ }: LoaderFunctionArgs) {
    const { data: tournaments = [] } = await tournamentRepo.getTournaments()
    return json({ tournaments })
}

export async function action({ request }: ActionFunctionArgs) {
    const payload = prepareContestPayload(await request.formData())
    const { data, error } = await contestRepo.createContest(payload)
    if (data) {
        const { headers } = await setToast({ request, toast: `success::A new contest has been created::${Date.now()}` })
        return redirect('/admin/contests', { headers })
    }
    const { headers } = await setToast({ request, toast: `error::${error.detail}::${Date.now()}` })
    return json(null, { headers })
}

export default function AddContest() {
    const { tournaments } = useLoaderData<typeof loader>()
    const navigate = useNavigate()
    return (
        <main className='w-full overflow-y-auto p-6'>
            <div className="flex items-center mb-10 sm:mb-16 gap-4">
                <RoundCta icon={icons.arrowPrevIcon} className="hover:bg-[#F7F7F8] text-primary" onClick={() => navigate(-1)} />
                <span className="font-black text-primary">Create Contest</span>
            </div>
            <CreateContestForm tournaments={tournaments} />
        </main>
    )
}
