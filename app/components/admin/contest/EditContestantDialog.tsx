import { Form, useLoaderData } from "@remix-run/react"

import FormControl from "~/components/reusables/FormControl"
import {
    Dialog, DialogContent, DialogDescription,
    DialogHeader, DialogTitle, DialogTrigger
} from "~/components/reusables/Dialog"
import {
    Select, SelectContent, SelectItem,
    SelectTrigger, SelectValue
} from "~/components/reusables/select-shad"
import Cta from "~/components/reusables/Cta"
import Svg from "~/components/reusables/Svg"
import { icons } from "~/assets/icons"
import { cn } from "~/lib/utils"
import { IContestant } from "~/models/contestant/types/contestant.interface"
import { parseDateForInput } from "~/lib/dates.utils"
import { StageContestantsLoader } from "~/routes/admin.contests.$contestId.$stageId"
import { nigerianStates } from "~/lib/data/states"

export default function EditContestantDialog({ disabled, contestant }: { disabled: boolean, contestant: IContestant }) {
    const { stage } = useLoaderData<StageContestantsLoader>()
    const isKotmy = stage.rates.social_media.type === 'kotmy'
    return (
        <Dialog>
            <DialogTrigger disabled={disabled} title='Edit contestant'
                className={cn(`flex items-center justify-center border min-w-[32px] min-h-[32px] rounded-full border-[#262626] bg-[#F7F7F8] text-primary`, {
                    'bg-slate-100 border-slate-400 text-slate-400 cursor-not-allowed': disabled
                })}>
                <Svg src={icons.editIcon} className='w-3' />
            </DialogTrigger>
            {!disabled
                ? <DialogContent className="bg-secondary">
                    <DialogHeader>
                        <DialogTitle>Edit Contestant Data</DialogTitle>
                        <DialogDescription>
                            <Form method='POST' className='text-primary text-xs flex flex-col gap-4 mt-3'>
                                <fieldset className="py-1 grid grid-cols-2 gap-3">
                                    <legend className="text-gray-400 font-medium">Biodata</legend>
                                    <FormControl as='input' id='first_name' name='first_name' labelText='First Name' defaultValue={contestant.contestant_biodata.first_name} />
                                    <FormControl as='input' id='last_name' name='last_name' labelText='Last Name' defaultValue={contestant.contestant_biodata.last_name} />
                                    <FormControl as='input' id='email' name='email' labelText='Email Address' defaultValue={contestant.contestant_biodata.email} />
                                    <label htmlFor="gender" className='font-bold flex flex-col'>State of Residence
                                        <Select name='state' required defaultValue={contestant.contestant_biodata.state_of_residence}>
                                            <SelectTrigger className="h-10 font-normal rounded-lg shadow-none hover:border-accent">
                                                <SelectValue placeholder={"State"} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.entries(nigerianStates).map(([key, label])=>(
                                                    <SelectItem key={key} value={key} className='focus:bg-blue-700/25'>{label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </label>
                                    <FormControl as='input' type='date' labelText='Date of Birth' id='dob' name='dob' defaultValue={parseDateForInput(contestant.contestant_biodata.dob)} max={new Date().toISOString().split("T")[0]} />
                                    <label htmlFor="gender" className='font-bold flex flex-col'>Gender
                                        <Select name='sex' required defaultValue={contestant.contestant_biodata.sex}>
                                            <SelectTrigger className="h-10 font-normal rounded-lg shadow-none hover:border-accent">
                                                <SelectValue placeholder={"Gender"} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value={'MALE'} className='focus:bg-blue-700/25'>Male</SelectItem>
                                                <SelectItem value={'FEMALE'} className='focus:bg-blue-700/25'>Female</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </label>
                                </fieldset>
                                <fieldset className="py-1 grid grid-cols-2 gap-3">
                                    <legend className="text-gray-400 font-medium">Voting</legend>
                                    <FormControl as='input' id='social_media_url' name='social_media_url' labelText='Social Media Link' defaultValue={contestant.social_media_url} disabled={isKotmy} />
                                    <FormControl as='input' id='social_media_vote' name='social_media_vote' labelText='Social Media Vote' type='number' min={0} defaultValue={contestant?.vote.social_media} />
                                    <FormControl as='input' id='stage_bonus' name='stage_bonus' labelText='Stage Bonus' type='number' min={0} defaultValue={contestant.vote.bonus} />
                                    <FormControl as='input' id='judge_vote' name='judge_vote' labelText='Judge Vote' type='number' min={0} defaultValue={contestant.vote.judge} />
                                </fieldset>

                                <div className='flex justify-end gap-6'>
                                    <input type="hidden" name="contestant_id" value={contestant._id} />
                                    <Cta element='button' type='reset' variant='outline'
                                        className='px-3 py-2 rounded-md font-bold min-w-[90px] border-secondary hover:border-slate-400 text-primary'>Reset</Cta>
                                    <Cta element='button' type='submit' name="intent" value='edit' className='px-3 py-2 rounded-md font-bold min-w-[90px] text-white'>Submit</Cta>
                                </div>
                            </Form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
                : null
            }
        </Dialog>
    )
}
