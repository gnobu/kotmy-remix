import { Form, useLoaderData } from "@remix-run/react"
import { useState } from "react"

import { cn } from "~/lib/utils"
import Cta from "~/components/reusables/Cta"
import {
    Dialog, DialogClose, DialogContent, DialogDescription,
    DialogHeader, DialogTitle, DialogTrigger
} from "~/components/reusables/Dialog"
import FormControl from "~/components/reusables/FormControl"
import { IContestant } from "~/services/contestant/types/contestant.interface"
import { icons } from "~/assets/icons"
import { nigerianStates } from "~/lib/data/states"
import { noImage } from "~/assets/images"
import { parseDateForInput } from "~/lib/dates.utils"
import RoundCta from "~/components/reusables/RoundCta"
import {
    Select, SelectContent, SelectItem,
    SelectTrigger, SelectValue
} from "~/components/reusables/select-shad"
import { StageContestantsLoader } from "~/routes/admin.contests.$contestId.$stageId"
import Svg from "~/components/reusables/Svg"
import useFilePreview from "~/hooks/useFilePreview"

export default function EditContestantDialog({ disabled, contestant }: { disabled: boolean, contestant: IContestant }) {
    const { stage } = useLoaderData<StageContestantsLoader>()
    const isKotmy = stage.rates.social_media.type === 'kotmy'
    const [files, setFiles] = useState<FileList | null>(null)
    const { filePreview, clearFilePreview } = useFilePreview(files)
    return (
        <Dialog onOpenChange={(open) => { if (!open) clearFilePreview() }}>
            <DialogTrigger disabled={disabled} title='Edit contestant'
                className={cn(`flex items-center justify-center border min-w-[32px] min-h-[32px] rounded-full border-[#262626] bg-[#F7F7F8] text-primary`, {
                    'bg-slate-100 border-slate-400 text-slate-400 cursor-not-allowed': disabled
                })}>
                <Svg src={icons.editIcon} className='w-3' />
            </DialogTrigger>
            {!disabled
                ? <DialogContent className="bg-secondary max-h-screen overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit Contestant Data</DialogTitle>
                        <DialogDescription>
                            <Form method='POST' className='text-primary text-xs flex flex-col gap-4 mt-3' encType="multipart/form-data">
                                <fieldset className="py-1 grid grid-cols-2 gap-3">
                                    <legend className="text-gray-400 font-medium">Biodata</legend>
                                    <div className="relative max-sm:col-span-2 row-span-3 flex flex-col max-h-56 overflow-y-hidden rounded text-left font-semibold">Image
                                        <img src={filePreview || contestant.image_url || noImage} alt="contestant image" width={300} height={300} className="bg-neutral-200 size-full object-cover rounded" />
                                        <RoundCta icon={icons.closeIcon} element="button" type="button" onClick={() => clearFilePreview()}
                                            className={cn("absolute bottom-2 right-2 bg-white/80 p-2 rounded-full hover:bg-red-50 hover:text-red-400 transition-colors", { 'hidden': !filePreview })}
                                        />
                                        <label htmlFor="media" className={cn("absolute bottom-2 right-2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors cursor-pointer", { 'hidden': filePreview })}>
                                            <input type="file" name="media" id="media" hidden onChange={(e) => setFiles(e.target.files)} />
                                            <Svg src={icons.imageIcon} />
                                        </label>
                                    </div>
                                    <FormControl as='input' id='first_name' name='first_name' labelText='First Name' labelClassNames="text-left" defaultValue={contestant.contestant_biodata.first_name} />
                                    <FormControl as='input' id='last_name' name='last_name' labelText='Last Name' labelClassNames="text-left" defaultValue={contestant.contestant_biodata.last_name} />
                                    <FormControl as='input' id='email' name='email' labelText='Email Address' labelClassNames="text-left" defaultValue={contestant.contestant_biodata.email} />
                                    <label htmlFor="gender" className='font-bold flex flex-col text-left'>Gender
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
                                    <FormControl as='input' type='date' labelText='Date of Birth' id='dob' name='dob' labelClassNames="text-left" defaultValue={parseDateForInput(contestant.contestant_biodata.dob)} max={new Date().toISOString().split("T")[0]} />
                                    <label htmlFor="gender" className='font-bold flex flex-col text-left'>State of Residence
                                        <Select name='state' required defaultValue={contestant.contestant_biodata.state_of_residence}>
                                            <SelectTrigger className="h-10 font-normal rounded-lg shadow-none hover:border-accent">
                                                <SelectValue placeholder={"State"} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.entries(nigerianStates).map(([key, label]) => (
                                                    <SelectItem key={key} value={key} className='focus:bg-blue-700/25'>{label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </label>
                                </fieldset>
                                <fieldset className="py-1 grid grid-cols-2 gap-3">
                                    <legend className="text-gray-400 font-medium">Voting</legend>
                                    <FormControl as='input' id='social_media_url' name='social_media_url' labelText='Social Media Link' labelClassNames="text-left" defaultValue={contestant.social_media_url} disabled={isKotmy} />
                                    <FormControl as='input' id='social_media_vote' name='social_media_vote' labelText='Social Media Vote' labelClassNames="text-left" type='number' min={0} defaultValue={contestant?.vote.social_media} />
                                    <FormControl as='input' id='stage_bonus' name='stage_bonus' labelText='Stage Bonus' type='number' labelClassNames="text-left" min={0} defaultValue={contestant.vote.bonus} />
                                    <FormControl as='input' id='judge_vote' name='judge_vote' labelText='Judge Vote' type='number' labelClassNames="text-left" min={0} defaultValue={contestant.vote.judge} />
                                </fieldset>

                                <div className='flex justify-end gap-6'>
                                    <input type="hidden" name="contestant_id" value={contestant._id} />
                                    <Cta element='button' type='reset' variant='outline'
                                        className='px-3 py-2 rounded-md font-bold min-w-[90px] border-secondary hover:border-slate-400 text-primary'>Reset</Cta>
                                    <DialogClose type='submit' name="intent" value='edit' className='bg-accent px-3 py-2 rounded-md font-bold min-w-[90px] text-white'>Submit</DialogClose>
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
