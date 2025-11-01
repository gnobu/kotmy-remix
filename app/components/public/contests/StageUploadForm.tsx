import { Form } from "@remix-run/react"

import FormControl from "../../reusables/FormControl"
import Button from "../../reusables/Button"
import DragnDrop from "./DragnDrop"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/reusables/select-shad"
import { nigerianStates } from "~/lib/data/states"
import { IContest } from "~/services/contest/types/contest.interface"
import { IContestant } from "~/services/contestant/types/contestant.interface"

export default function StageUploadForm({ contest, contestant, hash }: { contest: IContest, hash: string, contestant?: IContestant }) {
    return (
        <Form method="POST" encType="multipart/form-data" className="bg-secondary p-[5%] sm:p-10 sm:rounded-3xl flex flex-col w-full max-w-xl gap-6">
            <p className="text-2xl font-satoshi-bold">
               Upload your photo for the next stage.
            </p>
            <div className="grid gap-6 lg:grid-cols-2">
                <FormControl as="input" labelText="First Name" id="first_name" name="first_name" disabled={!!contestant}
                    placeholder="Enter your first name" required defaultValue={contestant?.contestant_biodata?.first_name}
                />
                <FormControl as="input" labelText="Last Name" id="last_name" name="last_name" disabled={!!contestant}
                    placeholder="Enter your last name" required defaultValue={contestant?.contestant_biodata?.last_name}
                />
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
                <FormControl as="input" labelText="Email Address" id="email" name="email" disabled={!!contestant}
                    placeholder="Enter your email address" required defaultValue={contestant?.contestant_biodata?.email}
                />
                <FormControl as="input" type="date" labelText="Date of Birth" id="dob" name="dob" disabled={!!contestant}
                    placeholder="dd/mm/yyyy" max={new Date().toISOString().split("T")[0]} required defaultValue={contestant?.contestant_biodata?.dob?.split("T")[0]}
                />
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
                <label htmlFor="gender" className="font-bold flex flex-col">Gender
                    <Select name="sex" required value={contestant?.contestant_biodata?.sex} disabled>
                        <SelectTrigger className="h-10 font-normal rounded-lg shadow-none hover:border-accent">
                            <SelectValue placeholder={"Gender"} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={"MALE"} className="focus:bg-blue-700/25">Male</SelectItem>
                            <SelectItem value={"FEMALE"} className="focus:bg-blue-700/25">Female</SelectItem>
                        </SelectContent>
                    </Select>
                </label>
                <label htmlFor="state_of_residence" className="font-bold flex flex-col">State of Residence
                    <Select name="state_of_residence" required value={contestant?.contestant_biodata?.state_of_residence} disabled>
                        <SelectTrigger className="h-10 font-normal rounded-lg shadow-none hover:border-accent">
                            <SelectValue placeholder={"Select a state"} />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.entries(nigerianStates).map(([key, val]) => (
                                <SelectItem key={key} value={key} className="focus:bg-blue-700/25">{val}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </label>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
                <FormControl as="input" type="tel" labelText="Whatsapp Number" id="whatsapp_no" name="whatsapp_no" disabled
                    placeholder="Enter your whatsapp number" required defaultValue={contestant?.contestant_biodata?.whatsapp_no}
                />
                <label htmlFor="category" className="font-bold flex flex-col">Category
                    <Select name="category" required={!!contest.categories.length} defaultValue={contestant?.category} disabled>
                        <SelectTrigger className="h-10 font-normal rounded-lg shadow-none hover:border-accent">
                            <SelectValue placeholder={"Select a category"} />
                        </SelectTrigger>
                        <SelectContent>
                            {contest.categories.map((category) => (
                                <SelectItem key={category} value={category} className="focus:bg-blue-700/25">{category}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </label>
            </div>
            <DragnDrop labelText="Upload Image" name="contestant_image" required />
            <input type="hidden" name="hash" value={hash} />
            <Button element="button" type="submit" name="intent" value="stage_upload" className="md:self-end">Submit</Button>
        </Form>
    )
}
