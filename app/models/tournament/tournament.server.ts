import { ApiCall } from "~/lib/api/fetcher"
import { ICreateTournamentDto, ITournament, ITournamentDto, ITournamentRepository, dtoToTournament } from "./types/tournament.interface"
import { MethodsEnum } from "~/lib/api/types/methods.interface"
import { ApiEndPoints } from "~/lib/api/endpoints"
import { TFetcherResponse } from "~/lib/api/types/fetcher.interface"

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWZjNTg0ZDdiNmI5Y2RlODI2MTg3MCIsImlzX2FkbWluIjp0cnVlLCJyb2xlcyI6WyJ1c2VyIl0sImV4cCI6MTczMTk2NDg1Nn0.dDA5RkNkP4kf4sWrfivrP8dSYgR0a10BZra_Pk01IBQ"

class TournamentRepository implements ITournamentRepository {
    async getTournaments(): Promise<TFetcherResponse<ITournament[]>> {
        const { data: tournaments, error } = await ApiCall.call<ITournamentDto[], unknown>({
            url: ApiEndPoints.getTournaments
        })
        if (error) return { error }
        return { data: tournaments.map(tournament => dtoToTournament(tournament)) }
    }
    async getTournamentById(tournamentId: string): Promise<TFetcherResponse<ITournament | null>> {
        const { data: tournament, error } = await ApiCall.call<ITournamentDto, unknown>({
            method: MethodsEnum.GET,
            url: ApiEndPoints.getTournamentById(tournamentId)
        })
        if (error || !tournament) return { error: error ?? { detail: 'Tournament was not found' } }
        return { data: dtoToTournament(tournament) }
    }
    createTournament(tournament: Partial<ITournament>, token: string): Promise<TFetcherResponse<ITournament>> {
        throw new Error("Method not implemented.")
    }
    async updateTournament({ id, dto, token = TOKEN }: { id: string; dto: FormData; token?: string }): Promise<TFetcherResponse<ITournament>> {
        const { data: tournament, error } = await ApiCall.call<ITournamentDto | null, unknown>({
            url: ApiEndPoints.updateTournament(id),
            method: MethodsEnum.PUT,
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            },
            data: dto
        })
        if (error || !tournament) return { error: error ?? { detail: 'Tournament was not found' } }
        return { data: dtoToTournament(tournament) }
    }
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

export function prepareTournamentDto(formData: FormData) {
    const payloadObj: ICreateTournamentDto = {
        name: formData.get('name') as string,
        unique_id: formData.get('uniqueId') as string,
        desc: formData.get('description') as string,
        image: formData.get('image') as File || null,
    }
    const payload = new FormData()
    Object.entries(payloadObj).forEach(([key, value]) => {
        if (value !== null || value != undefined) payload.append(key, value)
    })
    return payload
}