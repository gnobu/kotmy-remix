import { ColumnDef } from '@tanstack/react-table'
import DataTable from '~/components/reusables/DataTable'
import StatusTag from '~/components/reusables/StatusTag'
import { DataTableColumnHeader } from '~/components/reusables/DataTableColumnHeader'
import { ContestWStage } from '~/lib/types/contest.interface'
import ContestTableActions from './ContestTableActions'
import Pagination from '~/components/reusables/Pagination'
import EditStageForm from './EditStageForm'
import Svg from '~/components/reusables/Svg'
import { icons } from '~/assets/icons'

const columns: ColumnDef<ContestWStage>[] = [
    {
        id: 'expander',
        header: () => null,
        cell: ({ row }) => (row.getCanExpand()
            ? <button title='expand row' onClick={row.getToggleExpandedHandler()}>
                <Svg src={icons.arrowDownIcon} className={row.getIsExpanded() ? 'rotate-180' : ''} />
            </button>
            : null
        )
    },
    {
        accessorKey: "contestId",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="id" />
        ),
        cell: ({ row }) => (<span className='uppercase'>{row.getValue('contestId')}</span>)
    }, {
        accessorKey: "title",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="contest" />
        ),
        cell: ({ row }) => (<span className='uppercase line-clamp-1'>{row.getValue('title')}</span>)
    }, {
        accessorKey: "timeline",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="timeline" />
        ),
        cell: ({ row }) => (
            <p>
                <span className='block whitespace-nowrap'>{row.original.start_date.split('.')[0].replace('T', ', ')}</span>
                <span className='block whitespace-nowrap'>{row.original.end_date.split('.')[0].replace('T', ', ')}</span>
            </p>
        )
    }, {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="status" />
        ),
        cell: ({ row }) => (<StatusTag status={row.getValue('status')} />)
    }, {
        id: 'actions',
        header: 'actions',
        cell: ({ row }) => (<ContestTableActions rowData={row.original} />)
    },
]

export default function ContestTable({ data, pagination }: { data: ContestWStage[], pagination?: boolean }) {
    return (
        <>
            <div className="w-full overflow-x-auto">
                <DataTable data={data} columns={columns}
                    expandRows getRowCanExpand={() => true} renderSubComponent={EditStageForm}
                    className='max-xs:text-xs text-sm' />
            </div>
            {pagination
                ? <div className="max-sm:flex-col max-xs:text-xs sm:w-4/5 mx-auto flex gap-2 justify-between items-center my-5">
                    <label className="flex gap-2">Rows per page
                        <input type="number" name="rows" id="rows" className="w-10 pl-2 rounded-md border" defaultValue={10} />
                    </label>
                    <Pagination />
                </div>
                : null
            }
        </>
    )
}
