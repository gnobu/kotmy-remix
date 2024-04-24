import React from "react"
import {
    ColumnDef, Row, SortingState,
    Table,
    TableOptions,
    flexRender, getCoreRowModel, getExpandedRowModel, getSortedRowModel,
    useReactTable
} from "@tanstack/react-table"

type DataTableProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    className?: string
    TableActions?: ({ table }: { table: Table<TData> }) => React.ReactNode
} & ({
    expandRows?: false
    SubComponent?: undefined
    getRowCanExpand?: (row: Row<TData>) => false
} | {
    expandRows: true
    SubComponent: React.FC<{ row: Row<TData> }>
    getRowCanExpand: (row: Row<TData>) => boolean
})

export default function DataTable<TData, TValue>({
    data, columns, className = '', TableActions,
    expandRows, getRowCanExpand, SubComponent
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const expandOptions: Partial<TableOptions<TData>> = expandRows
        ? { getRowCanExpand, getExpandedRowModel: getExpandedRowModel() } : {}
    const [rowSelection, setRowSelection] = React.useState({})
    const table = useReactTable({
        data, columns, getCoreRowModel: getCoreRowModel(),
        state: { sorting, rowSelection },
        getSortedRowModel: getSortedRowModel(), onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,
        ...expandOptions
    })
    return (
        <div className="">
            {TableActions ? <TableActions table={table} /> : null}
            <table className={`w-full ${className}`}>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id} className="border-b border-secondary">
                            {headerGroup.headers.map(header => (
                                <th className="text-left uppercase font-satoshi-black p-3 [&:has([data-sortable=true])]:cursor-pointer [&:has([data-sortable=true])]:hover:bg-secondary" key={header.id}>
                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.length
                        ? table.getRowModel().rows.map(row => (
                            <React.Fragment key={row.id}>
                                {/* first row is a normal row */}
                                <tr key={row.id}
                                    className="border-b border-secondary hover:bg-secondary"
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map(cell => {
                                        return <td className="p-3" key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    })}
                                </tr>
                                <tr className={'hover:bg-secondary focus-within:bg-secondary'}>
                                    {/* 2nd row is a custom 1 cell row */}
                                    <td colSpan={row.getVisibleCells().length}>
                                        {expandRows && row.getIsExpanded() && <SubComponent row={row} />}
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))
                        : <tr className="border-b border-secondary">
                            <td className="p-3 text-center" colSpan={columns.length}>No data to display</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}
