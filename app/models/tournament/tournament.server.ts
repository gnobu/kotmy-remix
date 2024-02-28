import { ApiCall } from "~/lib/api/fetcher"
import { ITournament, ITournamentDto, ITournamentRepository, dtoToTournament } from "./types/tournament.interface"
import { MethodsEnum } from "~/lib/api/types/methods.interface"
import { ApiEndPoints } from "~/lib/api/endpoints"
import { IPagedModel } from "~/lib/api/types/paged-model.interface"
import { TFetcherResponse } from "~/lib/api/types/fetcher.interface"

class TournamentRepository implements ITournamentRepository {
    async getTournaments(): Promise<TFetcherResponse<ITournament[]>> {
        const { data: tournaments, error } = await ApiCall.call<ITournamentDto[], unknown>({
            url: ApiEndPoints.getTournaments
        })
        if (error) return { error }
        return { data: tournaments.map(tournament => dtoToTournament(tournament)) }
    }
    getTournamentById(tournamentId: string): Promise<TFetcherResponse<ITournament | null>> {
        throw new Error("Method not implemented.")
    }
    createTournament(tournament: Partial<ITournament>, token: string): Promise<TFetcherResponse<ITournament>> {
        throw new Error("Method not implemented.")
    }
    // async getTournamentById(tournamentId: string): Promise<ITournament | null> {
    //     return await ApiCall.call({
    //         method: MethodsEnum.GET,
    //         url: `${ApiEndPoints.getTournaments}/${tournamentId}`
    //     })
    // }
    // async createTournament(tournament: Partial<ITournament>, token: string): Promise<ITournament> {
    //     return await ApiCall.call({
    //         method: MethodsEnum.POST,
    //         url: ApiEndPoints.createTournament,
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${token}`
    //         },
    //         data: JSON.stringify(tournament)
    //     })
    // }
    // async getTournamentsPaged(page: number): Promise<IPagedModel<ITournament>> {
    //     return await ApiCall.call({
    //         method: MethodsEnum.GET,
    //         url: ApiEndPoints.getTournamentsPaged(page)
    //     })
    // }
}
export const tournamentRepo = new TournamentRepository()