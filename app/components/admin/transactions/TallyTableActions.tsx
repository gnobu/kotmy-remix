import { Table } from '@tanstack/react-table'
import { TallyTransaction } from '~/lib/types/transaction.interface'
import VerifyTransactionDialog from './VerifyTransactionDialog'
import RevokeTransactionDialog from './RevokeTransactionDialog'
import DeleteTransactionDialog from './DeleteTransactionDialog'

export default function TallyTableActions({ table }: { table: Table<TallyTransaction> }) {
    const rowsSelected = table.getFilteredSelectedRowModel().rows.length >= 1
    const canVerify = rowsSelected && table.getSelectedRowModel().rows.every(({ original }) => original.status !== 'verified')
    const canRevoke = rowsSelected && table.getSelectedRowModel().rows.every(({ original }) => original.status !== 'revoked')
    return (<div className="flex gap-4 items-center px-3 mb-3">
        <VerifyTransactionDialog disabled={!canVerify} />
        <RevokeTransactionDialog disabled={!canRevoke} />
        <DeleteTransactionDialog disabled={!rowsSelected} />
    </div>)
}
