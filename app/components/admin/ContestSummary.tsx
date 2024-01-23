import { ContestWStage } from "~/lib/types/contest.interface"
import Cta from "../reusables/Cta"
import ContestTable from "./contest/ContestTable"

export default function ContestSummary({ contests }: { contests: ContestWStage[] }) {
    return <div className="border rounded-xl overflow-hidden grow">
        <div className="flex gap-2 xs:gap-4 justify-between items-center py-3 px-4 border-b">
            <h3 className="text-primary font-bold max-sm:text-xs">Contests</h3>
            <Cta element="link" to={'/admin/contests'} variant="outline"
                className="border-disabled rounded-lg text-inherit py-1.5 px-3 text-xs font-medium">
                See Contests
            </Cta>
        </div>
        <div className="px-4">
            <ContestTable data={contests} />
        </div>
    </div>
}
