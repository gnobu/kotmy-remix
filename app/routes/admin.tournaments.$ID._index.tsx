import { LoaderFunctionArgs, json, redirect } from '@remix-run/node'
import { Link, useLoaderData, useNavigate } from '@remix-run/react'

import { tournamentRepo } from '~/services/tournament/tournament.server'
import { contestRepo } from '~/services/contest/contest.server'
import { setToast } from '~/lib/session.server'
import ContestTable from '~/components/admin/contest/ContestTable'
import Toggletip from '~/components/reusables/ToggleTip'
import RoundCta from '~/components/reusables/RoundCta'
import Cta from '~/components/reusables/Cta'
import Svg from '~/components/reusables/Svg'
import { icons } from '~/assets/icons'

export async function loader({ params, request }: LoaderFunctionArgs) {
    const { data: tournament, error: tournamentError } = await tournamentRepo.getTournamentById(params.ID!)
    const { data: contests, error: contestError } = await contestRepo.adminGetContestsInTournament(params.ID!)
    if (tournamentError || contestError) {
        let error = tournamentError?.detail ?? contestError?.detail ?? 'An error occured while fetching the contests'
        const { headers } = await setToast({ request, toast: `error::${error}::${Date.now()}` })
        return redirect('/admin/tournaments', { headers })
    }
    return json({ tournament, contests })
}

export default function Tournament() {
    const { tournament, contests } = useLoaderData<typeof loader>()
    const navigate = useNavigate()
    const mainComponent = <RoundCta icon={icons.optionsIcon} className='border-disabled hover:border-primary' />
    return (
        <main className='w-full overflow-y-auto max-xs:p-3 p-6'>
            <div className="flex items-center mb-8 sm:mb-16 gap-4">
                <RoundCta icon={icons.arrowPrevIcon} className="hover:bg-[#F7F7F8] text-primary" onClick={() => navigate(-1)} />
            </div>
            <section className="flex items-start gap-4 sm:gap-6 max-w-xl mx-auto max-xs:text-sm">
                <img src={tournament.image ?? ''} alt="tournament banner" className='max-xs:w-20 w-24 sm:w-[120px] aspect-square object-cover rounded-lg' />
                <div className="flex flex-col gap-4 sm:gap-6 justify-between">
                    <div className="">
                        <h1 className="text-primary font-satoshi-black uppercase line-clamp-1">{tournament.name}</h1>
                        <p className="font-medium text-xs line-clamp-2">{tournament.description}</p>
                    </div>
                    <div className="flex gap-4 sm:gap-6 items-center">
                        <Cta element="link" to={`/admin/contests/add?tournament=${tournament.id}`} variant='outline'
                            className="flex gap-2 items-center rounded-lg px-3 py-2 border-secondary text-primary font-medium hover:border-primary max-xs:text-xs">
                            <Svg src={icons.addIcon} width={'.9em'} />
                            Add Contest
                        </Cta>
                        <Toggletip mainComponent={mainComponent}
                            childContainerClass="top-[120%] max-sm:right-0 sm:left-0 bg-tertiary p-2 border border-disabled text-xs whitespace-nowrap"
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
