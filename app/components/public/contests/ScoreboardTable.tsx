import { scoreboardData } from "~/lib/data/scoreboardData"
import VoteLink from "./VoteLink"
import ProgressBar from "./ProgressBar"
import { numberSlang } from "~/lib/numberSlang"
import Grade from "./Grade"

const headings = Object.keys(scoreboardData[0]) as (keyof typeof scoreboardData[number])[]

export default function ScoreboardTable() {
    return (
        <table className="w-full table-auto">
            <thead>
                <tr>
                    {headings.map(heading => (
                        <th className="text-left uppercase text-sm font-satoshi-bold border-b border-secondary px-6 py-3" key={heading}>{heading}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {scoreboardData.map((contestant, index) => (
                    <tr key={index}>
                        <td className="border-b border-secondary px-6 py-3">{contestant.position}</td>
                        <td className="border-b border-secondary px-6 py-3 font-satoshi-medium">{contestant.name}</td>
                        <td className="border-b border-secondary px-6 py-3"><ProgressBar percentage={contestant.progress} /></td>
                        <td className="border-b border-secondary px-6 py-3"><Grade grade={contestant.grade}/></td>
                        <td className="border-b border-secondary px-6 py-3 grid grid-cols-3 gap-2">
                            <VoteLink type={contestant.votes.social_media.type}
                                url={contestant.votes.social_media.url}
                                count={numberSlang(contestant.votes.social_media.count)}
                            />
                            <VoteLink type={'tally'} url={'.'} count={numberSlang(contestant.votes.tally)} />
                            <VoteLink type={'givaah'} url={'.'} count={numberSlang(contestant.votes.givaah)} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
