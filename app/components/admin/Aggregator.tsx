import React from "react"
import { cn } from "~/lib/utils"

interface Props extends React.ComponentProps<'aside'> { }
export function Aggregator({ className, children, ...props }: Props) {
    return (
        <div className="@container">
            <aside {...props}
                className={cn("grid @sm:grid-cols-2 @xl:grid-cols-[repeat(auto-fit,_minmax(200px,auto))]",
                    "gap-3 justify-items-center mx-auto p-3 border rounded-md bg-[#F6F8FA] text-sm overflow-hidden",
                    className)}>
                {children}
            </aside>
        </div>
    )
}

interface ItemProps extends React.ComponentProps<'div'> { }
export function AggregatorItem({ className, children, ...props }: ItemProps) {
    return <div className={cn('flex gap-3 items-center text-nowrap min-w-48', className)} {...props}>{children}</div>
}