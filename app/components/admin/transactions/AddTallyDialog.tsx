import { Form } from "@remix-run/react"
import { icons } from "~/assets/icons"
import Cta from "~/components/reusables/Cta"
import FormControl from "~/components/reusables/FormControl"
import Select from "~/components/reusables/Select"
import Svg from "~/components/reusables/Svg"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/reusables/Dialog"
import { cn } from "~/lib/utils"

export default function AddTallyDialog() {
    return <Dialog>
        <DialogTrigger title='add tally transaction'
            className={cn(`flex items-center justify-center gap-2 rounded-lg px-3 py-2 bg-accent text-secondary`)}>
            <Svg src={icons.addIcon} width={'.9em'} />
            Add Payment
        </DialogTrigger>
        <DialogContent className="bg-secondary">
            <DialogHeader>
                <DialogTitle>Add Tally Transaction</DialogTitle>
                <DialogDescription>
                    <Form method='POST' className='text-primary text-xs flex flex-col gap-4'>
                        <fieldset className="py-4 grid sm:grid-cols-3 gap-3">
                            <FormControl as='input' id='sender' name='sender' labelText='Sender' />
                            <Select label='Contest' name="contest">
                                <option value=''>Select a contest</option>
                                <option value="KOTM01">Kotm01</option>
                            </Select>
                            <FormControl as='input' id='code' name='code' labelText='Code' />
                            <FormControl as='input' type='number' id='vote' name='vote' labelText='Vote' min={0} defaultValue={0} />
                            <FormControl as='input' type='number' id='amount' name='amount' labelText='Amount (NGN)' min={0} defaultValue={0} />
                            <FormControl as='input' type='number' id='fee' name='fee' labelText='Fee (NGN)' min={0} defaultValue={0} />
                        </fieldset>
                        <div className='flex justify-end gap-6'>
                            <Cta element='button' type='submit' className='px-3 py-2 rounded-md font-bold min-w-[90px] text-white'>Submit</Cta>
                        </div>
                    </Form>
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
}
