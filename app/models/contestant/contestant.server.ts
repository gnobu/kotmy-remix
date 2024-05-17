import { TFetcherResponse } from "~/lib/api/types/fetcher.interface"
import { IContestant, IContestantRepository, ILeanContestant, IToggleEvictContestantDTO } from "./types/contestant.interface"
import { ApiCall } from "~/lib/api/fetcher"
import { MethodsEnum } from "~/lib/api/types/methods.interface"
import { ApiEndPoints } from "~/lib/api/endpoints"

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWZjNTg0ZDdiNmI5Y2RlODI2MTg3MCIsImlzX3N0YWZmIjp0cnVlLCJpc19zdXBlcnVzZXIiOnRydWUsInJvbGUiOiJhZG1pbiIsInBlcm1pc3Npb25zIjpbIm1hbmFnZSB1c2VycyIsIm1hbmFnZSBjb250ZW50IiwibWFuYWdlIGJsb2ciLCJtYW5hZ2UgcGF5bWVudCIsIm1hbmFnZSBjb250ZXN0IiwibWFuYWdlIHZvdGVzIl0sImV4cCI6MTczODE3MzAzMH0.RTojBU2VNW-XqSCfd-qWSz_JU2jYmH3BCljPSWlKrLc"

class ContestantRepository implements IContestantRepository {
    async registerContestant(payload: { contestId: string, dto: FormData }): Promise<TFetcherResponse<IContestant>> {
        return await ApiCall.call({
            method: MethodsEnum.POST,
            url: ApiEndPoints.registerContestant(payload.contestId),
            headers: { "Content-Type": "multipart/form-data" },
            data: payload.dto
        })
    }
    async editContestant(payload: { dto: FormData, contestantId: string }, token = TOKEN): Promise<TFetcherResponse<IContestant>> {
        return await ApiCall.call({
            method: MethodsEnum.PUT,
            url: ApiEndPoints.editContestant(payload.contestantId),
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
            data: payload.dto
        })
    }
    async toggleEvictContestants(dto: IToggleEvictContestantDTO, token = TOKEN): Promise<TFetcherResponse<void>> {
        return await ApiCall.call({
            method: MethodsEnum.PATCH,
            url: ApiEndPoints.toggleEvictContestants,
            headers: { Authorization: `Bearer ${token}` },
            data: dto
        })
    }
    voteContestant(): Promise<TFetcherResponse<ILeanContestant>> {
        throw new Error("Method not implemented.")
    }
}

export const contestantRepo = new ContestantRepository()
