import { socials } from "../data/socials"

export type Status = 'registering' | 'ongoing' | 'completed'
export type StageStatus = 'yet_to_start' | 'ongoing' | 'completed'

export type StageMediaType = 'image' | 'video'

export interface Tournament {
    id: string;
    image: string;
    title: string;
    description: string;
    uniqueId: string;
}

export interface TournamentWContest extends Tournament {
    contests: Contest[];
}

export type Contest = {
    id: string;
    image: string;
    title: string;
    description: string;
    tournamentId: string;
    tournament_unique_id: string;
    contestId: string;
    status: Status;
    start_date: string;
    end_date: string;
    reg_deadline: string;
    categories: Record<string, string>;
    prizes: string;
    sub_req: string;
    terms_cond: string;
    add_info: string;
}
export type ContestWStage = Contest & { stages: Stage[] }

export type Grade = 'A' | 'B' | 'C' | 'D' | 'E' | 'F'

export type Rate = {
    "social_media": { type: typeof socials[number]; amount: number },
    "tally": number,
    "judge": number,
    "givaah": number,
}

export type Stage = {
    id: string;
    "start_date": string;
    "end_date": string;
    "weight": number;
    "success_count": number;
    "rates": Rate
    "grade": Record<Grade, [number, number]>;
    "format": "STRAIGHT" | 'PAIRED' | 'GROUPED';
    "active": boolean;
    "board_vote": boolean;
    "contest_id": string;
    "stage": number;
    "number_of_contestants": number;
    "total_registered_contestants": number;
    "status": StageStatus;
    "contestants_upload_folder": string;
    "contestants_view_folder": string
}