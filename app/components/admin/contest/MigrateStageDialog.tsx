import { useFetcher } from "@remix-run/react"

import {
    Dialog, DialogContent, DialogDescription, DialogTitle,
    DialogTrigger, DialogFooter, DialogHeader, DialogClose
} from "~/components/reusables/Dialog"
import { icons } from "~/assets/icons"
import { IContestWStage, IStage } from "~/services/contest/types/contest.interface"
import RoundCta from "~/components/reusables/RoundCta"
import Svg from "~/components/reusables/Svg"

export default function MigrateStageDialog({ contest, disabled }: { contest: IContestWStage; disabled?: boolean }) {
    const fetcher = useFetcher()
    const stages = contest.stages.toSorted((a, b) => a.stage - b.stage).reduce((res, stage, idx, arr) => {
        if (stage.active && !res[0]) {
            res[0] = stage
            res[1] = arr.at(idx + 1) ?? null
        }
        return res
    }, [null, null] as [IStage | null, IStage | null])

    let activeStageIdx = contest.stages.findIndex(v => v.active)
    let activeStageNotTheLastStage = activeStageIdx !== -1 && activeStageIdx < contest.stages.length - 1;

    const cannotMigrate = disabled || !stages.at(0) || !stages.at(1) || !activeStageNotTheLastStage;
    return (
        <Dialog>
            <DialogTrigger asChild>
                <RoundCta disabled={cannotMigrate} icon={icons.doubleArrowRightIcon} className="border-indigo-700 bg-indigo-100 text-indigo-700" title='Migrate stage' />
            </DialogTrigger>
            <DialogContent className="bg-secondary p-0 gap-0">
                <DialogHeader>
                    <DialogTitle className="p-4 flex gap-3">
                        <div className="size-11 rounded-full bg-orange-100 flex items-center justify-center">
                            <Svg src={icons.questionIcon} />
                        </div>
                        <p>
                            <span className="block">Migrate stage</span>
                            <span className="font-normal text-base text-admin-pry">Confirm migration to the next stage</span>
                        </p>
                    </DialogTitle>
                    <DialogDescription className="border-y p-4">
                        <span className="text-primary block">
                            This will migrate all safe contestants from stage {stages[0]?.stage} to stage {stages[1]?.stage}. Proceed?
                        </span>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className='flex justify-end gap-6 p-4'>
                    <fetcher.Form method="post">
                        <input type="hidden" name="from" value={stages[0]?._id} />
                        <input type="hidden" name="to" value={stages[1]?._id} />
                        <DialogClose type="submit" name="intent" value="migrate" className='bg-accent px-10 py-2 rounded-md font-bold min-w-[90px] text-white'>
                            Proceed
                        </DialogClose>
                    </fetcher.Form>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
