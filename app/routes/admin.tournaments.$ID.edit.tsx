import { ActionFunctionArgs, LoaderFunctionArgs, json, redirect } from '@remix-run/node'
import { useLoaderData, useNavigate } from '@remix-run/react'
import { icons } from '~/assets/icons'
import EditTournamentForm from '~/components/admin/tournament/EditTournamentForm'
import RoundCta from '~/components/reusables/RoundCta'
import { getTournament } from '~/lib/data/contest.server'
import { setToast } from '~/lib/session.server'
import { tournamentRepo } from '~/models/tournament/tournament.server'

export async function loader({ params, request }: LoaderFunctionArgs) {
    // const tournament = await getTournament(params.ID!)
    const { data: tournament, error } = await tournamentRepo.getTournamentById(params.ID!)
    if (!tournament) {
        const { headers } = await setToast({ request, toast: `error::${error?.detail}` })
        return redirect('/admin/tournaments', { headers })
    }
    return json({ tournament })
}

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData()
    console.log(...formData)
    const { headers } = await setToast({ request, toast: 'success::Tournament has been edited' })
    return redirect('/admin/tournaments', { headers })
}

export default function EditTournament() {
    const { tournament } = useLoaderData<typeof loader>()
    console.log(tournament)
    const navigate = useNavigate()
    return (
        <main className='w-full overflow-y-auto p-6'>
            <div className="flex items-center mb-8 sm:mb-16 gap-4">
                <RoundCta icon={icons.arrowPrevIcon} className="hover:bg-[#F7F7F8] text-primary" onClick={() => navigate(-1)} />
                <span className="font-black text-primary">Edit Tournament</span>
            </div>
            <EditTournamentForm tournament={tournament} />
        </main>
    )
}
