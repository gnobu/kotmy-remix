import cn from 'classnames'

type StatusTagProps = { status: string, className?: string }

const safe = ['ongoing', 'verified']
const caution = ['registering', 'pending']
const danger = ['completed', 'revoked']

export default function StatusTag({ status, className }: StatusTagProps) {
    return <span className={cn(`w-fit px-4 pl-7 py-1.5 rounded-md text-sm capitalize font-satoshi-medium flex items-center ${className}`, {
        'bg-green-100 text-green-700': safe.includes(status),
        'bg-yellow-100 text-yellow-700': caution.includes(status),
        'bg-red-100 text-red-700': danger.includes(status),
    })}>
        <span className={`before:content-['•'] before:absolute relative before:-left-4 before:top-[10%] before:text-2xl before:leading-3`}>
            {status}
        </span>
    </span>
}
