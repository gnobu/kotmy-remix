import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { getContestsWStages } from "~/lib/data/contest.server"
import { icons } from "~/assets/icons"
import ContestTable from "~/components/admin/contest/ContestTable"
import Cta from "~/components/reusables/Cta"
import Svg from "~/components/reusables/Svg"
import { setToast } from "~/lib/session.server"

export async function loader({ }: LoaderFunctionArgs) {
    const contests = await getContestsWStages()
    return json({ contests })
}

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData()
    const { headers } = await setToast({ request, toast: 'success::The stage has been updated' })
    console.log(...formData)
    return json(null, { headers })
}

export default function Contests() {
    const { contests } = useLoaderData<typeof loader>()
    return (
        <main className='w-full overflow-y-auto p-6'>
            <section className="flex justify-between items-center mb-16">
                <h1 className="text-2xl font-black text-primary">Contests</h1>
                <Cta element="link" to='add' className="flex gap-2 items-center rounded-lg px-3 py-2">
                    <Svg src={icons.addIcon} width={'.9em'} />
                    Create Contest
                </Cta>
            </section>
            <section className='my-12'>
                <ContestTable data={contests} />
            </section>
        </main>
    )
}