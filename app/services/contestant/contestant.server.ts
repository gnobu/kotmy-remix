import { TFetcherResponse } from "~/lib/api/types/fetcher.interface"
import { IContestant, IContestantRepository, IEditContestantDTO, IGetTallyLinkDTO, ILeanContestant, IToggleEvictContestantDTO, IVoteContestantDto } from "./types/contestant.interface"
import { ApiCall } from "~/lib/api/fetcher"
import { MethodsEnum } from "~/lib/api/types/methods.interface"
import { ApiEndPoints } from "~/lib/api/endpoints"
import { IContestWStageWContestant } from "../contest/types/contest.interface"

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZjFkYTc3MTU1MzE3NzdjMDMwZWI2NCIsImVtYWlsIjoiYXR1bWFzYW11ZWxva3BhcmEzQGdtYWlsLmNvbSIsImlzX3N0YWZmIjp0cnVlLCJpc19zdXBlcnVzZXIiOnRydWUsInJvbGVzIjpbXSwicGVybWlzc2lvbnMiOltdLCJleHAiOjE3NzExNzM0NDJ9.sHAuj-OTgwKuSpgrsY0vjPeHHnOJNzENSxmYIFo414k"

export class ContestantRepository implements IContestantRepository {
    async callTallyWebhook(dto: unknown): Promise<TFetcherResponse<unknown>> {
        let res = await ApiCall.call({
            method: MethodsEnum.POST,
            url: ApiEndPoints.callTallyWebhook,
            // headers: { "verif-hash": "FLWSECK_TESTfae195a81741" },
            data: dto
        })
        console.log("Tally webhook called. Response:", JSON.stringify(res))
        return res
    }
    async editContestantAdmin(payload: { dto: FormData, contestantId: string }, token = TOKEN): Promise<TFetcherResponse<IContestant>> {
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
    async getContestantViaHash(hash: string): Promise<TFetcherResponse<IContestWStageWContestant>> {
        return await ApiCall.call({
            method: MethodsEnum.GET,
            url: ApiEndPoints.getContestantViaHash(hash),
        })
    }

    async getPendingUploads(cookies: string){
            const { data, error,authRequired } = await ApiCall.call<IContestWStageWContestant[], unknown>({
                method: "GET",
                url: ApiEndPoints.userPendingUploads,
                
            }, cookies)
    
            console.log({data, error})
            if(data) return {data}
            return { error, authRequired }
        }
    
    
    async getContestantDetailsWithContest(contestantId: string, cookies: string){
        if(!contestantId){
            return {error: {detail: "Please input a valid contestant id"}}
        }
        const { data, error,authRequired } = await ApiCall.call<IContestWStageWContestant, unknown>({
            method: "GET",
            url: ApiEndPoints.userContestantDeets(contestantId),
            
        }, cookies)

        console.log({data, error})
        if(data) return {data}
        return { error, authRequired }
    }

    async updateUserContestant(payload: {contestantId: string, formData: FormData, editContestantDTO?: IEditContestantDTO}, cookies?: string){
        const media = payload.formData.get('media')
        if (!(media instanceof File) || media.size === 0) {
        payload.formData.delete('media');
    }
        if(payload.editContestantDTO){
            payload.formData.set('details', JSON.stringify(payload.editContestantDTO))
        }

        const {data, error, authRequired} = await ApiCall.call({
            method: MethodsEnum.PUT,
            url: ApiEndPoints.editUserContestant(payload.contestantId),
            headers: { "Content-Type": "multipart/form-data" },
            data: payload.formData
        }, cookies)

        return {data, error, authRequired}
    }
}

export const contestantRepo = new ContestantRepository()
