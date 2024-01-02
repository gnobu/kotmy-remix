import cn from 'classnames'
import { Status } from '~/lib/types/contest.interface'
import Svg from './Svg'
import { icons } from '~/assets/icons'

export default function StatusTag({ status, className }: { status: Status, className?: string }) {
    return (
        <span className={cn(`w-fit px-4 py-2 rounded-md text-sm capitalize font-satoshi-medium flex gap-2 items-center ${className}`, {
            'bg-yellow-100 text-yellow-700': status === 'registering',
            'bg-green-100 text-green-700': status === 'ongoing',
            'bg-red-100 text-red-700': status === 'completed',
        })}><Svg src={icons.activeDotIcon} width={'.5em'} /> {status}</span>
    )
}
