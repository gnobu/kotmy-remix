import { socials } from "~/lib/data/socials"

export type ContestStatus = 'not_started' | 'registering' | 'ongoing' | 'completed'
export type StageStatus = "NOT_STARTED" | "ONGOING" | "ENDED"
export type Grade = 'A' | 'B' | 'C' | 'D' | 'E' | 'F'

export type Rate = {
    social_media: { type: typeof socials[number]; amount: number },
    tally: number,
    judge: number,
    givaah: number,
}

export interface IContestDTO {
    id: string;
    image: string;
    name: string;
    description: string;
    tournament_unique_id: string;
    contestId: string;
    status: ContestStatus;
    start_date: string;
    end_date: string;
    reg_deadline: string;
    categories: Record<string, string>;
    prizes: string;
    sub_req: string;
    terms_cond: string;
    add_info: string;
}

export interface IContestWStageDTO extends IContestDTO {
    stages: IStage[]
}

export interface IStage {
    id: string;
    contest_unique_id: string;
    stage: number;
    weight: number;
    start_date: string;
    end_date: string;
    rates: Rate;
    success_count: number;
    grade: Record<Grade, [number, number]>; // default to {Grade:[0,0]}
    format: "STRAIGHT" | 'PAIRED' | 'GROUPED';
    active: boolean; // to be removed
    status: StageStatus; // 'yet_to_start'
    number_of_contestants: number; // 0
    total_registered_contestants: number; // 0
    contestants_upload_folder: string;
    contestants_view_folder: string;
}

export interface ICreateContestDTO {
    image: string;
    name: string;
    desc: string;
    tournament_unique_id: string;
    contest_unique_id: string;
    start_date: string;
    end_date: string;
    reg_deadline: string;
    categories: string[]; // no longer a dict
    prizes: string;
    sub_req: string;
    terms_cond: string;
    add_info: string;
    no_of_stages: number;
    stages: string; // stringified ICreateStageDTO[]
}

export interface ICreateStageDTO {
    contest_unique_id: string;
    stage: number;
    weight: number;
    rates: Rate;
}