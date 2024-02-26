import { Link } from "@remix-run/react"
import StatusTag from "./StatusTag"
import { ContestStatus } from "~/models/contest/types/contest.interface"

type Props = | {
    contest: { id: string, name: string, image: string | null },
    to: string, withCategory?: boolean, withTag?: false
} | {
    contest: { id: string, name: string, image: string | null, status: ContestStatus },
    to: string, withCategory?: boolean, withTag: true
}

export default function ContestCard({ contest, to, withTag, withCategory }: Props) {
    const status = withTag ? contest.status : null
    const color = status === 'registering'
        ? 'yellow' : status === 'ongoing'
            ? 'green' : status === 'completed'
                ? 'red' : 'gray'
    return (
        <Link to={to} className="flex flex-col gap-2 max-w-lg relative">
            <img src={contest.image ?? ''} alt="contest image" className="rounded-3xl" />
            {withTag ? <StatusTag status={contest.status} className="absolute top-4 left-4" color={color} /> : null}
            {withCategory ? <span className="text-sm">Category</span> : null}
            <p className="text-2xl font-bold capitalize">{contest.name}</p>
        </Link>
    )
}
