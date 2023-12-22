import { Link } from "@remix-run/react";
import cn from "classnames";
import { Contest } from "~/lib/data/types/contest.interface";

type Props = { contest: Contest, to: string, withTag?: boolean, withCategory?: boolean }

export default function ContestCard({ contest, to, withTag, withCategory }: Props) {
    return (
        <Link to={to} className="flex flex-col gap-2 max-w-lg relative">
            <img src={contest.image} alt="contest image" className="rounded-3xl" />
            {withTag ? <span className={cn("px-4 py-2 rounded-full absolute uppercase font-satoshi-medium top-4 left-4", {
                'bg-registering': contest.status === 'registering',
                'bg-ongoing': contest.status === 'ongoing',
                'bg-completed': contest.status === 'completed',
            })}>{contest.status}</span> : null}
            {withCategory ? <span className="text-sm">Category</span> : null}
            <p className="text-2xl font-bold capitalize">{contest.title}</p>
        </Link>
    )
}
