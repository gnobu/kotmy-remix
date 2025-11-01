import { useFetcher } from "@remix-run/react"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogFooter, DialogHeader, DialogClose } from "~/components/reusables/Dialog"
import Svg from "~/components/reusables/Svg"
import { icons } from "~/assets/icons"
import { ITournament } from "~/services/tournament/types/tournament.interface"

export default function DeleteTournamentDialog({ tournament, disabled }: { tournament: ITournament; disabled?: boolean }) {
    const fetcher = useFetcher()
    return (
        <Dialog>
            <DialogTrigger disabled={disabled} title='Delete tournament'
                className="p-2 flex items-center gap-2 hover:bg-[#EEF0FF] rounded-lg font-satoshi-medium">
                Delete Tournament
            </DialogTrigger>
            <DialogContent className="bg-secondary p-0 gap-0">
                <DialogHeader>
                    <DialogTitle className="p-4 flex gap-3">
                        <div className="size-11 rounded-full bg-orange-100 flex items-center justify-center">
                            <Svg src={icons.questionIcon} />
                        </div>
                        <p>
                            <span className="block">Delete tournament</span>
                            <span className="font-normal text-base text-admin-pry">Confirm the deletion of this tournament</span>
                        </p>
                    </DialogTitle>
                    <DialogDescription className="border-y p-4">
                        <span className="text-primary mb-2 block">Are you sure you want to delete {tournament.name} tournament?</span>
                        <span className="text-admin-pry">This action is irreversible and will permanently delete this tournament.</span>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className='flex justify-end gap-6 p-4'>
                    <fetcher.Form method="post">
                        <input type="hidden" name="tournamentId" value={tournament._id} />
                        <DialogClose type='submit' name="intent" value={'delete'} className='bg-red-500 px-10 py-2 rounded-md font-bold min-w-[90px] text-white'>
                            Proceed
                        </DialogClose>
                    </fetcher.Form>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
