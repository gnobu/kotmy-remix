import { Link } from "@remix-run/react"

import StatusTag from "./StatusTag"
import { ContestStatus } from "~/services/contest/types/contest.interface"
import { noImage } from "~/assets/images"

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
        <Link to={to} className="flex flex-col gap-2 max-w-lg relative w-full">
            <img src={contest.image || noImage} alt="contest image" className="rounded-3xl h-56 object-cover" />
            {withTag ? <StatusTag status={contest.status} className="absolute top-4 left-4" color={color} /> : null}
            {withCategory ? <span className="text-sm">Category</span> : null}
            <p className="text-2xl font-bold capitalize">{contest.name}</p>
        </Link>
    )
}
