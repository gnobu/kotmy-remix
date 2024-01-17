import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "~/components/reusables/Dialog"
import { icons } from "~/assets/icons"
import Cta from "~/components/reusables/Cta"
import { DialogFooter, DialogHeader } from "~/components/reusables/Dialog"
import Svg from "~/components/reusables/Svg"
import { cn } from "~/lib/utils"

export default function RevokeTransactionDialog({ disabled }: { disabled: boolean }) {
    return <Dialog>
        <DialogTrigger disabled={disabled} title='Revoke transaction'
            className={cn(`flex items-center justify-center border min-w-[32px] min-h-[32px] rounded-full border-red-500 bg-red-50 text-red-500`, {
                'bg-slate-100 border-slate-400 text-slate-400 cursor-not-allowed': disabled
            })}>
            <Svg src={icons.doubleArrowDiagonalIcon} className='w-3' />
        </DialogTrigger>
        <DialogContent className="bg-secondary">
            <DialogHeader>
                <DialogTitle>Revoke this transaction</DialogTitle>
                <DialogDescription>
                    This transactoin will be marked as revoked. Are you sure you want to proceed?
                </DialogDescription>
            </DialogHeader>
            <DialogFooter className='flex justify-end gap-6'>
                <Cta element='button' type='submit' kind="danger" className='px-3 py-2 rounded-md font-bold min-w-[90px] text-white'>Proceed</Cta>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}
