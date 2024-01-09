import { ActionFunctionArgs, redirect } from '@remix-run/node'
import { useNavigate } from '@remix-run/react'
import { icons } from '~/assets/icons'
import CreateTournamentForm from '~/components/admin/tournament/CreateTournamentForm'
import RoundCta from '~/components/reusables/RoundCta'
import { setToast } from '~/lib/session.server'

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData()
    console.log(...formData)
    const { headers } = await setToast({ request, toast: 'success::A new tournament has been created' })
    return redirect('/admin/tournaments', { headers })
}

export default function AddTournament() {
    const navigate = useNavigate()
    return (
        <main className='w-full overflow-y-auto p-6'>
            <div className="flex items-center mb-16 gap-4">
                <RoundCta icon={icons.arrowPrevIcon} className="hover:bg-[#F7F7F8] text-primary" onClick={() => navigate(-1)} />
                <span className="font-black text-primary">Create Tournament</span>
            </div>
            <CreateTournamentForm />
        </main>
    )
}
