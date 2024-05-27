import { TFetcherResponse } from "~/lib/api/types/fetcher.interface"
import { IContestant, IContestantRepository, IGetTallyLinkDTO, ILeanContestant, IToggleEvictContestantDTO, IVoteContestantDto } from "./types/contestant.interface"
import { ApiCall } from "~/lib/api/fetcher"
import { MethodsEnum } from "~/lib/api/types/methods.interface"
import { ApiEndPoints } from "~/lib/api/endpoints"

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWZjNTg0ZDdiNmI5Y2RlODI2MTg3MCIsImlzX3N0YWZmIjp0cnVlLCJpc19zdXBlcnVzZXIiOnRydWUsInJvbGUiOiJhZG1pbiIsInBlcm1pc3Npb25zIjpbIm1hbmFnZSB1c2VycyIsIm1hbmFnZSBjb250ZW50IiwibWFuYWdlIGJsb2ciLCJtYW5hZ2UgcGF5bWVudCIsIm1hbmFnZSBjb250ZXN0IiwibWFuYWdlIHZvdGVzIl0sImV4cCI6MTczODE3MzAzMH0.RTojBU2VNW-XqSCfd-qWSz_JU2jYmH3BCljPSWlKrLc"

class ContestantRepository implements IContestantRepository {
    async callTallyWebhook(dto: unknown): Promise<TFetcherResponse<unknown>> {
        return await ApiCall.call({
            method: MethodsEnum.POST,
            url: ApiEndPoints.callTallyWebhook,
            headers: { "verif-hash": "FLWSECK_TESTfae195a81741" },
            data: dto
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
    async getTallyLink(dto: IGetTallyLinkDTO): Promise<TFetcherResponse<{ payment_link: string }>> {
        return await ApiCall.call({
            method: MethodsEnum.POST,
            url: ApiEndPoints.getTallyLink,
            data: dto
        })
    }
    async registerContestant(payload: { contestId: string, dto: FormData }): Promise<TFetcherResponse<IContestant>> {
        return await ApiCall.call({
            method: MethodsEnum.POST,
            url: ApiEndPoints.registerContestant(payload.contestId),
            headers: { "Content-Type": "multipart/form-data" },
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
    async voteContestant(payload: { dto: IVoteContestantDto; stageId: string; fingerprint: string }): Promise<TFetcherResponse<ILeanContestant>> {
        return await ApiCall.call({
            method: MethodsEnum.POST,
            url: ApiEndPoints.voteContestant(payload.stageId),
            headers: { device_fingerprint: payload.fingerprint },
            data: payload.dto
        })
    }
}

export const contestantRepo = new ContestantRepository()
