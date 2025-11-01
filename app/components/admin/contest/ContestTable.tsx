import { ColumnDef } from '@tanstack/react-table'
import DataTable from '~/components/reusables/DataTable'
import StatusTag from '~/components/reusables/StatusTag'
import { DataTableColumnHeader } from '~/components/reusables/DataTableColumnHeader'
import ContestTableActions from './ContestTableActions'
import Pagination from '~/components/reusables/Pagination'
import EditStageForm from './EditStageForm'
import Svg from '~/components/reusables/Svg'
import { icons } from '~/assets/icons'
import { IContestWStage } from '~/services/contest/types/contest.interface'

const columns: ColumnDef<IContestWStage>[] = [
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
        accessorKey: "id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="id" />
        ),
        cell: ({ row }) => (<span className='uppercase'>{row.getValue('id')}</span>)
    }, {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="contest" />
        ),
        cell: ({ row }) => (<span className='uppercase line-clamp-1'>{row.getValue('name')}</span>)
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
        cell: ({ row }) => {
            const status = (row.getValue('status') as string).split('_').join(' ')
            const color = status === 'registering'
                ? 'yellow' : status === 'ongoing'
                    ? 'green' : status === 'completed'
                        ? 'red' : 'gray'
            return <StatusTag status={status} color={color} />
        }
    }, {
        id: 'actions',
        header: 'actions',
        cell: ({ row }) => (<ContestTableActions rowData={row.original} />)
    },
]

export default function ContestTable({ data, pagination }: { data: IContestWStage[], pagination?: boolean }) {
    return (
        <>
            <div className="w-full overflow-x-auto">
                <DataTable data={data} columns={columns}
                    expandRows getRowCanExpand={() => true} SubComponent={EditStageForm}
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
