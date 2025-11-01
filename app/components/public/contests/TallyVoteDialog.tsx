import { Form, useLocation, useRouteLoaderData } from "@remix-run/react"
import { useRef } from "react"

import { cn } from "~/lib/utils"
import { icons } from "~/assets/icons"
import {
    Dialog, DialogClose, DialogContent, DialogDescription,
    DialogFooter, DialogHeader, DialogTitle, DialogTrigger
} from "~/components/reusables/Dialog"
import FormControl from "~/components/reusables/FormControl"
import { numberSlang } from "~/lib/numbers.utils"
import { providers } from "~/lib/data/payment"
import {
    Select, SelectContent, SelectItem,
    SelectTrigger, SelectValue
} from "~/components/reusables/select-shad"
import Svg from "~/components/reusables/Svg"
import VoteLink from "./VoteLink"
import { IContestant } from "~/services/contestant/types/contestant.interface"
import { StageContestantsLoader } from "~/routes/_public.contests.$tournamentId.$contestId"


export default function TallyVoteDialog({ contestant, disabled, children }: { contestant: IContestant, disabled?: boolean, children?: React.ReactNode }) {
    const stageContestants = useRouteLoaderData<StageContestantsLoader>("routes/_public.contests.$tournamentId.$contestId")
    const formRef = useRef<HTMLFormElement>(null)
    const { pathname, search } = useLocation()
    const redirectUrl = `${stageContestants?.baseUrl}${pathname}${search}`
    return (
        <Dialog modal>
            <DialogTrigger asChild disabled={disabled} title='Vote for contestant'
                className={cn(`rounded-full outline-none`, {
                    'bg-slate-100 border-slate-400 text-slate-400 cursor-not-allowed': disabled
                })}>
                {children ?? <VoteLink type={'tally'} count={numberSlang(contestant.vote.tally)} className="w-full" />}
            </DialogTrigger>
            <DialogContent className="bg-secondary p-0 gap-0">
                <DialogHeader>
                    <DialogTitle className="p-4 flex gap-3">
                        <div className="size-11 rounded-full bg-orange-100 flex items-center justify-center">
                            <Svg src={icons.questionIcon} />
                        </div>
                        <p>
                            <span className="block">Vote for contestant</span>
                            <span className="font-normal text-base text-admin-pry">{`${contestant.contestant_biodata.first_name} ${contestant.contestant_biodata.last_name}`}</span>
                        </p>
                    </DialogTitle>
                    <DialogDescription asChild className="border-y p-4">
                        <Form ref={formRef} method="post" className="grid sm:grid-cols-2 gap-4">
                            <FormControl as='input' id='email' name='email' labelText='Email Address' labelClassNames="text-left" required />
                            <FormControl as='input' id='phone' name='phone' labelText='Phone Number' labelClassNames="text-left" />
                            <FormControl as='input' id='vote_quantity' name='vote_quantity' labelText='Vote Quantity' type='number' labelClassNames="text-left" defaultValue={1} min={1} required />
                            <label htmlFor="provider" className='font-bold flex flex-col text-left'>Payment Provider
                                <Select name='provider' required>
                                    <SelectTrigger className="h-10 font-normal rounded-lg shadow-none hover:border-accent">
                                        <SelectValue placeholder="Select payment provider" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {providers.map(({ label, value }) => (
                                            <SelectItem key={value} value={value} className='focus:bg-blue-700/25'>{label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </label>
                            <input type="hidden" name="contestant_id" value={contestant._id} />
                            <input type="hidden" name="redirect_url" value={redirectUrl} />
                            <input type="hidden" name="intent" value="tally_vote" />
                        </Form>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className='flex justify-end gap-6 p-4'>
                    <DialogClose type='submit' name="intent" value={'delete'} className='px-10 py-2 rounded-md font-bold min-w-[90px] outline outline-1'>
                        Cancel
                    </DialogClose>
                    <button type='submit' onClick={() => formRef.current?.submit()} className='bg-accent px-10 py-2 rounded-md font-bold min-w-[90px] text-white'>
                        Proceed
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
