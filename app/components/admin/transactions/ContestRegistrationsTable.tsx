import { ColumnDef } from '@tanstack/react-table'
import Checkbox from '~/components/reusables/Checkbox'
import DataTable from '~/components/reusables/DataTable'
import { DataTableColumnHeader } from '~/components/reusables/DataTableColumnHeader'
import Pagination from '~/components/reusables/Pagination'
import StatusTag from '~/components/reusables/StatusTag'
import { formatDate } from '~/lib/dates.utils'
import { numberFormatter } from '~/lib/numbers.utils'
import { RegistrationTableData } from '~/lib/types/transaction.interface'
import TallyTableActions from './TallyTableActions'

const numberFormatterOptions = { style: 'currency', currency: 'NGN' }
const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
}
const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
}

const columns: ColumnDef<RegistrationTableData>[] = [
    {
        header: 'S/N',
        cell: ({ row }) => +row.id + 1,
    }, {
        accessorKey: 'tx_ref',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="trx ref" />
        ),
    }, {
        accessorKey: 'contest',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="contest" />
        ),
    }, {
        accessorKey: 'contestant',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="contestant" />
        ),
    }, {
        accessorKey: 'sender',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="sender" />
        ),
    }, {
        accessorKey: 'amount',
        header: ({ column }) => (
            <DataTableColumnHeader className='whitespace-nowr' column={column} title="amount" />
        ),
        cell: ({ getValue }) => (numberFormatter(getValue<number>(), numberFormatterOptions))
    }, {
        accessorKey: 'date',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="date" />
        ),
        cell: ({ getValue }) => (
            <span>
                <span className='block'>{formatDate(new Date(getValue<string>()), dateOptions)}</span>
                <span className='block'>{formatDate(new Date(getValue<string>()), timeOptions)}</span>
            </span>
        )
    }, {
        accessorKey: 'status',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="status" />
        ),
        cell: ({ getValue }) => {
            const status = getValue<RegistrationTableData['status']>()
            const color = status === 'pending'
                ? 'yellow' : status === 'verified'
                    ? 'green' : status === 'revoked'
                        ? 'red' : 'gray'
            return <StatusTag status={status} color={color} />
        }
    }
]

export default function ContestRegistrationsTable({ data }: { data: RegistrationTableData[] }) {
    return (
        <>
            <div className="w-full overflow-x-auto">
                <DataTable data={data} columns={columns} className='text-xs' />
            </div>
            <div className="max-sm:flex-col max-xs:text-xs sm:w-4/5 mx-auto flex gap-2 justify-between items-center my-5">
                <label className="flex gap-2">Rows per page
                    <input type="number" name="rows" id="rows" className="w-10 pl-2 rounded-md border" defaultValue={10} />
                </label>
                <Pagination />
            </div>
        </>
    )
}
