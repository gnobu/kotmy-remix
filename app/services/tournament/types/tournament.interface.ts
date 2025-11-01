import { TFetcherResponse } from "~/lib/api/types/fetcher.interface"
import { IContest, IContestDto, dtoToContestInTournament } from "~/services/contest/types/contest.interface"

export interface ITournamentDto {
    _id: string
    str_id: string
    created_at: string
    updated_at: string
    is_deleted: boolean
    unique_id: string
    name: string
    desc: string
    image_url: string | null
    contests: Pick<IContestDto, 'contest_unique_id' | '_id' | 'image_url' | 'name' | 'status'>[]
}

export interface ICreateTournamentDto {
    name: string
    desc: string
    unique_id: string
    image: File | null
}

export interface ITournament {
    _id: string
    id: string
    name: string
    description: string
    image: string | null
    contests: Pick<IContest, 'id' | 'image' | 'name' | 'status'>[]
}

export interface ITournamentRepository {
    getTournaments(): Promise<TFetcherResponse<ITournament[]>>
    getTournamentById(tournamentId: string): Promise<TFetcherResponse<ITournament>>
    createTournament(dto: FormData, token: string): Promise<TFetcherResponse<ITournament>>
    updateTournament(payload: { id: string; dto: FormData; token: string }): Promise<TFetcherResponse<ITournament>>
    deleteTournament(tournamentId: string, token: string): Promise<TFetcherResponse<null>>
}

export function dtoToTournament(tournament: ITournamentDto): ITournament {
    return {
        _id: tournament._id,
        id: tournament.unique_id,
        name: tournament.name,
        description: tournament.desc,
        image: tournament.image_url,
        contests: tournament.contests?.map(contest => dtoToContestInTournament(contest))
    }
}