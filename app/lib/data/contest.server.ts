import { contestImage1, contestImage2 } from "~/assets/images"
import { Contest, Tournament, TournamentWContest } from "../types/contest.interface"

export const tournaments: Tournament[] = [
    {
        id: '1',
        image: contestImage1,
        title: 'Kid of the Month Photo Contest',
        description: 'A monthly photo contest for kids of various age ranges',
        uniqueId: '1',
    },
    {
        id: '2',
        image: contestImage2,
        title: 'Kid of the Year Contest',
        description: 'An annual photo contest for kids of various age ranges',
        uniqueId: '2',
    },
    {
        id: '3',
        image: contestImage1,
        title: 'My Birthday Splash Contest',
        description: 'A monthly photo contest for kids celebrrating their birthdays in the contest month',
        uniqueId: '3',
    }
]

export const contests: Contest[] = [
    {
        id: '1',
        image: contestImage1,
        title: 'Kid of February 2024',
        tournamentId: '1',
        contestId: '1',
        status: 'registering'
    },
    {
        id: '2',
        image: contestImage2,
        title: 'Kid of January 2024',
        tournamentId: '1',
        contestId: '2',
        status: 'ongoing'
    },
    {
        id: '3',
        image: contestImage1,
        title: 'Kid of December 2023',
        tournamentId: '1',
        contestId: '3',
        status: 'completed'
    },
    {
        id: '4',
        image: contestImage2,
        title: 'Kid of the Year 2025',
        tournamentId: '2',
        contestId: '4',
        status: 'registering'
    },
    {
        id: '5',
        image: contestImage1,
        title: 'Kid of the Year 2024',
        tournamentId: '2',
        contestId: '5',
        status: 'ongoing'
    },
    {
        id: '6',
        image: contestImage2,
        title: 'Kid of the Year 2023',
        tournamentId: '2',
        contestId: '6',
        status: 'completed'
    },
    {
        id: '7',
        image: contestImage2,
        title: 'My Birthday Splash February 2024',
        tournamentId: '3',
        contestId: '7',
        status: 'registering'
    },
    {
        id: '8',
        image: contestImage1,
        title: 'My Birthday Splash January 2024',
        tournamentId: '3',
        contestId: '8',
        status: 'ongoing'
    },
    {
        id: '9',
        image: contestImage2,
        title: 'My Birthday Splash December 2023',
        tournamentId: '3',
        contestId: '9',
        status: 'completed'
    },
]

export async function getTournaments(): Promise<Tournament[]> {
    return tournaments
}

export async function getTournamentsWithContests(): Promise<TournamentWContest[]> {
    return tournaments.map(tournament => ({
        ...tournament,
        contests: contests.filter(contest => contest.tournamentId === tournament.id)
    }))
}

export async function getContests(): Promise<Contest[]> {
    return contests
}

export async function getContestsInTournament(tournamentId: string): Promise<Contest[]> {
    return contests.filter(contest => contest.tournamentId === tournamentId)
}