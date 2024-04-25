import { TFetcherResponse } from "~/lib/api/types/fetcher.interface"

export interface IContestant {
    _id: string,
    created_at: string,
    updated_at: string,
    is_deleted: boolean,
    stage_id: string,
    contestant_biodata_id: string,
    image: null,
    vote: {
        social_media: number,
        tally: number,
        judge: number,
        givaah: number,
        bonus: number,
    },
    social_media_url: string,
    code: string,
    is_evicted: boolean,
    category: string,
    rank: number,
    image_url: string,
    result: {
        overall_vote_percentage: number,
        position: number,
        grade: string,
        total_votes: number,
        weighted_scores: {
            social_media: number,
            tally: number,
            judge: number,
            givaah: number,
            bonus: number,
        }
    },
    contestant_biodata: {
        _id: string,
        created_at: string,
        updated_at: string,
        is_deleted: boolean,
        first_name: string,
        last_name: string,
        dob: string,
        sex: string,
        email: string,
        state_of_residence: string,
        whatsapp_no: string,
        info: string,
    }
}

export interface ILeanContestant {
    _id: string,
    created_at: string,
    updated_at: string,
    is_deleted: boolean,
    stage_id: string,
    contestant_biodata_id: string,
    image: null,
    vote: {
        social_media: number,
        tally: number,
        judge: number,
        givaah: number,
        bonus: number,
    },
    social_media_url: string,
    code: string,
    is_evicted: boolean,
    category: string,
    rank: number,
    image_url: string,
    result: null,
    contestant_biodata: null
}


export interface IContestantRepository {
    registerContestant(payload: { contestId: string, dto: FormData }): Promise<TFetcherResponse<IContestant>>
    updateContestant(): Promise<TFetcherResponse<IContestant>>
    voteContestant(): Promise<TFetcherResponse<ILeanContestant>>
    toggleEvictContestant(): Promise<TFetcherResponse<ILeanContestant>>
}