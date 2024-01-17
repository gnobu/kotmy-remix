import { scoreboardData } from '~/lib/data/scoreboardData'
import ProgressBar from './ProgressBar'
import Grade from './Grade'
import VoteLink from './VoteLink'
import { numberSlang } from '~/lib/numbers.utils'

export default function MobileScoreboard({ data }: { data: typeof scoreboardData }) {
    return (
        <div className="grid gap-6 sm:hidden">
            {data.map(contestant => (
                <article className='bg-secondary border border-primary rounded-xl p-3 w-full'>
                    <div className="flex gap-4 mb-4 items-center">
                        <span className='font-satoshi-bold'>{contestant.position}.</span>
                        <img src={contestant.image} alt="person smiling" width={90} height={90} className='rounded-full aspect-square object-cover' />
                        <div className="flex flex-col gap-2 grow">
                            <p className='uppercase text-sm font-satoshi-medium text-ellipsis overflow-hidden'>{contestant.name}</p>
                            <ProgressBar percentage={contestant.progress} />
                            <Grade grade={contestant.grade} />
                        </div>
                    </div>
                    <p className='mb-2 text-xs font-satoshi-bold text-[#5F6D7E]'>Vote for this contestant</p>
                    <div className="grid grid-cols-3 gap-3">
                        <VoteLink type={contestant.votes.social_media.type}
                            url={contestant.votes.social_media.url}
                            count={numberSlang(contestant.votes.social_media.count)}
                        />
                        <VoteLink type={'tally'} url={'.'} count={numberSlang(contestant.votes.tally)} />
                        <VoteLink type={'givaah'} url={'.'} count={numberSlang(contestant.votes.givaah)} />
                    </div>
                </article>
            ))}
        </div>
    )
}
