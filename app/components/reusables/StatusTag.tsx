import cn from 'classnames'
import { Status } from '~/lib/types/contest.interface'

export default function StatusTag({ status, className }: { status: Status, className?: string }) {
    return (
        <span className={cn(`block w-fit px-4 py-2 rounded-full uppercase font-satoshi-medium ${className}`, {
            'bg-registering': status === 'registering',
            'bg-ongoing': status === 'ongoing',
            'bg-completed': status === 'completed',
        })}>{status}</span>
    )
}
