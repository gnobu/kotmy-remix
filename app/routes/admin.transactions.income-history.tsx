import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import IncomeHistoryTable from "~/components/admin/transactions/IncomeHistoryTable"
import { setToast } from "~/lib/session.server"
import { IncomeSummary } from "~/lib/types/transaction.interface"

export async function loader({ }: LoaderFunctionArgs) {
  const tranasctions: IncomeSummary[] = [{
    contest: 'kotm01',
    description: 'Kid of the Month - Stage 1',
    session: 'September 2021',
    paystack: 7574060,
    bank: 592800,
  }, {
    contest: 'kotm01',
    description: 'Kid of the Month - Stage 1',
    session: 'September 2021',
    paystack: 7574060,
    bank: 592800,
  }, {
    contest: 'kotm01',
    description: 'Kid of the Month - Stage 1',
    session: 'September 2021',
    paystack: 7574060,
    bank: 592800,
  }]
  return json({ tranasctions })
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  console.log(...formData)
  const { headers } = await setToast({ request, toast: `success::The transaction has been created::${Date.now()}` })
  return json(null, { headers })
}


export default function IncomeHistory() {
  const { tranasctions } = useLoaderData<typeof loader>()
  return (
    <main className='w-full overflow-y-auto p-6'>
      <section className="flex justify-between items-center mb-8 sm:mb-16">
        <h1 className="text-xl xs:text-2xl font-black text-primary">Income History Summary</h1>
      </section>
      <section className='my-12'>
        <IncomeHistoryTable data={tranasctions} />
      </section>
    </main>
  )
}
