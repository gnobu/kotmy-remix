import { ApiCall } from "~/lib/api/fetcher"
import { ITournament, ITournamentDto, ITournamentRepository, dtoToTournament } from "./types/tournament.interface"
import { MethodsEnum } from "~/lib/api/types/methods.interface"
import { ApiEndPoints } from "~/lib/api/endpoints"
import { IPagedModel } from "~/lib/api/types/paged-model.interface"

class TournamentRepository implements ITournamentRepository {
    async getTournaments(): Promise<ITournament[]> {
        const tournaments = await ApiCall.call({
            url: ApiEndPoints.getTournaments
        }) as ITournamentDto[]
        return tournaments.map(tournament => dtoToTournament(tournament))
    }
    async getTournamentById(tournamentId: string): Promise<ITournament | null> {
        return await ApiCall.call({
            method: MethodsEnum.GET,
            url: `${ApiEndPoints.getTournaments}/${tournamentId}`
        })
    }
    async createTournament(tournament: Partial<ITournament>, token: string): Promise<ITournament> {
        return await ApiCall.call({
            method: MethodsEnum.POST,
            url: ApiEndPoints.createTournament,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            data: JSON.stringify(tournament)
        })
    }
    async getTournamentsPaged(page: number): Promise<IPagedModel<ITournament>> {
        return await ApiCall.call({
            method: MethodsEnum.GET,
            url: ApiEndPoints.getTournamentsPaged(page)
        })
    }
}
export const tournamentRepo = new TournamentRepository()