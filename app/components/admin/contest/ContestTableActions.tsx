import DeleteContestDialog from './DeleteContestDialog'
import RoundCta from '~/components/reusables/RoundCta'
import { IContestWStage } from '~/models/contest/types/contest.interface'
import { icons } from '~/assets/icons'

export default function ContestTableActions({ rowData }: { rowData: IContestWStage }) {
    const activeStageId = rowData.stages.find(stage => stage.active === true || stage.status === 'ONGOING')?.id
    return (
        <div className="flex gap-4 items-center">
            <RoundCta icon={icons.contestantsIcon} element="link" to={`/admin/contests/${rowData.id}/${activeStageId}`} className="border-green-500 bg-green-50 text-green-500" />
            <RoundCta icon={icons.editIcon} element="link" to={`/admin/contests/${rowData.id}`} className="border-[#262626] bg-[#F7F7F8] text-primary" />
            <RoundCta icon={icons.viewIcon} className="border-yellow-700 bg-yellow-100 text-yellow-700" />
            <RoundCta icon={icons.doubleArrowRightIcon} className="border-indigo-700 bg-indigo-100 text-indigo-700" />
            <DeleteContestDialog contest={rowData} />
        </div>
    )
}
