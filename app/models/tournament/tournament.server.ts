import { ApiCall } from "~/lib/api/fetcher"
import { ITournamentDTO, ITournamentRepository, ITournamentWContestDTO } from "./types/tournament.interface"
import { MethodsEnum } from "~/lib/api/types/methods.interface"
import { ApiEndPoints } from "~/lib/api/endpoints"
import { IPagedModel } from "~/lib/api/types/paged-model.interface"

export class TournamentRepository implements ITournamentRepository {
    async getTournaments(): Promise<ITournamentDTO[]> {
        return await ApiCall.call({
            url: ApiEndPoints.getTournaments
        })
    }
    async getTournamentsWContests(): Promise<ITournamentWContestDTO[]> {
        return await ApiCall.call({
            url: ApiEndPoints.getTournaments
        })
    }
    async getTournamentById(tournamentId: string): Promise<ITournamentDTO | null> {
        return await ApiCall.call({
            method: MethodsEnum.GET,
            url: `${ApiEndPoints.getTournaments}/${tournamentId}`
        })
    }
    async createTournament(tournament: Partial<ITournamentDTO>, token: string): Promise<ITournamentDTO> {
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
    async getTournamentsPaged(page: number): Promise<IPagedModel<ITournamentDTO>> {
        return await ApiCall.call({
            method: MethodsEnum.GET,
            url: ApiEndPoints.getTournamentsPaged(page)
        })
    }
}