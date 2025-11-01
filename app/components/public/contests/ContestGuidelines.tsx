import StatusTag from "../../reusables/StatusTag"
import { IContest } from "~/services/contest/types/contest.interface"

export default function ContestGuidelines({ contest }: { contest: IContest }) {
    return (
        <div className='wrapper sm:max-w-lg sm:mx-0'>
            <div className="mb-6">
                <span className="block font-satoshi-bold mb-1">Status</span>
                <StatusTag status={'registering'} color="yellow" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 my-8">
                <div className="">
                    <span className="block font-satoshi-bold mb-1">Age Categories</span>
                    <div className="flex flex-wrap gap-x-4 capitalize">
                        {contest.categories.map(category => (<span key={category}>~ {category}</span>))}
                    </div>
                </div>
                <div className="">
                    <span className="block font-satoshi-bold mb-1">Submission Guideline</span>
                    <span className="block">{contest.sub_req}</span>
                </div>
                <div className="">
                    <span className="block font-satoshi-bold mb-1">Submission Deadline</span>
                    <span className="block">All entries must be submitted by {
                        new Date(contest.reg_deadline).toLocaleString('en-US', { timeStyle: 'short', dateStyle: "long" })
                    }.</span>
                </div>
                <div className="">
                    <span className="block font-satoshi-bold mb-1">Prizes</span>
                    <span className="block">{contest.prizes}</span>
                </div>
            </div>
            <div className="flex flex-col gap-2 my-8">
                <span className="font-satoshi-bold">Terms & Conditions</span>
                {contest.terms_cond}
            </div>
            <div className="flex flex-col gap-2 my-8">
                <span className="font-satoshi-bold">Additional Notes</span>
                {contest.add_info}
            </div>
        </div>
    )
}
