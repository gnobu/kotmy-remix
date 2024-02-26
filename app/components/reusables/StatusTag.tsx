import cn from 'classnames'

type StatusTagProps = { status: string, className?: string, color?: 'green' | 'yellow' | 'red' | 'gray' }

export default function StatusTag({ status, className, color = 'gray' }: StatusTagProps) {
    return <span className={cn(`w-fit px-4 pl-7 py-1.5 rounded-md text-sm capitalize font-satoshi-medium flex items-center ${className}`, {
        'bg-green-100 text-green-700': color === 'green',
        'bg-yellow-100 text-yellow-700': color === 'yellow',
        'bg-red-100 text-red-700': color === 'red',
        'bg-gray-100 text-gray-700': color === 'gray',
    })}>
        <span className="before:content-['•'] before:absolute relative before:-left-4 before:top-[10%] before:text-2xl before:leading-3 whitespace-nowrap">
            {status}
        </span>
    </span>
}
