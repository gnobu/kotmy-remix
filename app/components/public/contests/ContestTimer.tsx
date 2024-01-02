import { useDuration } from '~/hooks/useDuration'

export default function ContestTimer({ deadline, title }: { deadline: Date, title: string }) {
    const { days, hours, minutes, seconds } = useDuration(deadline)
    return (
        <div className="my-6">
            <p className="font-satoshi-bold uppercase mb-2 text-sm">{title}</p>
            <div className="flex gap-2">
                <div className="grid text-center">
                    <span className='font-satoshi-black text-xl lg:text-2xl'>{days}</span>
                    <span className='font-satoshi-bold text-xs lg:text-base'>DAYS</span>
                </div>
                :
                <div className="grid text-center">
                    <span className='font-satoshi-black text-xl lg:text-2xl'>{hours}</span>
                    <span className='font-satoshi-bold text-xs lg:text-base'>HOURS</span>
                </div>
                :
                <div className="grid text-center">
                    <span className='font-satoshi-black text-xl lg:text-2xl'>{minutes}</span>
                    <span className='font-satoshi-bold text-xs lg:text-base'>MINUTES</span>
                </div>
                :
                <div className="grid text-center">
                    <span className='font-satoshi-black text-xl lg:text-2xl'>{seconds}</span>
                    <span className='font-satoshi-bold text-xs lg:text-base'>SECONDS</span>
                </div>
            </div>
        </div>
    )
}
