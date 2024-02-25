import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { contestRepo } from "~/models/contest/contest.server"
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
    console.log(...formData)
    const intent = formData.get('intent') as 'delete' | 'migrate' | 'open_registration'
    if (intent === 'delete') {
        const contestId = formData.get('contestId') as string
        const { data, error } = await contestRepo.deleteContest(contestId)
        if (data) {
            const { headers } = await setToast({ request, toast: 'success::The contest has been deleted' })
            return json(null, { headers })
        }
        const { headers } = await setToast({ request, toast: 'error::Could not delete the contest' })
        return json(null, { headers })
    }
    const { headers } = await setToast({ request, toast: 'success::The stage has been updated' })
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