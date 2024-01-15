import { icons } from '~/assets/icons'
import RoundCta from '~/components/reusables/RoundCta'
import { Contest } from '~/lib/types/contest.interface'

export default function ContestTableActions({ rowData }: { rowData: Contest }) {
    return (
        <div className="flex gap-4 items-center">
            <RoundCta icon={icons.contestantsIcon} element="link" to={'.'} className="border-green-500 bg-green-50 text-green-500" />
            <RoundCta icon={icons.editIcon} element="link" to={`${rowData.contestId}`} className="border-[#262626] bg-[#F7F7F8] text-primary" />
            <RoundCta icon={icons.viewIcon} className="border-yellow-700 bg-yellow-100 text-yellow-700" />
            <RoundCta icon={icons.doubleArrowRightIcon} className="border-indigo-700 bg-indigo-100 text-indigo-700" />
            <RoundCta icon={icons.trashIcon} className="border-red-500 bg-red-50 text-red-500" />
        </div>
    )
}
