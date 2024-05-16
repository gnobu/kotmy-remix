import { useFetcher } from "@remix-run/react"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/reusables/Dialog"
import { cn } from "~/lib/utils"
import { icons } from "~/assets/icons"
import Svg from "~/components/reusables/Svg"
import { IContestant } from "~/models/contestant/types/contestant.interface"

export default function AdmitContestantDialog({ disabled, contestants }: { disabled: boolean, contestants: IContestant[] }) {
    const fetcher = useFetcher()
    const ids = contestants.map(contestant => contestant._id).join('|')
    return (
        <Dialog>
            <DialogTrigger disabled={disabled} title='Admit contestants'
                className={cn(`flex items-center justify-center border min-w-[32px] min-h-[32px] rounded-full border-green-500 bg-green-50 text-green-500`, {
                    'bg-slate-100 border-slate-400 text-slate-400 cursor-not-allowed': disabled
                })}>
                <Svg src={icons.upArrowIcon} className='size-3.5' />
            </DialogTrigger>
            <DialogContent className="bg-secondary p-0 gap-0">
                <DialogHeader>
                    <DialogTitle className="p-4 flex gap-3">
                        <div className="size-11 rounded-full bg-orange-100 flex items-center justify-center">
                            <Svg src={icons.questionIcon} />
                        </div>
                        <p>
                            <span className="block">Admit Contestants</span>
                            <span className="font-normal text-base text-admin-pry">Confirm the promotion of these contestants</span>
                        </p>
                    </DialogTitle>
                    <DialogDescription className="border-y p-4">
                        <span className="text-primary mb-2 block">The selected contestants will be marked for promotion to the next stage.</span>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className='flex justify-end gap-6 p-4'>
                    <fetcher.Form method="post">
                        <input type="hidden" name="contestants_ids" value={ids} />
                        <input type="hidden" name="stage_id" value={contestants[0]?.stage_id} />
                        <DialogClose type='submit' name="intent" value='admit' className='bg-accent px-10 py-2 rounded-md font-bold min-w-[90px] text-white'>
                            Proceed
                        </DialogClose>
                    </fetcher.Form>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
