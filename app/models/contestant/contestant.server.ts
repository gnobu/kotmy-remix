import { TFetcherResponse } from "~/lib/api/types/fetcher.interface"
import { IContestant, IContestantRepository, ILeanContestant } from "./types/contestant.interface"
import { ApiCall } from "~/lib/api/fetcher"
import { MethodsEnum } from "~/lib/api/types/methods.interface"
import { ApiEndPoints } from "~/lib/api/endpoints"

class ContestantRepository implements IContestantRepository {
    async registerContestant(payload: { contestId: string, dto: FormData }): Promise<TFetcherResponse<IContestant>> {
        return await ApiCall.call({
            method: MethodsEnum.POST,
            url: ApiEndPoints.registerContestant(payload.contestId),
            headers: { "Content-Type": "multipart/form-data" },
            data: payload.dto
        })
    }
    updateContestant(): Promise<TFetcherResponse<IContestant>> {
        throw new Error("Method not implemented.")
    }
    voteContestant(): Promise<TFetcherResponse<ILeanContestant>> {
        throw new Error("Method not implemented.")
    }
    toggleEvictContestant(): Promise<TFetcherResponse<ILeanContestant>> {
        throw new Error("Method not implemented.")
    }
}

export const contestantRepo = new ContestantRepository()