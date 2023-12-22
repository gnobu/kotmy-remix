import { Link } from "@remix-run/react";
import { Contest } from "~/lib/data/types/contest.interface";

export default function ContestCard({ contest, to }: { contest: Contest, to: string; }) {
    return (
        <Link to={to} className="flex flex-col gap-2 max-w-lg">
            <img src={contest.image} alt="contest image" className="rounded-3xl" />
            <p className="text-2xl font-bold capitalize">{contest.title}</p>
        </Link>
    )
}
