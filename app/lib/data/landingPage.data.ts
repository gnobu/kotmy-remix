import { icons } from "~/assets/icons"
import { contestImage1, contestImage2 } from "~/assets/images"

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

export const contests = [
    {
        _id: '1',
        image: contestImage1,
        title: 'Kid of the Month Photo Contest 2023',
        tournamentId: '1',
        contestId: '1',
    },
    {
        _id: '2',
        image: contestImage2,
        title: 'Kid of the Year Contest 2023',
        tournamentId: '2',
        contestId: '2',
    },
    {
        _id: '3',
        image: contestImage1,
        title: 'My Birthday Splash Contest 2023',
        tournamentId: '3',
        contestId: '3',
    },
    {
        _id: '4',
        image: contestImage2,
        title: '2023 Photo contest ',
        tournamentId: '4',
        contestId: '4',
    },
    {
        _id: '5',
        image: contestImage1,
        title: 'My Partner and I Contest 2023',
        tournamentId: '5',
        contestId: '5',
    },
    {
        _id: '6',
        image: contestImage2,
        title: 'Golden Teen 2023',
        tournamentId: '6',
        contestId: '6',
    },
]