import Cta from "../reusables/Cta"
import TournamentCard from "./tournament/TournamentCard"
import Svg from "../reusables/Svg"
import { icons } from "~/assets/icons"
import { Aggregator, AggregatorItem } from "./Aggregator"
import { ITournament } from "~/services/tournament/types/tournament.interface"

export default function TournamentSummary({ tournaments }: { tournaments: ITournament[] }) {
    const numberOfContests = tournaments.reduce((total, tournament) => (total + tournament.contests.length), 0)
    return <div className="border rounded-xl overflow-hidden grow max-w-2xl">
        <div className="flex gap-2 xs:gap-4 justify-between items-center py-3 px-4 border-b">
            <h3 className="text-primary font-bold max-sm:text-xs">Tournaments</h3>
            <Cta element="link" to={'/admin/tournaments'} variant="outline"
                className="border-disabled rounded-lg text-inherit py-1.5 px-3 text-xs font-medium">
                See Tournaments
            </Cta>
        </div>
        <div className="px-4 grid">
            <Aggregator className="mt-4">
                <AggregatorItem>
                    <span className="bg-tertiary p-2 rounded-full border">
                        <Svg src={icons.adminTournamentIcon} className="text-primary" />
                    </span>
                    <span className="grid">
                        <span className='text-primary font-satoshi-black'>{tournaments.length}</span>
                        <span className=''>Tournaments Created</span>
                    </span>
                </AggregatorItem>
                <AggregatorItem className='flex gap-3 items-center'>
                    <span className="bg-tertiary p-2 rounded-full border">
                        <Svg src={icons.adminContestIcon} className="text-primary" />
                    </span>
                    <span className="grid">
                        <span className='text-primary font-satoshi-black'>{numberOfContests}</span>
                        <span className=''>Contests Created</span>
                    </span>
                </AggregatorItem>
            </Aggregator>
            {tournaments.slice(0, 2).map(tournament => (
                <TournamentCard key={tournament.id} tournament={tournament} className="border-0 shadow-none bg-transparent rounded-none border-b last:border-b-0" />
            ))}
        </div>
    </div>
}
