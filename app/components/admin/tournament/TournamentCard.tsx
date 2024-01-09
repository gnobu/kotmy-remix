import { Link } from "@remix-run/react"
import { icons } from "~/assets/icons"
import LayeredImages from "~/components/reusables/LayeredImages"
import RoundCta from "~/components/reusables/RoundCta"
import Svg from "~/components/reusables/Svg"
import { TournamentWContest } from "~/lib/types/contest.interface"

export default function TournamentCard({ tournament }: { tournament: TournamentWContest }) {
    return (
        <aside className='p-6 border border-disabled rounded-xl bg-white shadow'>
            <div className="flex gap-3">
                <img src={tournament.image} alt="children smiling" className="w-24 aspect-square rounded-md object-cover" />
                <div className="self-center grow">
                    <h3 className="text-primary font-satoshi-black uppercase line-clamp-1">{tournament.title}</h3>
                    <p className="font-medium text-xs line-clamp-2">{tournament.description}</p>
                </div>
                <RoundCta icon={icons.optionsIcon} className='border-0 hover:outline outline-primary outline-1' />
            </div>
            <hr className='my-5' />
            <span className="text-primary text-sm font-satoshi-bold mb-3">{tournament.contests.length} contests created</span>
            <div className="flex justify-between items-center">
                <LayeredImages images={tournament.contests} />
                <Link to={tournament.id} className="flex gap-2 items-center font-semibold hover:text-accent">View Contests <Svg src={icons.arrowNextIcon} /></Link>
            </div>
        </aside>
    )
}
