import { ApiCall } from "~/lib/api/fetcher"
import { MethodsEnum } from "~/lib/api/types/methods.interface"
import { ApiEndPoints } from "~/lib/api/endpoints"
import { Grade, IContest, IContestDto, IContestRepository, IContestWFinalResult, IContestWStage, ICreateContestDTO, IMigrateStageDTO, IStage, IStageWContestant, Social, WinnerQueryDTO, WinnerResponse, dtoToContest } from "./types/contest.interface"
import { TFetcherResponse } from "~/lib/api/types/fetcher.interface"
import { setToast } from "~/lib/session.server"
import { json } from "@remix-run/node"

let TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZjFkYTc3MTU1MzE3NzdjMDMwZWI2NCIsImVtYWlsIjoiYXR1bWFzYW11ZWxva3BhcmEzQGdtYWlsLmNvbSIsImlzX3N0YWZmIjp0cnVlLCJpc19zdXBlcnVzZXIiOnRydWUsInJvbGVzIjpbXSwicGVybWlzc2lvbnMiOltdLCJleHAiOjE3NzExNzM0NDJ9.sHAuj-OTgwKuSpgrsY0vjPeHHnOJNzENSxmYIFo414k"

export class ContestRepository implements IContestRepository {

    
    /**
     *
     */
    constructor() {
    }
    async createContest(contest: FormData,  token = TOKEN): Promise<TFetcherResponse<IContest>> {
        contest.entries().forEach(([key, value]) => {
            console.log(`${key}: ${value}`)
        })
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
    async getContestById(contestId: string): Promise<TFetcherResponse<IContestWStage>> {
        const { data: contest, error } = await ApiCall.call<IContestDto | null, unknown>({
            url: ApiEndPoints.getContestById(contestId)
        })
        if (error || !contest) return { error: error ?? { detail: "The contest was not found" } }
        return { data: dtoToContest(contest) as IContestWStage }
    }
    async adminGetContestsInTournament(tournamentUniqueId: string, token = TOKEN): Promise<TFetcherResponse<IContestWStage[]>> {
        const { data: contests, error } = await ApiCall.call<IContestDto[], unknown>({
            url: ApiEndPoints.adminGetContestsInTournament(tournamentUniqueId),
            headers: { Authorization: `Bearer ${token}` },
        })
        if (contests) return { data: contests.map(contest => dtoToContest(contest) as IContestWStage) }
        return { error }
    }
    async getContestsInTournament(tournamentUniqueId: string): Promise<TFetcherResponse<IContestWStage[]>> {
        const { data: contests, error } = await ApiCall.call<IContestDto[], unknown>({
            url: ApiEndPoints.getContestsInTournament(tournamentUniqueId),
        })
        if (contests) return { data: contests.map(contest => dtoToContest(contest) as IContestWStage) }
        return { error }
    }
    async updateContest({ contestId, dto, token = TOKEN }: { contestId: string, dto: FormData, token?: string }): Promise<TFetcherResponse<IContestWStage>> {
        const { data: contest, error } = await ApiCall.call<IContestDto | null, unknown>({
            url: ApiEndPoints.updateContest(contestId),
            method: MethodsEnum.PUT,
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            },
            data: dto
        })
        if (error || !contest) return { error: error ?? { detail: "This contest no longer exists" } }
        return { data: dtoToContest(contest) as IContestWStage }
    }
    async updateStage({ stageId, dto, token = TOKEN }: { stageId: string; dto: Partial<IStage>; token?: string }): Promise<TFetcherResponse<IStage>> {
        const { data: stage, error } = await ApiCall.call<IStage | null, unknown>({
            url: ApiEndPoints.updateStage(stageId),
            method: MethodsEnum.PATCH,
            headers: { Authorization: `Bearer ${token}` },
            data: dto
        })
        if (error || !stage) return { error: error ?? { detail: "The stage was not found" } }
        return { data: stage }
    }
    async deleteStage({ stageId, token = TOKEN }: { stageId: string; token?: string }): Promise<TFetcherResponse<null>> {
        const { data, error } = await ApiCall.call<null, unknown>({
            url: ApiEndPoints.deleteStage(stageId),
            method: MethodsEnum.DELETE,
            headers: { Authorization: `Bearer ${token}` }
        })
        if (error) return { error: error }
        return { data }
    }
    async toggleRegistration({ contestId, token = TOKEN }: { contestId: string; token?: string }): Promise<TFetcherResponse<IContest>> {
        const { data: contest, error } = await ApiCall.call<IContestDto | null, unknown>({
            url: ApiEndPoints.toggleRegistration({ contestId }),
            method: MethodsEnum.PATCH,
            headers: { Authorization: `Bearer ${token}` }
        })
        if (error || !contest) return { error: error ?? { detail: "The contest was not found" } }
        return { data: dtoToContest(contest) as IContestWStage }
    }
    async getContestantsInStage(stageId: string, headers: { fingerprint: string }): Promise<TFetcherResponse<IStageWContestant>> {
        const { data, error } = await ApiCall.call<IStageWContestant, unknown>({
            url: ApiEndPoints.getContestantsInStage(stageId),
            headers: { device_fingerprint: headers.fingerprint }
        })
        if (error) return { error: error ?? { detail: "Could not fetch the stage data" } }
        return { data }
    }
    async migrateStage(payload: IMigrateStageDTO, token = TOKEN): Promise<TFetcherResponse<IStageWContestant>> {
        return await ApiCall.call({
            url: ApiEndPoints.migrateStage,
            method: MethodsEnum.POST,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: payload
        })
    }

