import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from "@remix-run/node"
import { Form, useActionData, useLoaderData } from "@remix-run/react"
import { useEffect, useState } from "react"
import { noImage } from "~/assets/images"
import ContestGuidelines from "~/components/public/contests/ContestGuidelines"
import ContestTimer from "~/components/public/contests/ContestTimer"
import DragnDrop from "~/components/public/contests/DragnDrop"
import Button from "~/components/reusables/Button"
import FormControl from "~/components/reusables/FormControl"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/reusables/select-shad"
import { toast } from "~/components/reusables/use-toast"
import { nigerianStates } from "~/lib/data/states"
import { IContest, IContestWStageWContestant, IStageWContestant } from "~/services/contest/types/contest.interface"
import { IContestant, IEditContestantDTO } from "~/services/contestant/types/contestant.interface"
import { userServer } from "~/services/user/userserver"

export async function loader ({request, params}: LoaderFunctionArgs){
    const cookieHeader = request.headers.get("Cookie") ?? "";
    console.log({cookieHeader})
    if (!cookieHeader) {
    // User is not signed in
      redirect("/login"); 
    }
    const contestantId = params.contestantId ?? "";
    const {error, data, authRequired} = await userServer.getContestantDetails(contestantId, cookieHeader);

    if(authRequired){
        redirect("/login")
    }

    return {error, data, authRequired}
}

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData()
    const cookieHeader = request.headers.get("Cookie") ?? "";
    // distill contestant bio data from form data
    const editContestantDTO: IEditContestantDTO = {
        biodata: {
            first_name: formData.get('first_name')?.toString(),
            last_name: formData.get('first_name')?.toString(),
            dob: formData.get('dob')?.toString(),
            sex: formData.get('sex')?.toString(),
            email: formData.get('email')?.toString(),
            state_of_residence: formData.get('state_of_residence')?.toString(),
            whatsapp_no: formData.get('state_of_residence')?.toString(),
        }
    }
    const contestantId = formData.get("contestantId")?.toString() ?? ""

    const {error, authRequired, data}  = await userServer.updateUserContestant({contestantId, formData, editContestantDTO}, cookieHeader)
    if(authRequired){
        redirect("/login")
    }
    return json({error, authRequired, data})
}

export function useRegistrationFormController(){
    const {error, data} = useLoaderData<typeof loader>();

    const actionData = useActionData<typeof action>();


    console.log({data})
    const [contest, setContest] = useState<IContestWStageWContestant>()
    const [stage, setStage] = useState<IStageWContestant>()
    const [contestant, setContestant] = useState<IContestant>()
    if(error){
      toast({
          variant: "destructive",
          title: "An error occured",
          description: error?.detail.toString() ?? "Error occured"
      });
    }

    useEffect(() => {
        if (actionData) {
            if (actionData.error) {
                // Action Error Toast
                console.error(actionData.error.detail)
                toast({
                    variant: "destructive",
                    title: "Update Failed",
                    description: actionData.error?.detail?.toString() ?? "An error occurred while updating your details."
                });
            } else if (actionData.data) {
                // Action Success Toast
                toast({
                    variant: "default", // Assuming you have a 'success' variant for your toast
                    title: "Update Successful!",
                    description: "Your contestant details have been updated."
                });
            }
        }
    }, [actionData]);

    useEffect(() => {
        if(data){
            setContest(data)
            const _stage = data.stages?.[0]
            setStage(_stage)
            setContestant(_stage.contestants?.[0])
        }

        else{
            toast({
          variant: "destructive",
          title: "An error occured",
          description: error?.detail.toString() ?? "Error occured"
      });
        }
        
    }, [])

    
    console.log({contest})
    return {contest, error, stage, contestant, actionData}
}


export default function RegistrationForm() {
    const {contest, stage, contestant, actionData} = useRegistrationFormController()
    return (
        contest ? (
        <section>
            <header className="wrapper my-16 grid md:grid-cols-2 justify-between gap-6 md:gap-8">
                <div className="flex flex-col justify-around">
                    <div className="max-w-2xl">
                        <h1 className="text-accent text-2xl lg:text-4xl font-satoshi-black max-w-3xl mb-3">{contest.name}</h1>
                        <p className="font-satoshi-medium">{contest.desc}</p>
                    </div>
                    {/* <img src={contest.image || noImage} alt="kid smiling" className="w-full rounded-3xl h-[350px] object-cover" /> */}
                </div>
                
            </header>
            <section className="sm:wrapper my-16">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-6 sm:gap-8">
                    <ContestGuidelines contest={contest} />
                    <Form method="POST" encType="multipart/form-data" className="bg-secondary p-[5%] sm:p-10 sm:rounded-3xl flex flex-col w-full max-w-xl gap-6">
                        <p className="text-2xl font-satoshi-bold">
                            Welcome, {contestant?.contestant_biodata.first_name}. You can manage your profile for {contest.name} here
                        </p>
                        <img src={contestant?.image_url || noImage} alt="kid smiling" className="w-full rounded-3xl h-[350px] object-cover" />
                        <div className="grid gap-6 lg:grid-cols-2">
                            <FormControl as="input" labelText="First Name" id="first_name" name="first_name" defaultValue={contestant?.contestant_biodata?.first_name} 
                                placeholder="Enter your first name" required
                            />
                            <FormControl as="input" labelText="Last Name" id="last_name" name="last_name" defaultValue={contestant?.contestant_biodata?.last_name}
                                placeholder="Enter your last name" required
                            />
                        </div>
                        <div className="grid gap-6 lg:grid-cols-2">
                            <FormControl as="input" labelText="Email Address" id="email" name="email" defaultValue={contestant?.contestant_biodata?.email}
                                placeholder="Enter your email address" required
                            />
                            <FormControl as="input" type="date" labelText="Date of Birth" id="dob" name="dob" defaultValue={contestant?.contestant_biodata?.dob}
                                placeholder="dd/mm/yyyy" max={new Date().toISOString().split("T")[0]} required
                            />
                        </div>
                        <div className="grid gap-6 lg:grid-cols-2">
                            <label htmlFor="gender" className="font-bold flex flex-col">Gender
                                <Select name="sex" required defaultValue={contestant?.contestant_biodata?.sex}>
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
                                <Select name="state_of_residence" required defaultValue={contestant?.contestant_biodata?.state_of_residence}>
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
                            <FormControl as="input" type="tel" labelText="Whatsapp Number" id="whatsapp_no" name="whatsapp_no"
                                placeholder="Enter your whatsapp number" required defaultValue={contestant?.contestant_biodata?.whatsapp_no}
                            />
                            
                            <label htmlFor="category" className="font-bold flex flex-col">Category
                                <Select name="category" required={!!contest.categories.length} defaultValue={contestant?.category}>
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
                        <DragnDrop labelText="Upload Image" name="media" multiple required={false} />
                        <input type="hidden" name="contestId" value={contest._id} />
                        <input type="hidden" name="contestantId" value={contestant?._id} />
                        <Button element="button" type="submit" name="intent" value="register" className="md:self-end">Update contestant details</Button>
                    </Form>
                </div>
            </section>
            
        </section>) : (
            <div> Not found</div>
        )
    )
}
