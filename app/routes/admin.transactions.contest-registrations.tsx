import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import ContestRegistrationsTable from "~/components/admin/transactions/ContestRegistrationsTable"
import { setToast } from "~/lib/session.server"
import { RegistrationTableData } from "~/lib/types/transaction.interface"

export async function loader({ }: LoaderFunctionArgs) {
  const tranasctions: RegistrationTableData[] = [{
    tx_ref: 'KCRUSHIP4HIYGM72VL',
    sender: 'payments@nefworld.com',
    contest: 'My Kid Crush of December',
    contestant: 'John Wick',
    amount: 53000,
    date: new Date().toISOString(),
    status: 'verified',
  }, {
    tx_ref: 'KCRUSHIP4HIYGM72VL',
    sender: 'payments@nefworld.com',
    contest: 'My Kid Crush of December',
    contestant: 'John Wick',
    amount: 1000,
    date: new Date().toISOString(),
    status: 'pending',
  }, {
    tx_ref: 'KCRUSHIP4HIYGM72VL',
    sender: 'payments@nefworld.com',
    contest: 'My Kid Crush of December',
    contestant: 'John Wick',
    amount: 2000,
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



export default function ContestRegistrations() {
  const { tranasctions } = useLoaderData<typeof loader>()
  return (
    <main className='w-full overflow-y-auto p-6'>
      <section className="flex justify-between items-center mb-8 sm:mb-16">
        <h1 className="text-xl xs:text-2xl font-black text-primary">Registration Transactions</h1>
      </section>
      <section className='my-12'>
        <ContestRegistrationsTable data={tranasctions} />
      </section>
    </main>
  )
}
