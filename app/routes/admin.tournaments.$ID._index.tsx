import { LoaderFunctionArgs, json, redirect } from '@remix-run/node'
import { Link, useLoaderData, useNavigate } from '@remix-run/react'
import { icons } from '~/assets/icons'
import ContestTable from '~/components/admin/contest/ContestTable'
import Cta from '~/components/reusables/Cta'
import RoundCta from '~/components/reusables/RoundCta'
import Svg from '~/components/reusables/Svg'
import Toggletip from '~/components/reusables/ToggleTip'
import { getContestsInTournamentWStages, getTournament } from '~/lib/data/contest.server'
import { setToast } from '~/lib/session.server'

export async function loader({ params, request }: LoaderFunctionArgs) {
    const tournament = await getTournament(params.ID!)
    const contests = await getContestsInTournamentWStages(params.ID!)
    if (!tournament) {
        const { headers } = await setToast({ request, toast: 'error::Tournament not found' })
        return redirect('/admin/tournaments', { headers })
    }
    return json({ tournament, contests })
}

export default function Tournament() {
    const { tournament, contests } = useLoaderData<typeof loader>()
    const navigate = useNavigate()
    const mainComponent = <RoundCta icon={icons.optionsIcon} className='border-disabled hover:border-primary' />
    return (
        <main className='w-full overflow-y-auto p-6'>
            <div className="flex items-center mb-16 gap-4">
                <RoundCta icon={icons.arrowPrevIcon} className="hover:bg-[#F7F7F8] text-primary" onClick={() => navigate(-1)} />
            </div>
            <section className="flex gap-6 max-w-xl mx-auto">
                <img src={tournament.image} alt="tournament banner" className='w-[120px] aspect-square object-cover rounded-lg' />
                <div className="flex flex-col gap-6 justify-between">
                    <div className="">
                        <h1 className="text-primary font-satoshi-black uppercase line-clamp-1">{tournament.title}</h1>
                        <p className="font-medium text-xs line-clamp-2">{tournament.description}</p>
                    </div>
                    <div className="flex gap-6 items-center">
                        <Cta element="link" to='/admin/contests/add' variant='outline'
                            className="flex gap-2 items-center rounded-lg px-3 py-2 border-secondary text-primary font-medium hover:border-primary">
                            <Svg src={icons.addIcon} width={'.9em'} />
                            Add Contest
                        </Cta>
                        <Toggletip mainComponent={mainComponent}
                            childContainerClass="top-[120%] left-0 bg-tertiary p-2 border border-disabled text-xs whitespace-nowrap"
                        >
                            <Link to={`edit`}
                                className='p-2 flex items-center gap-2 hover:bg-[#EEF0FF] rounded-lg font-satoshi-medium'
                            >Edit Tournament</Link>
                            <button className="p-2 flex items-center gap-2 hover:bg-[#EEF0FF] rounded-lg font-satoshi-medium"
                            >Delete Tournament</button>
                        </Toggletip>
                    </div>
                </div>
            </section>
            <section className='my-12'>
                <ContestTable data={contests} />
            </section>
        </main>
    )
}
