import cn from 'classnames'

type Color = 'red' | 'yellow' | 'green'
type StatusTagProps = { status: string, className?: string }

const safe = ['ongoing', 'verified']
const danger = ['completed', 'revoked']

export default function StatusTag({ status, className }: StatusTagProps) {
    const color: Color = safe.includes(status) ? 'green' : danger.includes(status) ? 'red' : 'yellow'
    return <span className={cn(`w-fit px-4 pl-7 py-1.5 bg-${color}-100  text-${color}-700 rounded-md text-sm capitalize font-satoshi-medium flex items-center ${className}`)}>
        <span className={`before:content-['•'] before:absolute relative before:-left-4 before:top-[10%] before:bg-${color}-700 before:text-2xl before:leading-3`}>{status}</span>
    </span>
}
