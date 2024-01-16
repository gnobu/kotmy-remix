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
} from "~/components/ui/dialog"
import { cn } from "~/lib/utils"

export default function EditContestantDialog({ disabled }: { disabled: boolean }) {
    return (
        <Dialog>
            <DialogTrigger disabled={disabled} title='Edit contestant'
                className={cn(`flex items-center justify-center border min-w-[32px] min-h-[32px] rounded-full border-[#262626] bg-[#F7F7F8] text-primary`, {
                    'bg-slate-100 border-slate-400 text-slate-400 cursor-not-allowed': disabled
                })}>
                <Svg src={icons.editIcon} className='w-3' />
            </DialogTrigger>
            <DialogContent className="bg-secondary">
                <DialogHeader>
                    <DialogTitle>Edit Contestant Data</DialogTitle>
                    <DialogDescription>
                        <Form method='POST' className='text-primary text-xs flex flex-col gap-4'>
                            <fieldset className="py-4 grid grid-cols-2 gap-3">
                                <FormControl as='input' id='full_name' name='full_name' labelText='Full Name' /> {/*defaultValue={selectedStage?.weight} /> */}
                                <FormControl as='input' id='email' name='email' labelText='Email Address' />
                                <FormControl as='input' labelText='State of Residence' id='state' name='state' />
                                <FormControl as='input' labelText='Code' id='code' name='code' />
                                <FormControl as='input' type='date' labelText='Date of Birth' id='dob' name='dob' max={new Date().toISOString().split("T")[0]} />
                                <Select label='Gender'>
                                    <option value=''>Gender</option>
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                </Select>
                            </fieldset>
                            <fieldset className="pt-2 py-4 grid grid-cols-3 gap-3">
                                <FormControl as='input' id='social_media_vote' name='social_media_vote' labelText='Social Media Vote' type='number' min={0} /> {/* defaultValue={selectedStage?.rates.social_media.amount} />*/}
                                <FormControl as='input' id='tally_vote' name='tally_vote' labelText='Tally Vote' type='number' min={0} /> {/* defaultValue={selectedStage?.rates.tally} />*/}
                                <FormControl as='input' id='givaah_vote' name='givaah_vote' labelText='Givaah Vote' type='number' min={0} /> {/* defaultValue={selectedStage?.rates.givaah} />*/}
                                <FormControl as='input' id='stage_bonus' name='stage_bonus' labelText='Stage Bonus' type='number' min={0} /> {/* defaultValue={selectedStage?.rates.judge} />*/}
                                <FormControl as='input' id='judge_vote' name='judge_vote' labelText='Judge Vote' type='number' min={0} /> {/* defaultValue={selectedStage?.rates.judge} />*/}
                                <FormControl as='input' labelText='Grade' id='grade' name='grade' disabled />
                            </fieldset>

                            <div className='flex justify-end gap-6'>
                                <Cta element='button' type='reset' variant='outline'
                                    className='px-3 py-2 rounded-md font-bold min-w-[90px] border-secondary hover:border-slate-400 text-primary'>Reset</Cta>
                                <Cta element='button' type='submit' className='px-3 py-2 rounded-md font-bold min-w-[90px] text-white'>Submit</Cta>
                            </div>
                        </Form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
