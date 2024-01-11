export type Status = 'registering' | 'ongoing' | 'completed'

export interface Tournament {
    id: string;
    image: string;
    title: string;
    description: string;
    uniqueId: string;
}

export interface TournamentWContest extends Tournament {
    contests: Contest[];
}

export type Contest = {
    id: string;
    image: string;
    title: string;
    tournamentId: string;
    contestId: string;
    status: Status;
    start_date: string;
    end_date: string;
}