    async getWinners(query?: WinnerQueryDTO): Promise<TFetcherResponse<WinnerResponse[]>> {
        const queryString = ApiCall.convertObjToQueryString(query || {});

        const { data, error } = await ApiCall.call<WinnerResponse[], unknown>({
            url: ApiEndPoints.getWinners + "?" + queryString.toString(),
            method: MethodsEnum.POST,
        })
        if (error) return { error: error ?? { detail: "Could not fetch the winners data" } }
        return { data }
    }

    async getWinnerById(winnerId: string): Promise<TFetcherResponse<WinnerResponse>> {

        const { data, error } = await ApiCall.call<WinnerResponse, unknown>({
            url: ApiEndPoints.getWinner(winnerId),
            method: MethodsEnum.GET,
        })
        if (error) return { error: error ?? { detail: "Could not fetch the winner's data" } }
        return { data }
    }

    
}
export const contestRepo = new ContestRepository()

export function prepareContestPayload(formData: FormData) {
    const no_of_stages = parseInt(formData.get('no_of_stages') as string)
    const stages = []
    for (let i = 1; i <= no_of_stages; i++) {
        stages.push({
            "_id": formData.get(`stage_${i}_id`),
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
        image: formData.get('image') ?  null: (formData.get('image') as File).size === 0 ? null : formData.get('image') as File,
        categories: JSON.stringify(formData.getAll('category')),
        no_of_stages: no_of_stages,
        stages: JSON.stringify(stages)
    }
    console.log(payloadObj)
    const payload = new FormData()
    Object.entries(payloadObj).forEach(([key, value]) => {
        if (value !== null || value != undefined) payload.append(key, value)
    })
    return payload
}

export async function deleteContest(formData: FormData, request: Request) {
    const contestId = formData.get('contestId') as string
    const { data, error } = await contestRepo.deleteContest(contestId)
    if (data) {
        const { headers } = await setToast({ request, toast: `success::The contest has been deleted::${Date.now()}` })
        return json(null, { headers })
    }
    const { headers } = await setToast({ request, toast: `error::Could not delete the contest::${Date.now()}` })
    return json(error, { headers })
}

export async function updateStage(formData: FormData, request: Request) {
    const stageId = formData.get("stageId") as string
    const dto = prepareStageDto(formData)
    const { data, error } = await contestRepo.updateStage({ stageId, dto })
    if (error) {
        const { headers } = await setToast({ request, toast: `error::${error.detail}::${Date.now()}` })
        return json(error, { headers })
    }
    const { headers } = await setToast({ request, toast: `success::The stage has been updated::${Date.now()}` })
    return json(data, { headers })
}

export async function toggleRegistration(formData: FormData, request: Request) {
    const contestId = formData.get("contestId") as string
    const { data, error } = await contestRepo.toggleRegistration({ contestId })
    if (error) {
        const { headers } = await setToast({ request, toast: `error::${error.detail || 'Could not perform the action'}::${Date.now()}` })
        return json(error, { headers })
    }
    const { headers } = await setToast({ request, toast: `success::The contest has been updated::${Date.now()}` })
    return json(data, { headers })
}

export function prepareStageDto(formData: FormData) {
    return {
        "weight": parseInt(formData.get('weight') as string),
        "start_date": new Date(formData.get('start_date') as string).toISOString(),
        "end_date": new Date(formData.get('end_date') as string).toISOString(),
        "rates": {
            "social_media": {
                "type": formData.get('social_media_type') as Social,
                "amount": parseInt(formData.get('social_media_rate') as string),
            },
            "tally": parseInt(formData.get('tally_rate') as string),
            "judge": parseInt(formData.get('judge_rate') as string),
            "givaah": parseInt(formData.get('givaah_rate') as string),
        },
        "success_count": parseInt(formData.get('success_count') as string),
        "grade": {
            "A": [parseInt(formData.get('min_A') as string), parseInt(formData.get('max_A') as string)],
            "B": [parseInt(formData.get('min_B') as string), parseInt(formData.get('max_B') as string)],
            "C": [parseInt(formData.get('min_C') as string), parseInt(formData.get('max_C') as string)],
            "D": [parseInt(formData.get('min_D') as string), parseInt(formData.get('max_D') as string)],
            "E": [parseInt(formData.get('min_E') as string), parseInt(formData.get('max_E') as string)],
            "F": [parseInt(formData.get('min_F') as string), parseInt(formData.get('max_F') as string)]
        } satisfies Record<Grade, [number, number]>
    }
}

export async function migrateStage(formData: FormData, request: Request) {
    const payload: IMigrateStageDTO = {
        current_stage_id: formData.get("from") as string,
        new_stage_id: formData.get("to") as string
    }
    const { data, error } = await contestRepo.migrateStage(payload)
    if (error) {
        const { headers } = await setToast({ request, toast: `error::${error.detail || 'Could not perform the action'}::${Date.now()}` })
        return json(error, { headers })
    }
    const { headers } = await setToast({ request, toast: `success::Contestants have been migrated to the next stage::${Date.now()}` })
    return json(data, { headers })
}

export async function getFinalResultForContest(contestUniqueId: string): Promise<TFetcherResponse<IContestWFinalResult>> {
    // await ApiCall.call()
    const { data: contest, error } = await ApiCall.call<IContestWFinalResult, unknown>({
            url: ApiEndPoints.finalResultForContest(contestUniqueId),
        })
        if(contest) return {data: contest}
        return { error }
}