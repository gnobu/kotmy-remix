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
        contestId: 'kotm1',
        status: 'registering',
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
    },
    {
        id: '2',
        image: contestImage2,
        title: 'Kid of January 2024',
        tournamentId: '1',
        contestId: 'kotm2',
        status: 'ongoing',
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
    },
    {
        id: '3',
        image: contestImage1,
        title: 'Kid of December 2023',
        tournamentId: '1',
        contestId: 'kotm3',
        status: 'completed',
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
    },
    {
        id: '4',
        image: contestImage2,
        title: 'Kid of the Year 2025',
        tournamentId: '2',
        contestId: 'koty4',
        status: 'registering',
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
    },
    {
        id: '5',
        image: contestImage1,
        title: 'Kid of the Year 2024',
        tournamentId: '2',
        contestId: 'koty5',
        status: 'ongoing',
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
    },
    {
        id: '6',
        image: contestImage2,
        title: 'Kid of the Year 2023',
        tournamentId: '2',
        contestId: 'koty6',
        status: 'completed',
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
    },
    {
        id: '7',
        image: contestImage2,
        title: 'My Birthday Splash February 2024',
        tournamentId: '3',
        contestId: 'mbds7',
        status: 'registering',
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
    },
    {
        id: '8',
        image: contestImage1,
        title: 'My Birthday Splash January 2024',
        tournamentId: '3',
        contestId: 'mbds8',
        status: 'ongoing',
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
    },
    {
        id: '9',
        image: contestImage2,
        title: 'My Birthday Splash December 2023',
        tournamentId: '3',
        contestId: 'mbds9',
        status: 'completed',
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
    },
]

export async function getTournaments(): Promise<Tournament[]> {
    return tournaments
}

export async function getTournament(id: string): Promise<Tournament | null> {
    return tournaments.find(tournament => tournament.id === id) ?? null
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