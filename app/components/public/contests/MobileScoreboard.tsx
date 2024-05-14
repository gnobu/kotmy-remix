import ProgressBar from './ProgressBar'
import Grade from './Grade'
import VoteLink from './VoteLink'
import { numberSlang } from '~/lib/numbers.utils'
import { noImage } from '~/assets/images'
import { IContestant } from '~/models/contestant/types/contestant.interface'
import { Social } from '~/models/contest/types/contest.interface'

export default function MobileScoreboard({ contestants, socialMediaType }: { contestants: IContestant[], socialMediaType: Social }) {
    return (
        <div className="grid gap-6 sm:hidden">
            {contestants.map(contestant => (
                <article key={contestant._id} className='bg-secondary border border-primary rounded-xl p-3 w-full'>
                    <div className="flex gap-4 mb-4 items-center">
                        <span className='font-satoshi-bold'>{contestant.result.position}.</span>
                        <img src={contestant.image_url || noImage} alt="person smiling" width={90} height={90} className='rounded-full aspect-square object-cover' />
                        <div className="flex flex-col gap-2 grow">
                            <p className='uppercase text-sm font-satoshi-medium text-ellipsis overflow-hidden'>
                                {`${contestant.contestant_biodata.first_name} ${contestant.contestant_biodata.last_name}`}
                            </p>
                            <ProgressBar percentage={contestant.result.overall_vote_percentage} />
                            <Grade grade={contestant.result.grade} />
                        </div>
                    </div>
                    <p className='mb-2 text-xs font-satoshi-bold text-[#5F6D7E]'>Vote for this contestant</p>
                    <div className="grid grid-cols-3 gap-3">
                        <VoteLink type={socialMediaType}
                            url={contestant.social_media_url}
                            count={numberSlang(contestant.vote.social_media)}
                        />
                        <VoteLink type={'tally'} url={'.'} count={numberSlang(contestant.vote.tally)} />
                        {/* <VoteLink type={'givaah'} url={'.'} count={numberSlang(contestant.vote.givaah)} /> */}
                    </div>
                </article>
            ))}
        </div>
    )
}
