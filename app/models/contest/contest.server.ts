import { ApiCall } from "~/lib/api/fetcher"
import { MethodsEnum } from "~/lib/api/types/methods.interface"
import { ApiEndPoints } from "~/lib/api/endpoints"
import { IContest, IContestDto, IContestRepository, dtoToContest } from "./types/contest.interface"

class ContestRepository implements IContestRepository {
    async getContests(): Promise<IContest[]> {
        const contests = await ApiCall.call({
            url: ApiEndPoints.getContests
        }) as IContestDto[]
        return contests.map(contest => dtoToContest(contest))
    }
    async getContestById(contestId: string): Promise<IContest | null> {
        return await ApiCall.call({
            method: MethodsEnum.GET,
            url: `${ApiEndPoints.getContests}/${contestId}`
        })
    }
    async createContest(contest: Partial<IContest>, token: string): Promise<IContest> {
        return await ApiCall.call({
            method: MethodsEnum.POST,
            url: ApiEndPoints.createContest,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            data: JSON.stringify(contest)
        })
    }
    async deleteContest(contestId: string): Promise<string | null> {
        return await ApiCall.call({
            method: MethodsEnum.GET,
            url: ApiEndPoints.deleteContest(contestId)
        })
    }
    async updateContest(contestId: string): Promise<IContest | null> {
        throw new Error("Method not implemented.")
    }
}
export const contestRepo = new ContestRepository()