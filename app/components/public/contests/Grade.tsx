import classNames from 'classnames'

export default function Grade({ grade }: { grade: string }) {
    return (
        <div className='grid grid-cols-6 rounded-md overflow-hidden text-white text-xs font-black'>
            <div className={classNames('bg-grade-F h-full px-2 py-1 text-center')}>
                {grade === 'F' ? grade : null}
            </div>
            <div className={classNames('h-full px-2 py-1 text-center', { 'bg-grade-E': grade <= 'E', 'bg-grade-Ea': grade > 'E' })}>
                {grade === 'E' ? grade : null}
            </div>
            <div className={classNames('h-full px-2 py-1 text-center', { 'bg-grade-D': grade <= 'D', 'bg-grade-Da': grade > 'D' })}>
                {grade === 'D' ? grade : null}
            </div>
            <div className={classNames('h-full px-2 py-1 text-center', { 'bg-grade-C': grade <= 'C', 'bg-grade-Ca': grade > 'C' })}>
                {grade === 'C' ? grade : null}
            </div>
            <div className={classNames('h-full px-2 py-1 text-center', { 'bg-grade-B': grade <= 'B', 'bg-grade-Ba': grade > 'B' })}>
                {grade === 'B' ? grade : null}
            </div>
            <div className={classNames('h-full px-2 py-1 text-center', { 'bg-grade-A': grade <= 'A', 'bg-grade-Aa': grade > 'A' })}>
                {grade === 'A' ? grade : null}
            </div>
        </div>
    )
}
