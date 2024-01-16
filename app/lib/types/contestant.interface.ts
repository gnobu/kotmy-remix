import { Grade } from "./contest.interface"

export type Contestant = {
    id: string | number;
    fullName: string;
    email: string;
    age?: number;
    dob: string;
    gender: string;
    state_of_residence: string;
    image: string;
    votes: {
        social_media: {
            type: 'facebook' | 'instagram' | 'twitter';
            count: number;
            url: string
        };
        tally: number;
        givah: number;
    }
}

export type ContestantDto = {
    id: string | number;
    image: string;
    biodata: {
        id: string;
        full_name: string;
        email: string;
        dob: string;
        sex: "MALE" | "FEMALE";
        state_of_residence: string;
        whatsapp_no: string;
    };
    votes: {
        social_media: {
            type: 'facebook' | 'instagram' | 'twitter';
            count: number;
            url: string
        };
        tally: number;
        givaah: number;
    }
    code: string;
    is_evicted: boolean;
    contestant_score: number;
    rank: number;
    grade: Grade;
}