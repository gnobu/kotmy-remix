import cn from "classnames"

export default function ToggleBtn({ onClick, on }: { on: boolean, onClick?: () => void }) {
    return (
        <button onClick={onClick} className={cn('rounded-full p-0.5 w-9 flex items-center', {
            'bg-accent justify-end': on,
            'bg-[#DAE0E6]': !on
        })}>
            <div className="bg-secondary w-4 h-4 rounded-full"></div>
        </button>
    )
}
