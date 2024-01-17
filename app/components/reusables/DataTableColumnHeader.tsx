import { Column } from "@tanstack/react-table"
import Svg from "./Svg"
import { icons } from "~/assets/icons"

interface DataTableColumnHeaderProps<TData, TValue>
    extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>
    title: string
}

export function DataTableColumnHeader<TData, TValue>({
    column,
    title,
    className,
}: DataTableColumnHeaderProps<TData, TValue>) {
    if (!column.getCanSort()) return title
    return (
        <span data-sortable className={`flex items-center ${className}`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            <span>{title}</span>
            <Svg src={icons.arrowUpDownIcon} />
        </span>
    )
}