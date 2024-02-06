import { IContest, IContestDto, dtoToContestInTournament } from "~/models/contest/types/contest.interface"

export interface ITournamentDto {
    _id: string
    str_id: string
    created_at: string
    updated_at: string
    is_deleted: boolean,
    unique_id: string
    name: string
    description: string
    image_url: string | null,
    contests: Pick<IContestDto, 'contest_unique_id' | '_id' | 'image_url' | 'name' | 'status'>[]
}

export interface ITournament {
    id: string
    name: string
    description: string
    image: string | null
    contests: Pick<IContest, 'id' | 'image' | 'name' | 'status'>[]
}

export interface ITournamentRepository {
    getTournaments(): Promise<ITournament[]>
    getTournamentById(tournamentId: string): Promise<ITournament | null>
    createTournament(tournament: Partial<ITournament>, token: string): Promise<ITournament>
}

export function dtoToTournament(tournament: ITournamentDto): ITournament {
    return {
        id: tournament.unique_id,
        name: tournament.name,
        description: tournament.description,
        image: tournament.image_url,
        contests: tournament.contests.map(contest => dtoToContestInTournament(contest))
    }
}