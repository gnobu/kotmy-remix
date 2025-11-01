import Cta from "../reusables/Cta"
import ContestTable from "./contest/ContestTable"
import { Aggregator, AggregatorItem } from "./Aggregator"
import Svg from "../reusables/Svg"
import { icons } from "~/assets/icons"
import { IContestWStage } from "~/services/contest/types/contest.interface"

export default function ContestSummary({ contests }: { contests: IContestWStage[] }) {
    const ongoingCount = contests.filter(contest => contest.status === 'ongoing').length
    const yetToStartCount = contests.filter(contest => contest.status === 'yet_to_start').length
    const closedCount = contests.filter(contest => ['completed', 'registering'].includes(contest.status)).length
    return <div className="border rounded-xl overflow-hidden grow">
        <div className="flex gap-2 xs:gap-4 justify-between items-center py-3 px-4 border-b">
            <h3 className="text-primary font-bold max-sm:text-xs">Contests</h3>
            <Cta element="link" to={'/admin/contests'} variant="outline"
                className="border-disabled rounded-lg text-inherit py-1.5 px-3 text-xs font-medium">
                See Contests
            </Cta>
        </div>
        <div className="px-4">
            <Aggregator className="my-4">
                <AggregatorItem>
                    <span className="bg-tertiary p-2 rounded-full border">
                        <Svg src={icons.adminContestIcon} className="text-primary" />
                    </span>
                    <span className="grid">
                        <span className='text-primary font-satoshi-black'>{contests.length}</span>
                        <span className=''>Contests Created</span>
                    </span>
                </AggregatorItem>
                <AggregatorItem className='flex gap-3 items-center'>
                    <span className="bg-tertiary p-2 rounded-full border">
                        <Svg src={icons.adminContestIcon} className="text-primary" />
                    </span>
                    <span className="grid">
                        <span className='text-primary font-satoshi-black'>{ongoingCount}</span>
                        <span className=''>Ongoing Contests</span>
                    </span>
                </AggregatorItem>
                <AggregatorItem className='flex gap-3 items-center'>
                    <span className="bg-tertiary p-2 rounded-full border">
                        <Svg src={icons.adminContestIcon} className="text-primary" />
                    </span>
                    <span className="grid">
                        <span className='text-primary font-satoshi-black'>{yetToStartCount}</span>
                        <span className=''>Yet To Start Contests</span>
                    </span>
                </AggregatorItem>
                <AggregatorItem className='flex gap-3 items-center'>
                    <span className="bg-tertiary p-2 rounded-full border">
                        <Svg src={icons.adminContestIcon} className="text-primary" />
                    </span>
                    <span className="grid">
                        <span className='text-primary font-satoshi-black'>{closedCount}</span>
                        <span className=''>Closed Contests</span>
                    </span>
                </AggregatorItem>
            </Aggregator>
            <ContestTable data={contests.slice(0, 5)} />
        </div>
    </div>
}
