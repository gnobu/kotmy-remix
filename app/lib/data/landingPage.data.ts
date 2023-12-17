import { icons } from "~/assets/icons"
import { contestImage1 } from "~/assets/images"

export const whyUsData = [
    {
        icon: icons.noteIcon,
        bg: 'bg-[#12457A]',
        title: 'Free Registration',
        subtext: 'Unlock the thrill of creative expression by registering for our exclusive yearly and monthly contests.'
    },
    {
        icon: icons.galleryIcon,
        bg: 'bg-[#EA5A47]',
        title: 'Monthly Campaigns',
        subtext: "Successfully organized two annual and twenty-five monthly campaigns."
    },
    {
        icon: icons.cakeIcon,
        bg: 'bg-[#CE8800]',
        title: 'Memorable Birthdays',
        subtext: "To make kids' birthdays unique, memorable, exciting and entertaining."
    },
    {
        icon: icons.trophyIcon,
        bg: 'bg-[#09AD8A]',
        title: 'Exciting Contests',
        subtext: "To be entertaining, transparent, innovative, creative, exciting, effective and reliable."
    },
]

export const contests = [{
    _id: '1',
    imageUrl: contestImage1,
    title: 'Kid of the month photo contest 2023',
    tournamentId: '1',
    contestId: '1',
}]