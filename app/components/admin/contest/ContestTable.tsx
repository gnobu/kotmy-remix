import { ColumnDef } from '@tanstack/react-table'
import DataTable from '~/components/reusables/DataTable'
import StatusTag from '~/components/reusables/StatusTag'
import { Contest } from '~/lib/types/contest.interface'
import ContestTableActions from './ContestTableActions'
import Pagination from '~/components/reusables/Pagination'
import CollapsedRow from './CollapsedRow'
import Svg from '~/components/reusables/Svg'
import { icons } from '~/assets/icons'

const columns: ColumnDef<Contest>[] = [
    {
        id: 'expander',
        header: () => null,
        cell: ({ row }) => (row.getCanExpand()
            ? <button onClick={row.getToggleExpandedHandler()}>
                <Svg src={icons.arrowDownIcon} className={row.getIsExpanded() ? 'rotate-180' : ''} />
            </button>
            : null
        )
    },
    {
        accessorKey: "contestId",
        header: "ID",
        cell: ({ row }) => (<span className='uppercase'>{row.getValue('contestId')}</span>)
    }, {
        accessorKey: "title",
        header: "contest",
        cell: ({ row }) => (<span className='uppercase line-clamp-1'>{row.getValue('title')}</span>)
    }, {
        header: "timeline",
        accessorKey: "timeline",
        cell: ({ row }) => (
            <p>
                <span className='block whitespace-nowrap'>{row.original.start_date.split('.')[0].replace('T', ', ')}</span>
                <span className='block whitespace-nowrap'>{row.original.end_date.split('.')[0].replace('T', ', ')}</span>
            </p>
        )
    }, {
        accessorKey: "status",
        cell: ({ row }) => (<StatusTag status={row.getValue('status')} />)
    }, {
        id: 'actions',
        header: 'actions',
        cell: ({ row }) => (<ContestTableActions rowData={row.original} />)
    },
]

export default function ContestTable({ data }: { data: Contest[] }) {
    return (
        <>
            <DataTable data={data} columns={columns} sortableColumns={['contestId', 'title', 'status', 'timeline']}
                expandRows getRowCanExpand={() => true} renderSubComponent={CollapsedRow}
                className='text-sm' />
            <div className="flex justify-between items-center my-4">
                <label className="flex gap-2">Rows per page
                    <input type="number" name="rows" id="rows" className="w-10 pl-2 rounded-md border" defaultValue={10} />
                </label>
                <Pagination />
            </div>
        </>
    )
}
