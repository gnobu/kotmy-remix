import { Link } from "@remix-run/react"
import { Contest } from "~/lib/data/types/contest.interface"
import StatusTag from "./StatusTag"

type Props = { contest: Contest, to: string, withTag?: boolean, withCategory?: boolean }

export default function ContestCard({ contest, to, withTag, withCategory }: Props) {
    return (
        <Link to={to} className="flex flex-col gap-2 max-w-lg relative">
            <img src={contest.image} alt="contest image" className="rounded-3xl" />
            {withTag ? <StatusTag status={contest.status} className="absolute top-4 left-4" /> : null}
            {withCategory ? <span className="text-sm">Category</span> : null}
            <p className="text-2xl font-bold capitalize">{contest.title}</p>
        </Link>
    )
}
