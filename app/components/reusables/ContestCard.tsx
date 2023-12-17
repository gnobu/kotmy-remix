import { Link } from "@remix-run/react";
import { Contest } from "~/lib/data/types/contest.interface";

export default function ContestCard({ contest }: { contest: Contest }) {
    return (
        <Link to={`/contests/${contest._id}`} className="flex flex-col gap-2 max-w-lg">
            <img src={contest.image} alt="contest image" className="rounded-3xl" />
            <p className="text-2xl font-bold capitalize">{contest.title}</p>
        </Link>
    )
}
