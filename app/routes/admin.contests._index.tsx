import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { contestRepo, deleteContest, migrateStage, toggleRegistration, updateStage } from "~/services/contest/contest.server"
import { setToast } from "~/lib/session.server"
import ContestTable from "~/components/admin/contest/ContestTable"
import Cta from "~/components/reusables/Cta"
import Svg from "~/components/reusables/Svg"
import { icons } from "~/assets/icons"

export async function loader({ }: LoaderFunctionArgs) {
    const { data: contests, error } = await contestRepo.getContests()
    if (error) throw new Error(error.detail as string)
    return json({ contests })
}

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData()
    const intent = formData.get('intent') as 'delete' | 'update_stage' | 'migrate' | 'toggle_registration'
    if (intent === 'delete') return await deleteContest(formData, request)
    if (intent === 'update_stage') return await updateStage(formData, request)
    if (intent === 'toggle_registration') return await toggleRegistration(formData, request)
    if (intent === 'migrate') return await migrateStage(formData, request)
    console.log(...formData)
    const { headers } = await setToast({ request, toast: `error::This action is not yet supported::${Date.now()}` })
    return json(null, { headers })
}

export default function Contests() {
    const { contests } = useLoaderData<typeof loader>()
    return (
        <main className='w-full overflow-y-auto p-6'>
            <section className="flex max-sm:flex-col gap-10 justify-between sm:items-center mb-6 sm:mb-16">
                <h1 className="text-2xl font-black text-primary">Contests</h1>
                <Cta element="link" to='add' className="flex gap-2 items-center justify-center rounded-lg px-3 py-2">
                    <Svg src={icons.addIcon} width={'.9em'} />
                    Create Contest
                </Cta>
            </section>
            <section className='my-6 sm:my-12'>
                <ContestTable data={contests} />
            </section>
        </main>
    )
}