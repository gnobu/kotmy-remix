import { Table } from '@tanstack/react-table'
import { ContestantDto } from '~/lib/types/contestant.interface'
import EditContestantDialog from './EditContestantDialog'
import DeleteContestantDialog from './DeleteContestantDialog'
import EvictContestantDialog from './EvictContestantDialog'
import AdmitContestantDialog from './AdmitContestantDialog'

export default function ContestantTableActions({ table }: { table: Table<ContestantDto> }) {
    const singleRowSelected = table.getFilteredSelectedRowModel().rows.length === 1
    const rowsSelected = table.getFilteredSelectedRowModel().rows.length >= 1
    return <div className="flex gap-4 items-center px-3 mb-3">
        <EditContestantDialog disabled={!singleRowSelected} />
        <DeleteContestantDialog disabled={!rowsSelected} />
        <EvictContestantDialog disabled={!rowsSelected} />
        <AdmitContestantDialog disabled={!rowsSelected} />
    </div>
}