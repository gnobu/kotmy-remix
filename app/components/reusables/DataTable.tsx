import React from "react"
import { Column, ColumnDef, SortingState, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import Svg from "./Svg"
import { icons } from "~/assets/icons"

type DataTableProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    sortableColumns?: string[]
}

export default function DataTable<TData, TValue>({ data, columns, sortableColumns = [] }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const table = useReactTable({
        data, columns, getCoreRowModel: getCoreRowModel(),
        state: { sorting }, getSortedRowModel: getSortedRowModel(), onSortingChange: setSorting
    })
    function canSortColumn(column: Column<TData, unknown>) {
        if (!sortableColumns.length) return false
        return column.getCanSort() && sortableColumns?.includes(column.id)
    }
    return (
        <table className="w-full table-auto">
            <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id} className="border-b border-secondary">
                        {headerGroup.headers.map(header => {
                            return canSortColumn(header.column)
                                ? <th className="text-left uppercase font-satoshi-black p-3 cursor-pointer hover:bg-secondary"
                                    key={header.id} onClick={() => header.column.toggleSorting(header.column.getIsSorted() === "asc")}>
                                    {header.isPlaceholder
                                        ? null
                                        : <span className="flex items-center">
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            <Svg src={icons.arrowUpDownIcon} className="" />
                                        </span>
                                    }
                                </th>
                                : <th className="text-left uppercase font-satoshi-black p-3" key={header.id}>
                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                        })}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.length
                    ? table.getRowModel().rows.map(row => (
                        <tr key={row.id}
                            className="border-b border-secondary"
                            data-state={row.getIsSelected() && "selected"}
                        >
                            {row.getVisibleCells().map(cell => {
                                return <td className="p-3" key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            })}
                        </tr>
                    ))
                    : <tr className="border-b border-secondary">
                        <td className="p-3" colSpan={columns.length}></td>
                    </tr>
                }
            </tbody>
        </table>
    )
}
