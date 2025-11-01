import { useFetcher } from '@remix-run/react'

import DeleteContestDialog from './DeleteContestDialog'
import RoundCta from '~/components/reusables/RoundCta'
import { IContestWStage } from '~/services/contest/types/contest.interface'
import { icons } from '~/assets/icons'
import MigrateStageDialog from './MigrateStageDialog'

export default function ContestTableActions({ rowData }: { rowData: IContestWStage }) {
    const activeStageId = rowData.stages.find(stage => stage.active || stage.status === 'ongoing')?._id
        ?? rowData.stages.toSorted((prev, next) => next.stage - prev.stage).find(stage => stage.status === 'completed')?._id
        ?? rowData.stages.toSorted((prev, next) => prev.stage - next.stage).at(0)?._id
    const linkToContestants = activeStageId ? `/admin/contests/${rowData.id}/${activeStageId}` : ''
    const fetcher = useFetcher()
    return (
        <div className="flex gap-4 items-center">
            <RoundCta icon={icons.contestantsIcon} element="link" to={linkToContestants} aria-disabled={!linkToContestants} className="border-green-500 bg-green-50 text-green-500" title='View current stage' />
            <RoundCta icon={icons.editIcon} element="link" to={`/admin/contests/${rowData.id}`} className="border-[#262626] bg-[#F7F7F8] text-primary" title='Edit contest' />
            <fetcher.Form method="post">
                <input type="hidden" name="contestId" value={rowData._id} />
                <RoundCta icon={icons.viewIcon} name='intent' value={'toggle_registration'} className="border-yellow-700 bg-yellow-100 text-yellow-700" aria-disabled={fetcher.state != 'idle'} title='Open/Close registration' />
            </fetcher.Form>
            <MigrateStageDialog contest={rowData} />
            <DeleteContestDialog contest={rowData} />
        </div>
    )
}
