import { icons } from "~/assets/icons"
import { IContest } from "~/services/contest/types/contest.interface"
import { IContestant } from "~/services/contestant/types/contestant.interface"

export default function RegistrationSuccess({ contestant, contest }: { contestant: IContestant, contest: IContest }) {
    const fullName = `${contestant.contestant_biodata.first_name} ${contestant.contestant_biodata.last_name}`
    const formattedDob = new Date(contestant.contestant_biodata.dob).toDateString()
    return (
        <div className='bg-secondary p-10 sm:rounded-3xl flex flex-col max-w-xl gap-10'>
            <aside className="border-2 border-success-700 bg-success-500 rounded-xl p-6 flex items-start gap-4">
                <img src={icons.alertCheckIcon} width={30} height={30} className="mt-1" />
                <p>
                    <span className="block font-bold mb-2">Dear Esteemed Contestant/Guardian</span>
                    <span className="font-medium">
                        Congratulations, {fullName}!
                        Your submission to {contest.name} has been received successfully.
                        Your code is <span className="font-semibold">{contestant.code}</span>.
                    </span>
                </p>
            </aside>
            <div className="grid sm:grid-cols-2 justify-between gap-6 sm:gap-10">
                <img src={contestant.image_url} alt="kid smiling" className="rounded-3xl" />
                <div className="grid gap-1 leading-tight">
                    <p className="">
                        <span className="block font-satoshi-bold">Full Name</span>
                        <span className="block capitalize">{fullName}</span>
                    </p>
                    <p className="">
                        <span className="block font-satoshi-bold">Date of Birth</span>
                        <span className="block">{formattedDob}</span>
                    </p>
                    <p className="">
                        <span className="block font-satoshi-bold">Gender</span>
                        <span className="block capitalize">{contestant.contestant_biodata.sex.toLowerCase()}</span>
                    </p>
                    <p className="min-w-0">
                        <span className="block font-satoshi-bold">Email Address</span>
                        <span className="block truncate ...">{contestant.contestant_biodata.email}</span>
                    </p>
                    <p className="">
                        <span className="block font-satoshi-bold">State of Residence</span>
                        <span className="block capitalize">{contestant.contestant_biodata.state_of_residence}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}
