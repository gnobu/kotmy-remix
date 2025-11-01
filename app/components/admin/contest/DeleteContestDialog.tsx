import { useFetcher } from "@remix-run/react"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogFooter, DialogHeader, DialogClose } from "~/components/reusables/Dialog"
import Svg from "~/components/reusables/Svg"
import { icons } from "~/assets/icons"
import { cn } from "~/lib/utils"
import { IContestWStage } from "~/services/contest/types/contest.interface"

export default function DeleteContestDialog({ contest, disabled }: { contest: IContestWStage; disabled?: boolean }) {
    const fetcher = useFetcher()
    return (
        <Dialog>
            <DialogTrigger disabled={disabled} title='Delete contest'
                className={cn(`flex items-center justify-center border min-w-[32px] min-h-[32px] rounded-full border-red-500 bg-red-50 text-red-500`, {
                    'bg-slate-100 border-slate-400 text-slate-400 cursor-not-allowed': disabled
                })}>
                <Svg src={icons.trashIcon} className='w-3' />
            </DialogTrigger>
            <DialogContent className="bg-secondary p-0 gap-0">
                <DialogHeader>
                    <DialogTitle className="p-4 flex gap-3">
                        <div className="size-11 rounded-full bg-orange-100 flex items-center justify-center">
                            <Svg src={icons.questionIcon} />
                        </div>
                        <p>
                            <span className="block">Delete contest</span>
                            <span className="font-normal text-base text-admin-pry">Confirm the deletion of this contest</span>
                        </p>
                    </DialogTitle>
                    <DialogDescription className="border-y p-4">
                        <span className="text-primary mb-2 block">Are you sure you want to delete {contest.name} contest?</span>
                        <span className="text-admin-pry">This action is irreversible and will permanently delete this contest.</span>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className='flex justify-end gap-6 p-4'>
                    <fetcher.Form method="post">
                        <input type="hidden" name="contestId" value={contest._id} />
                        <DialogClose type='submit' name="intent" value={'delete'} className='bg-red-500 px-10 py-2 rounded-md font-bold min-w-[90px] text-white'>
                            Proceed
                        </DialogClose>
                    </fetcher.Form>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
