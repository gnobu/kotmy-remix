import { TFetcherResponse } from "~/lib/api/types/fetcher.interface"
import { socials } from "~/lib/data/socials"

export type ContestStatus = 'not_started' | 'registering' | 'ongoing' | 'completed'
export type StageStatus = "NOT_STARTED" | "ONGOING" | "ENDED"
export type Grade = 'A' | 'B' | 'C' | 'D' | 'E' | 'F'

export type Rate = {
    social_media: {
        type: typeof socials[number]
        amount: number
    }
    tally: number
    judge: number
    givaah: number
}

export interface IContestDto {
    _id: string
    str_id: string,
    name: string
    desc: string
    contest_unique_id: string
    tournament_unique_id: string
    image_url: string | null
    status: ContestStatus
    start_date: string
    end_date: string
    reg_deadline: string
    prizes: string
    sub_req: string
    terms_cond: string
    add_info: string
    uploaded_by: string
    can_register: boolean
    categories: string[]
    no_of_stages: number
    stages: IStage[]
}

export interface IContest {
    _id: string
    id: string
    name: string
    description: string
    tournament_unique_id: string
    image: string | null
    status: ContestStatus
    start_date: string
    end_date: string
    reg_deadline: string
    prizes: string
    sub_req: string
    terms_cond: string
    add_info: string
    categories: string[]
}

export interface IContestWStage extends IContest {
    stages: IStage[]
}

export interface IStage {
    _id: string
    contest_unique_id: string
    stage: number
    weight: number
    start_date: string
    end_date: string
    rates: Rate
    success_count: number
    grade: Record<Grade, [number, number]>
    format: "STRAIGHT" | 'PAIRED' | 'GROUPED'
    active: boolean // to be removed
    status: StageStatus // 'yet_to_start'
    number_of_contestants: number // 0
    total_registered_contestants: number // 0
    contestants_upload_folder: string
    contestants_view_folder: string
}

export interface ICreateContestDTO {
    image?: File
    name: string
    desc: string
    tournament_unique_id: string
    contest_unique_id: string
    start_date: string
    end_date: string
    reg_deadline: string
    categories: string // no longer a dict
    prizes: string
    sub_req: string
    terms_cond: string
    add_info: string
    no_of_stages: number
    stages: string // stringified ICreateStageDTO[]
}

export interface ICreateStageDTO {
    contest_unique_id: string
    stage: number
    weight: number
    rates: Rate
}

export function dtoToContest(contest: IContestDto | null): IContest | IContestWStage | null {
    if (!contest) return contest
    return {
        _id: contest._id,
        id: contest.contest_unique_id,
        name: contest.name,
        description: contest.desc,
        tournament_unique_id: contest.tournament_unique_id,
        image: contest.image_url,
        status: contest.status,
        start_date: contest.start_date,
        end_date: contest.end_date,
        reg_deadline: contest.reg_deadline,
        prizes: contest.prizes,
        sub_req: contest.sub_req,
        terms_cond: contest.terms_cond,
        add_info: contest.add_info,
        categories: contest.categories,
        stages: contest.stages
    }
}

export function dtoToContestInTournament(contest: Pick<IContestDto, 'contest_unique_id' | '_id' | 'image_url' | 'name' | 'status'>) {
    return {
        id: contest.contest_unique_id,
        image: contest.image_url,
        name: contest.name,
        status: contest.status,
    }
}

export interface IContestRepository {
    getContests(): Promise<TFetcherResponse<IContest[]>>
    getContestById(contestId: string): Promise<TFetcherResponse<IContest | null>>
    adminGetContestsInTournament(tournamentUniqueId: string, token: string): Promise<TFetcherResponse<IContestWStage[]>>
    createContest(contest: FormData, token: string): Promise<TFetcherResponse<IContest>>
    deleteContest(contestId: string): Promise<TFetcherResponse<boolean>>
    updateContest(payload: { contestId: string, dto: FormData, token: string }): Promise<TFetcherResponse<IContest | null>>
}