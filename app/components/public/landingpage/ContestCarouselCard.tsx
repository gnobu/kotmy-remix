import { Link } from "react-router-dom"

type Contest = {
    imageUrl: string,
    title: string,
    tournamentId: string,
    contestId: string,
}
export default function ContestCarouselCard({ contest }: { contest: Contest }) {
    const { imageUrl, title, tournamentId, contestId } = contest
    return (
        <div className="contest contest-link m-ln-auto p-ln-4">
            <h2 className="m-blk-3 p-ln-3 col-pry">{title}</h2>
            <div className="flex-col gap-1 aligned-flex">
                <Link className="" to={`/contests/${tournamentId}/${contestId}`}>
                    <div className="contest-image"
                        style={{ 'backgroundImage': `url(${imageUrl})` }}>
                    </div>
                </Link>
                <Link to={`/contests/${tournamentId}/${contestId}/registration`} className="button small r-5 p-ln-5 p-blk-2 col-sec f-w-5">Register now</Link>
            </div>
        </div>
    )
}