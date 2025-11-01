import { Table } from '@tanstack/react-table'

import EditContestantDialog from './EditContestantDialog'
import DeleteContestantDialog from './DeleteContestantDialog'
import EvictContestantDialog from './EvictContestantDialog'
import AdmitContestantDialog from './AdmitContestantDialog'
import { IContestant } from '~/services/contestant/types/contestant.interface'

export default function ContestantTableActions({ table }: { table: Table<IContestant> }) {
    const singleRowSelected = table.getFilteredSelectedRowModel().rows.length === 1
    const rowsSelected = table.getFilteredSelectedRowModel().rows.length >= 1
    const contestants = table.getSelectedRowModel().rows.map(row => row.original)
    const contestant = contestants.at(0) ?? {} as IContestant
    return <div className="flex gap-4 items-center px-3 mb-3">
        <EditContestantDialog disabled={!singleRowSelected} contestant={contestant} />
        <DeleteContestantDialog disabled={!rowsSelected} />
        <EvictContestantDialog disabled={!rowsSelected} contestants={contestants} />
        <AdmitContestantDialog disabled={!rowsSelected} contestants={contestants} />
    </div>
}