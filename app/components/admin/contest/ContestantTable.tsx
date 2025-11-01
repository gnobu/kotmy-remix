import { ColumnDef } from '@tanstack/react-table'

import Checkbox from '~/components/reusables/Checkbox'
import DataTable from '~/components/reusables/DataTable'
import { DataTableColumnHeader } from '~/components/reusables/DataTableColumnHeader'
import ContestantTableActions from './ContestantTableActions'
import { IContestant } from '~/services/contestant/types/contestant.interface'
import { formatDate } from '~/lib/dates.utils'
import StatusTag from '~/components/reusables/StatusTag'

const columns: ColumnDef<IContestant>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <div className="flex place-content-center">
                <Checkbox
                    className='h-4 w-4'
                    checked={table.getIsAllPageRowsSelected()}
                    onCheckedChange={(value) => { table.toggleAllPageRowsSelected(!value) }}
                    aria-label="Select all"
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex place-content-center">
                <Checkbox
                    className='h-4 w-4'
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!value)}
                    aria-label="Select row"
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'contestant',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="contestant" />
        ),
        accessorFn: (row) => `${row.contestant_biodata.first_name} ${row.contestant_biodata.last_name}`
    },
    {
        id: 'dob',
        accessorFn: (row) => formatDate(new Date(row.contestant_biodata.dob))
    },
    {
        id: 'state',
        accessorFn: (row) => row.contestant_biodata.state_of_residence
    },
    {
        accessorKey: 'code',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="code" />
        ),
    },
    {
        id: 's-media',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="s-media" />
        ),
        accessorFn: (row) => row.vote.social_media
    },
    {
        id: 'tally',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="tally" />
        ),
        accessorFn: (row) => row.vote.tally
    },
    {
        id: 'givaah',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="givaah" />
        ),
        accessorFn: (row) => row.vote.givaah
    },
    {
        accessorKey: 'grade',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="grade" />
        ),
        accessorFn: (row) => row.result.grade || '-'
    }, {
        accessorKey: "is_evicted",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="status" />
        ),
        cell: ({ row }) => {
            const status = (row.getValue<boolean>('is_evicted'))
            const color = status ? 'red' : 'green'
            return <StatusTag status={status ? 'Evicted' : 'Safe'} color={color} />
        }
    }
]

export default function ContestantTable({ data }: { data: IContestant[] }) {
    return (
        <>
            <div className="w-full overflow-x-auto">
                <DataTable data={data} columns={columns} className='text-sm' TableActions={ContestantTableActions} />
            </div>
            {/* <div className="max-sm:flex-col max-xs:text-xs sm:w-4/5 mx-auto flex gap-2 justify-between items-center my-5">
                <label className="flex gap-2">Rows per page
                    <input type="number" name="rows" id="rows" className="w-10 pl-2 rounded-md border" defaultValue={10} />
                </label>
                <Pagination />
            </div> */}
        </>
    )
}
