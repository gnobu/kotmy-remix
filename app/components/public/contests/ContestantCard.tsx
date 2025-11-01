import { IContestant } from '~/services/contestant/types/contestant.interface'
import { noImage } from '~/assets/images'
import SocialLink from './SocialLink'
import { Social } from '~/services/contest/types/contest.interface'
import TallyVoteDialog from './TallyVoteDialog'

export default function ContestantCard({ contestant, socialMedia }: { contestant: IContestant, socialMedia: Social }) {
    const fullName = `${contestant.contestant_biodata.first_name} ${contestant.contestant_biodata.last_name}`
    return (
        <article className='border-2 border-primary rounded-3xl overflow-hidden'>
            <img src={contestant.image_url || noImage} alt="person smiling" className='w-full h-80 object-cover object-top' />
            <div className="p-4 bg-secondary">
                <span className='block text-[#5F6D7E] text-sm font-medium mb-2'>Vote now for your favorite contestant</span>
                <span className='block font-black uppercase mb-4'>{fullName}</span>
                <div className="grid grid-cols-2 gap-4">
                    {socialMedia === "kotmy"
                        ? <SocialLink
                            type={socialMedia}
                            url={contestant.social_media_url}
                            voted={contestant.result.device_voted_for_contestant}
                            contestantId={contestant._id}
                            stageId={contestant.stage_id}
                        />
                        : <SocialLink
                            type={socialMedia}
                            url={contestant.social_media_url}
                            voted={contestant.result.device_voted_for_contestant}
                        />
                    }
                    <TallyVoteDialog contestant={contestant}>
                        <SocialLink type='tally' className='w-full' />
                    </TallyVoteDialog>
                    {/* <SocialLink type='givaah' url='.' /> */}
                </div>
            </div>
        </article>
    )
}
