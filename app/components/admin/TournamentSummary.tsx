import { TournamentWContest } from "~/lib/types/contest.interface"
import Cta from "../reusables/Cta"
import TournamentCard from "./tournament/TournamentCard"

export default function TournamentSummary({ tournaments }: { tournaments: TournamentWContest[] }) {
    return <div className="border rounded-xl overflow-hidden grow max-w-2xl">
        <div className="flex gap-2 xs:gap-4 justify-between items-center py-3 px-4 border-b">
            <h3 className="text-primary font-bold max-sm:text-xs">Tournaments</h3>
            <Cta element="link" to={'/admin/tournaments'} variant="outline"
                className="border-disabled rounded-lg text-inherit py-1.5 px-3 text-xs font-medium">
                See Tournaments
            </Cta>
        </div>
        <div className="px-4 grid">
            {tournaments.map(tournament => (
                <TournamentCard key={tournament.id} tournament={tournament} className="border-0 shadow-none bg-transparent rounded-none border-b last:border-b-0" />
            ))}
        </div>
    </div>
}
