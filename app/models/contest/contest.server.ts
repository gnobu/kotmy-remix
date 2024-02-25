import { ApiCall } from "~/lib/api/fetcher"
import { MethodsEnum } from "~/lib/api/types/methods.interface"
import { ApiEndPoints } from "~/lib/api/endpoints"
import { IContest, IContestDto, IContestRepository, IContestWStage, ICreateContestDTO, dtoToContest } from "./types/contest.interface"
import { TFetcherResponse } from "~/lib/api/types/fetcher.interface"

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWZjNTg0ZDdiNmI5Y2RlODI2MTg3MCIsImlzX2FkbWluIjp0cnVlLCJyb2xlcyI6WyJ1c2VyIl0sImV4cCI6MTczMTk2NDg1Nn0.dDA5RkNkP4kf4sWrfivrP8dSYgR0a10BZra_Pk01IBQ"

class ContestRepository implements IContestRepository {
    async createContest(contest: FormData, token = TOKEN): Promise<TFetcherResponse<IContest>> {
        return await ApiCall.call({
            method: MethodsEnum.POST,
            url: ApiEndPoints.createContest,
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            },
            data: contest
        })
    }
    async deleteContest(contestId: string, token = TOKEN): Promise<TFetcherResponse<boolean>> {
        return await ApiCall.call({
            method: MethodsEnum.DELETE,
            url: ApiEndPoints.deleteContest(contestId),
            headers: { Authorization: `Bearer ${token}` },
        })
    }
    async getContests(): Promise<TFetcherResponse<IContestWStage[]>> {
        const { data: contests, error } = await ApiCall.call<IContestDto[], unknown>({
            url: ApiEndPoints.getContests
        })
        if (contests) return { data: contests.map(contest => dtoToContest(contest) as IContestWStage) }
        return { error }
    }
    // async getContestById(contestId: string): Promise<IContest | null> {
    //     return await ApiCall.call({
    //         method: MethodsEnum.GET,
    //         url: `${ApiEndPoints.getContests}/${contestId}`
    //     })
    // }
    async updateContest(contestId: string): Promise<IContest | null> {
        throw new Error("Method not implemented.")
    }
    getContestById(contestId: string): Promise<IContest | null> {
        throw new Error("Method not implemented.")
    }
}
export const contestRepo = new ContestRepository()

export function prepareCreateContestPayload(formData: FormData) {
    const no_of_stages = parseInt(formData.get('no_of_stages') as string)
    const stages = []
    for (let i = 1; i <= no_of_stages; i++) {
        stages.push({
            "stage": i,
            "weight": formData.get(`weight_${i}`),
            "rates": {
                "social_media": { "type": formData.get(`social_media_${i}`), "amount": 0 },
                "tally": 0,
                "judge": 0,
                "givaah": 0
            }
        })
    }
    const payloadObj: ICreateContestDTO = {
        name: formData.get('name') as string,
        contest_unique_id: formData.get('uniqueId') as string,
        tournament_unique_id: formData.get('tournament') as string,
        desc: formData.get('description') as string,
        reg_deadline: new Date(formData.get('reg_deadline') as string).toISOString(),
        start_date: new Date(formData.get('start_date') as string).toISOString(),
        end_date: new Date(formData.get('end_date') as string).toISOString(),
        prizes: formData.get('prizes') as string,
        add_info: formData.get('add_info') as string,
        sub_req: formData.get('sub_req') as string,
        terms_cond: formData.get('tnc') as string,
        image: formData.get('images') as File || null,
        categories: JSON.stringify(formData.getAll('category')),
        no_of_stages: no_of_stages,
        stages: JSON.stringify(stages)
    }
    const payload = new FormData()
    Object.entries(payloadObj).forEach(([key, value]) => {
        if (value !== null || value != undefined) payload.append(key, value)
    })
    return payload
}