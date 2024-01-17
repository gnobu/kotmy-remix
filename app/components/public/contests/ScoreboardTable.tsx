import { scoreboardData } from "~/lib/data/scoreboardData"
import VoteLink from "./VoteLink"
import ProgressBar from "./ProgressBar"
import { numberSlang } from "~/lib/numbers.utils"
import Grade from "./Grade"

export default function ScoreboardTable({ data }: { data: typeof scoreboardData }) {
    return (
        <table className="w-full table-auto hidden sm:table">
            <thead>
                <tr className="border-b border-secondary">
                    <th className="text-left uppercase text-sm font-satoshi-bold px-6 py-3">position</th>
                    <th className="text-left uppercase text-sm font-satoshi-bold px-6 py-3">name</th>
                    <th className="text-left uppercase text-sm font-satoshi-bold px-6 py-3 hidden lg:table-cell">progress</th>
                    <th className="text-left uppercase text-sm font-satoshi-bold px-6 py-3  hidden xl:table-cell">grade</th>
                    <th className="text-left uppercase text-sm font-satoshi-bold px-6 py-3">votes (SM, tally, givaah)</th>
                </tr>
            </thead>
            <tbody>
                {data.map((contestant, index) => (
                    <tr key={index} className="border-b border-secondary">
                        <td className="px-6 py-3">{contestant.position}</td>
                        <td className="px-6 py-3 font-satoshi-medium max-w-[300px] truncate uppercase">
                            <div className="flex items-center gap-2">
                                <img src={contestant.image} alt="person smiling" width={48} className='rounded-full aspect-square object-cover' />
                                <div className="truncate uppercase grow">
                                    {contestant.name}
                                    <dl className="lg:hidden">
                                        <dt className="sr-only">progress</dt>
                                        <dd><ProgressBar percentage={contestant.progress} /></dd>
                                        <dt className="sr-only">grade</dt>
                                        <dd><Grade grade={contestant.grade} /></dd>
                                    </dl>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-3 hidden lg:table-cell">
                            <ProgressBar percentage={contestant.progress} />
                            <dl className="xl:hidden">
                                <dt className="sr-only">grade</dt>
                                <dd><Grade grade={contestant.grade} /></dd>
                            </dl>
                        </td>
                        <td className="px-6 py-3 hidden xl:table-cell"><Grade grade={contestant.grade} /></td>
                        <td className="px-6 py-3 grid grid-cols-3 gap-2">
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
