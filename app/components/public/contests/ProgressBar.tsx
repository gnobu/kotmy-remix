import { useEffect, useRef } from 'react'

export default function ProgressBar({ percentage }: { percentage: number }) {
    const progressBar = useRef<HTMLDivElement>(null)
    useEffect(() => {
        progressBar.current?.style.setProperty('--progress', `${percentage}%`)
    }, [])
    return (
        <div className="flex items-center gap-2">
            <div ref={progressBar} className="progressBar w-full sm:min-w-[70px] h-2 bg-[#EAEBF0] rounded">
                <div className="progress h-full w-[--progress] bg-[#6246EA] rounded"></div>
            </div>
            <span className='text-sm font-bold'>{percentage.toFixed(1)}%</span>
        </div>
    )
}
