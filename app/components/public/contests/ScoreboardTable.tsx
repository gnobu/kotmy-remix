import ProgressBar from "./ProgressBar"
import Grade from "./Grade"
import VoteLink from "./VoteLink"
import { noImage } from "~/assets/images"
import { numberSlang } from "~/lib/numbers.utils"
import { IContestant } from "~/services/contestant/types/contestant.interface"
import { Social } from "~/services/contest/types/contest.interface"
import TallyVoteDialog from "./TallyVoteDialog"
import { useFetcher } from "@remix-run/react"

export default function ScoreboardTable({ contestants, socialMediaType }: { contestants: IContestant[], socialMediaType: Social }) {
    const fetcher = useFetcher()
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
                {contestants.map((contestant) => (
                    <tr key={contestant._id} className="border-b border-secondary">
                        <td className="px-6 py-3">{contestant.result.position}</td>
                        <td className="px-6 py-3 font-satoshi-medium max-w-[300px] truncate uppercase">
                            <div className="flex items-center gap-2">
                                <img src={contestant.image_url || noImage} alt="person smiling" width={48} className='rounded-full aspect-square object-cover' />
                                <div className="truncate uppercase grow">
                                    {`${contestant.contestant_biodata.first_name} ${contestant.contestant_biodata.last_name}`}
                                    <dl className="lg:hidden">
                                        <dt className="sr-only">progress</dt>
                                        <dd><ProgressBar percentage={contestant.result.overall_vote_percentage} /></dd>
                                        <dt className="sr-only">grade</dt>
                                        <dd><Grade grade={contestant.result.grade} /></dd>
                                    </dl>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-3 hidden lg:table-cell">
                            <ProgressBar percentage={contestant.result.overall_vote_percentage} />
                            <dl className="xl:hidden">
                                <dt className="sr-only">grade</dt>
                                <dd><Grade grade={contestant.result.grade} /></dd>
                            </dl>
                        </td>
                        <td className="px-6 py-3 hidden xl:table-cell"><Grade grade={contestant.result.grade} /></td>
                        <td className="px-6 py-3 grid grid-cols-2 gap-2">
                            {socialMediaType === "kotmy" ? (
                                <fetcher.Form method="POST">
                                    <input type="hidden" name="contestant_id" value={contestant._id} />
                                    <input type="hidden" name="stage_id" value={contestant.stage_id} />
                                    <input type="hidden" name="intent" value="kotmy_vote" />
                                    <VoteLink className="w-full" type={socialMediaType}
                                        url={contestant.social_media_url}
                                        count={numberSlang(contestant.vote.social_media)}
                                    />
                                </fetcher.Form>
                            ) : (
                                <VoteLink type={socialMediaType}
                                    url={contestant.social_media_url}
                                    count={numberSlang(contestant.vote.social_media)}
                                />
                            )}
                            <TallyVoteDialog contestant={contestant} />
                            {/* <VoteLink type={'givaah'} url={'.'} count={numberSlang(contestant.vote.givaah)} /> */}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
