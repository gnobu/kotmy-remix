import { ApiCall } from "~/lib/api/fetcher"
import { ICreateTournamentDto, ITournament, ITournamentDto, ITournamentRepository, dtoToTournament } from "./types/tournament.interface"
import { MethodsEnum } from "~/lib/api/types/methods.interface"
import { ApiEndPoints } from "~/lib/api/endpoints"
import { TFetcherResponse } from "~/lib/api/types/fetcher.interface"

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZjFkYTc3MTU1MzE3NzdjMDMwZWI2NCIsImVtYWlsIjoiYXR1bWFzYW11ZWxva3BhcmEzQGdtYWlsLmNvbSIsImlzX3N0YWZmIjp0cnVlLCJpc19zdXBlcnVzZXIiOnRydWUsInJvbGVzIjpbXSwicGVybWlzc2lvbnMiOltdLCJleHAiOjE3NzExNzM0NDJ9.sHAuj-OTgwKuSpgrsY0vjPeHHnOJNzENSxmYIFo414k"

class TournamentRepository implements ITournamentRepository {
    async getTournaments(): Promise<TFetcherResponse<ITournament[]>> {
        const { data: tournaments, error } = await ApiCall.call<ITournamentDto[], unknown>({
            url: ApiEndPoints.getTournaments
        })
        if (error) return { error }
        return { data: tournaments.map(tournament => dtoToTournament(tournament)) }
    }
    async getTournamentById(tournamentId: string): Promise<TFetcherResponse<ITournament>> {
        const { data: tournament, error } = await ApiCall.call<ITournamentDto | null, unknown>({
            method: MethodsEnum.GET,
            url: ApiEndPoints.getTournamentById(tournamentId)
        })
        if (error || !tournament) return { error: error ?? { detail: 'Tournament was not found' } }
        return { data: dtoToTournament(tournament) }
    }
    async createTournament(dto: FormData, token = TOKEN): Promise<TFetcherResponse<ITournament>> {
        const { data: tournament, error } = await ApiCall.call<ITournamentDto, unknown>({
            method: MethodsEnum.POST,
            url: ApiEndPoints.createTournament,
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            },
            data: dto
        })
        if (error) return { error }
        return { data: dtoToTournament(tournament) }
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
    async deleteTournament(tournamentId: string, token = TOKEN): Promise<TFetcherResponse<null>> {
        return await ApiCall.call({
            url: ApiEndPoints.deleteTournament(tournamentId),
            method: MethodsEnum.DELETE,
            headers: { Authorization: `Bearer ${token}` },
        })
    }
}
export const tournamentRepo = new TournamentRepository()

export function prepareTournamentDto(formData: FormData) {
    const payloadObj: ICreateTournamentDto = {
        name: formData.get('name') as string,
        unique_id: formData.get('uniqueId') as string,
        desc: formData.get('description') as string,
        image: !formData.get('image') ?  null: (formData.get('image') as File).size === 0 ? null : formData.get('image') as File,
    }
    const payload = new FormData()
    Object.entries(payloadObj).forEach(([key, value]) => {
        if (value !== null && value != undefined) payload.append(key, value)
    })
    return payload
}