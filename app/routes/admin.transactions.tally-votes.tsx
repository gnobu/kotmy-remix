import { ActionFunctionArgs, LoaderFunctionArgs, json, redirect } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import AddTallyDialog from "~/components/admin/transactions/AddTallyDialog"
import TallyTransactionsTable from "~/components/admin/transactions/TallyTransactionsTable"
import { setToast } from "~/lib/session.server"
import { TallyTransaction } from "~/lib/types/transaction.interface"

export async function loader({ }: LoaderFunctionArgs) {
    const tranasctions: TallyTransaction[] = [{
        tx_ref: 'KCRUSHIP4HIYGM72VL',
        sender: 'payments@nefworld.com',
        code: 'CD203005',
        votes: 530,
        amount: 53000,
        fee: 0,
        date: new Date().toISOString(),
        status: 'verified',
    }, {
        tx_ref: 'KCRUSHIP4HIYGM72VL',
        sender: 'payments@nefworld.com',
        code: 'CD203024',
        votes: 10,
        amount: 1000,
        fee: 0,
        date: new Date().toISOString(),
        status: 'pending',
    }, {
        tx_ref: 'KCRUSHIP4HIYGM72VL',
        sender: 'payments@nefworld.com',
        code: 'CD203010',
        votes: 20,
        amount: 2000,
        fee: 0,
        date: new Date().toISOString(),
        status: 'revoked',
    }]
    return json({ tranasctions })
}

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData()
    console.log(...formData)
    const { headers } = await setToast({ request, toast: `success::The transaction has been created::${Date.now()}` })
    return json(null, { headers })
}

export default function TallyVotes() {
    const { tranasctions } = useLoaderData<typeof loader>()
    return (
        <main className='w-full overflow-y-auto p-6'>
            <section className="flex max-sm:flex-col gap-10 justify-between sm:items-center mb-6 sm:mb-16">
                <h1 className="text-2xl font-black text-primary">Tally Votes</h1>
                <AddTallyDialog />
            </section>
            <section className='my-12'>
                <TallyTransactionsTable data={tranasctions} />
            </section>
        </main>
    )
}
