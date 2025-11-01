import { Link } from "@remix-run/react"

import DeleteTournamentDialog from "./DeleteTournamentDialog"
import LayeredImages from "~/components/reusables/LayeredImages"
import Toggletip from "~/components/reusables/ToggleTip"
import RoundCta from "~/components/reusables/RoundCta"
import Svg from "~/components/reusables/Svg"
import { cn } from "~/lib/utils"
import { icons } from "~/assets/icons"
import { noImage } from "~/assets/images"
import { ITournament } from "~/services/tournament/types/tournament.interface"

export default function TournamentCard({ tournament, className }: { tournament: ITournament, className?: string }) {
    const mainComponent = <RoundCta icon={icons.optionsIcon} className='border-transparent hover:border-disabled' />
    return (
        <aside className={cn('p-6 border border-disabled rounded-xl bg-white shadow overflow-hidden', className)}>
            <div className="flex gap-3 items-start justify-between max-xs:flex-wrap">
                <img src={tournament.image || noImage} alt="children smiling" className="w-24 aspect-square rounded-md object-cover" />
                <div className="self-center grow max-xs:order-1">
                    <h3 className="text-primary font-satoshi-black uppercase line-clamp-1">{tournament.name}</h3>
                    <p className="font-medium text-xs line-clamp-2">{tournament.description}</p>
                </div>
                <Toggletip mainComponent={mainComponent}
                    childContainerClass="top-[110%] right-0 bg-tertiary p-2 border border-disabled text-xs whitespace-nowrap"
                >
                    <Link to={`/admin/tournaments/${tournament.id}/edit`}
                        className='p-2 flex items-center gap-2 hover:bg-[#EEF0FF] rounded-lg font-satoshi-medium'
                    >Edit Tournament</Link>
                    <DeleteTournamentDialog tournament={tournament} />
                </Toggletip>
            </div>
            <hr className='mt-4 mb-1' />
            <span className="text-primary text-sm font-satoshi-bold mb-3">{tournament.contests.length} contests created</span>
            <div className="grid gap-2 xs:flex justify-between items-center">
                <LayeredImages images={tournament.contests} />
                <Link to={`/admin/tournaments/${tournament.id}`} className="flex gap-2 items-center font-semibold hover:text-accent">View Contests <Svg src={icons.arrowNextIcon} /></Link>
            </div>
        </aside>
    )
}
