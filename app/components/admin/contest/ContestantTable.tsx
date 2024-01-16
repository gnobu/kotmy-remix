import { ColumnDef } from '@tanstack/react-table'
import Checkbox from '~/components/reusables/Checkbox'
import DataTable from '~/components/reusables/DataTable'
import { DataTableColumnHeader } from '~/components/reusables/DataTableColumnHeader'
import Pagination from '~/components/reusables/Pagination'
import { ContestantDto } from '~/lib/types/contestant.interface'
import ContestantTableActions from './ContestantTableActions'

const columns: ColumnDef<ContestantDto>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <div className="flex place-content-center">
                <Checkbox
                    className='h-4 w-4'
                    checked={
                        table.getIsAllPageRowsSelected()
                    }
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
        accessorFn: (row) => row.biodata.full_name
    },
    {
        id: 'dob',
        accessorFn: (row) => row.biodata.dob
    },
    {
        id: 'state',
        accessorFn: (row) => row.biodata.state_of_residence
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
        accessorFn: (row) => row.votes.social_media.count
    },
    {
        id: 'tally',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="tally" />
        ),
        accessorFn: (row) => row.votes.tally
    },
    {
        id: 'givaah',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="givaah" />
        ),
        accessorFn: (row) => row.votes.givaah
    },
    {
        accessorKey: 'grade',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="grade" />
        ),
    },
]

export default function ContestantTable({ data }: { data: ContestantDto[] }) {
    return (
        <>
            <DataTable data={data} columns={columns} className='text-sm' TableActions={ContestantTableActions} />
            <div className="flex justify-between items-center my-4">
                <label className="flex gap-2">Rows per page
                    <input type="number" name="rows" id="rows" className="w-10 pl-2 rounded-md border" defaultValue={10} />
                </label>
                <Pagination />
            </div>
        </>
    )
}
