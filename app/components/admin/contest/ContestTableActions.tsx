import { useFetcher } from '@remix-run/react'

import DeleteContestDialog from './DeleteContestDialog'
import RoundCta from '~/components/reusables/RoundCta'
import { IContestWStage } from '~/models/contest/types/contest.interface'
import { icons } from '~/assets/icons'

export default function ContestTableActions({ rowData }: { rowData: IContestWStage }) {
    const activeStageId = rowData.stages.find(stage => stage.active === true || stage.status === 'ONGOING')?._id
    const fetcher = useFetcher()
    return (
        <div className="flex gap-4 items-center">
            <RoundCta icon={icons.contestantsIcon} element="link" to={`/admin/contests/${rowData.id}/${activeStageId}`} className="border-green-500 bg-green-50 text-green-500" title='View current stage' />
            <RoundCta icon={icons.editIcon} element="link" to={`/admin/contests/${rowData.id}`} className="border-[#262626] bg-[#F7F7F8] text-primary" title='Edit contest' />
            <fetcher.Form method="post">
                <input type="hidden" name="contestId" value={rowData._id} />
                <RoundCta icon={icons.viewIcon} name='intent' value={'toggle_registration'} className="border-yellow-700 bg-yellow-100 text-yellow-700" title='Open/Close registration' />
            </fetcher.Form>
            <RoundCta icon={icons.doubleArrowRightIcon} className="border-indigo-700 bg-indigo-100 text-indigo-700" title='Migrate stage' />
            <DeleteContestDialog contest={rowData} />
        </div>
    )
}
