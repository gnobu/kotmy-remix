import { Contestant } from '~/lib/types/contestant.interface'
import SocialLink from './SocialLink'

export default function ContestantCard({ contestant }: { contestant: Contestant }) {
    return (
        <article className='border-2 border-primary rounded-3xl overflow-hidden'>
            <img src={contestant.image} alt="person smiling" className='w-full h-80 object-cover object-top' />
            <div className="p-4 bg-secondary">
                <span className='block text-[#5F6D7E] text-sm font-medium mb-2'>Vote now for your favorite contestant</span>
                <span className='block font-black uppercase mb-4'>{contestant.fullName}</span>
                <div className="grid grid-cols-2 gap-4">
                    <SocialLink type={contestant.votes.social_media.type} url={contestant.votes.social_media.url} />
                    {/* <SocialLink type='tally' url='.' />
                    <SocialLink type='givaah' url='.' /> */}
                    <SocialLink type='instagram' url='.' />
                    <SocialLink type='twitter' url='.' />
                </div>
            </div>
        </article>
    )
}
