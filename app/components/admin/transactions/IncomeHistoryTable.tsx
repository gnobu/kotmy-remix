import { ColumnDef } from '@tanstack/react-table'
import DataTable from '~/components/reusables/DataTable'
import { DataTableColumnHeader } from '~/components/reusables/DataTableColumnHeader'
import Pagination from '~/components/reusables/Pagination'
import { numberFormatter } from '~/lib/numbers.utils'
import { IncomeSummary } from '~/lib/types/transaction.interface'

const numberFormatterOptions = { style: 'currency', currency: 'NGN' }

const columns: ColumnDef<IncomeSummary>[] = [
    {
        header: 'S/N',
        cell: ({ row }) => +row.id + 1,
    }, {
        accessorKey: 'contest',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="contest" />
        ),
    }, {
        accessorKey: 'description',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="description" />
        ),
    }, {
        accessorKey: 'session',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="session" />
        ),
    }, {
        accessorKey: 'paystack',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="paystack" />
        ),
        cell: ({ getValue }) => (numberFormatter(getValue<number>(), numberFormatterOptions))
    }, {
        accessorKey: 'bank',
        header: ({ column }) => (
            <DataTableColumnHeader className='whitespace-nowr' column={column} title="bank" />
        ),
        cell: ({ getValue }) => (numberFormatter(getValue<number>(), numberFormatterOptions))
    }
]


export default function IncomeHistoryTable({ data }: { data: IncomeSummary[] }) {
    return (
        <>
            <DataTable data={data} columns={columns} className='text-xs' />
            <div className="flex justify-between items-center my-4">
                <label className="flex gap-2">Rows per page
                    <input type="number" name="rows" id="rows" className="w-10 pl-2 rounded-md border" defaultValue={10} />
                </label>
                <Pagination />
            </div>
        </>
    )
}
