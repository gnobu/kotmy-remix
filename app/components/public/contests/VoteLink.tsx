import { Link } from "@remix-run/react"
import cn from "classnames"
import Svg from "~/components/reusables/Svg"
import { socialIcons } from "~/lib/data/socials"

type Props = {
    type: keyof typeof socialIcons;
    url: string;
    count: number | string;
}

export default function VoteLink({ type, url, count }: Props) {
    return (
        <Link to={url} className={cn(`p-2 flex items-center gap- border rounded-full`, {
            'border-facebook text-facebook bg-facebookBG': type === 'facebook',
            'border-instagram text-instagram bg-instagramBG': type === 'instagram',
            'border-twitter text-twitter bg-twitterBG': type === 'twitter',
            'border-tally text-tally bg-tallyBG': type === 'tally',
            'border-givaah text-givaah bg-givaahBG': type === 'givaah',
        })}>
            <span className={cn(`w-6 h-6 flex items-center justify-center rounded-full p-1`, {
                'bg-facebook': type === 'facebook',
                'bg-instagram': type === 'instagram',
                'bg-twitter': type === 'twitter',
                'bg-tally': type === 'tally',
                'bg-givaah': type === 'givaah',
            })}>
                <Svg src={socialIcons[type]} />
            </span>
            <span className="grow text-xs font-bold text-center mr-2">{count}</span>
        </Link>
    )
}
