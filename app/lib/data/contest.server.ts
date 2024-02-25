import { contestImage1, contestImage2 } from "~/assets/images"
import { ITournament } from "~/models/tournament/types/tournament.interface"
import { IContest, IContestWStage, IStage } from "~/models/contest/types/contest.interface"

export const contests: IContest[] = [
    {
        _id: 'kotm1',
        id: 'kotm1',
        image: contestImage1,
        name: 'Kid of February 2024',
        tournament_unique_id: 'kotm',
        description: 'A monthly photo contest for kids of various age ranges',
        status: 'registering',
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
        reg_deadline: new Date().toISOString(),
        categories: ["infant", "newborn"],
        prizes: '3 million naira worth of prizes',
        sub_req: 'Some requirements',
        terms_cond: 'Terms and contitions',
        add_info: 'Some additional information',
    },
    {
        _id: 'kotm2',
        id: 'kotm2',
        image: contestImage2,
        name: 'Kid of January 2024',
        description: 'A monthly photo contest for kids of various age ranges',
        tournament_unique_id: 'kotm',
        status: 'ongoing',
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
        reg_deadline: new Date().toISOString(),
        categories: ["infant", "newborn"],
        prizes: '3 million naira worth of prizes',
        sub_req: 'Some requirements',
        terms_cond: 'Terms and contitions',
        add_info: 'Some additional information',
    },
    {
        _id: 'kotm3',
        id: 'kotm3',
        image: contestImage1,
        name: 'Kid of December 2023',
        description: 'A monthly photo contest for kids of various age ranges',
        tournament_unique_id: 'kotm',
        status: 'completed',
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
        reg_deadline: new Date().toISOString(),
        categories: ["infant", "newborn"],
        prizes: '3 million naira worth of prizes',
        sub_req: 'Some requirements',
        terms_cond: 'Terms and contitions',
        add_info: 'Some additional information',
    },
    {
        _id: 'koty4',
        id: 'koty4',
        image: contestImage2,
        name: 'Kid of the Year 2025',
        description: 'A monthly photo contest for kids of various age ranges',
        tournament_unique_id: 'koty',
        status: 'registering',
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
        reg_deadline: new Date().toISOString(),
        categories: ["infant", "newborn"],
        prizes: '3 million naira worth of prizes',
        sub_req: 'Some requirements',
        terms_cond: 'Terms and contitions',
        add_info: 'Some additional information',
    },
    {
        _id: 'koty5',
        id: 'koty5',
        image: contestImage1,
        name: 'Kid of the Year 2024',
        description: 'A monthly photo contest for kids of various age ranges',
        tournament_unique_id: 'koty',
        status: 'ongoing',
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
        reg_deadline: new Date().toISOString(),
        categories: ["infant", "newborn"],
        prizes: '3 million naira worth of prizes',
        sub_req: 'Some requirements',
        terms_cond: 'Terms and contitions',
        add_info: 'Some additional information',
    },
    {
        _id: 'koty6',
        id: 'koty6',
        image: contestImage2,
        name: 'Kid of the Year 2023',
        description: 'A monthly photo contest for kids of various age ranges',
        tournament_unique_id: 'koty',
        status: 'completed',
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
        reg_deadline: new Date().toISOString(),
        categories: ["infant", "newborn"],
        prizes: '3 million naira worth of prizes',
        sub_req: 'Some requirements',
        terms_cond: 'Terms and contitions',
        add_info: 'Some additional information',
    },
    {
        _id: 'mbds7',
        id: 'mbds7',
        image: contestImage2,
        name: 'My Birthday Splash February 2024',
        description: 'A monthly photo contest for kids celebrrating their birthdays in the contest month',
        tournament_unique_id: 'mbds',
        status: 'registering',
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
        reg_deadline: new Date().toISOString(),
        categories: ["infant", "newborn"],
        prizes: '3 million naira worth of prizes',
        sub_req: 'Some requirements',
        terms_cond: 'Terms and contitions',
        add_info: 'Some additional information',
    },
    {
        _id: 'mbds8',
        id: 'mbds8',
        image: contestImage1,
        name: 'My Birthday Splash January 2024',
        description: 'A monthly photo contest for kids celebrrating their birthdays in the contest month',
        tournament_unique_id: 'mbds',
        status: 'ongoing',
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
        reg_deadline: new Date().toISOString(),
        categories: ["infant", "newborn"],
        prizes: '3 million naira worth of prizes',
        sub_req: 'Some requirements',
        terms_cond: 'Terms and contitions',
        add_info: 'Some additional information',
    },
    {
        _id: 'mbds9',
        id: 'mbds9',
        image: contestImage2,
        name: 'My Birthday Splash December 2023',
        description: 'A monthly photo contest for kids celebrrating their birthdays in the contest month',
        tournament_unique_id: 'mbds',
        status: 'completed',
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
        reg_deadline: new Date().toISOString(),
        categories: ["infant", "newborn"],
        prizes: '3 million naira worth of prizes',
        sub_req: 'Some requirements',
        terms_cond: 'Terms and contitions',
        add_info: 'Some additional information',
    },
]

export const tournaments: ITournament[] = [
    {
        id: 'kotm',
        name: 'Kid of the Month Photo Contest',
        description: 'A monthly photo contest for kids of various age ranges',
        image: contestImage1,
        contests: contests.reduce((arr, contest) => {
            if (contest.tournament_unique_id === 'kotm') arr.push({ id: contest.id, image: contest.image, name: contest.name, status: contest.status })
            return arr
        }, [] as Pick<IContest, "id" | "image" | 'name' | 'status'>[])
    },
    {
        id: 'koty',
        name: 'Kid of the Year Contest',
        description: 'An annual photo contest for kids of various age ranges',
        image: contestImage2,
        contests: contests.reduce((arr, contest) => {
            if (contest.tournament_unique_id === 'koty') arr.push({ id: contest.id, image: contest.image, name: contest.name, status: contest.status })
            return arr
        }, [] as Pick<IContest, "id" | "image" | 'name' | 'status'>[])
    },
    {
        id: 'mbds',
        name: 'My Birthday Splash Contest',
        description: 'A monthly photo contest for kids celebrrating their birthdays in the contest month',
        image: contestImage1,
        contests: contests.reduce((arr, contest) => {
            if (contest.tournament_unique_id === 'mbds') arr.push({ id: contest.id, image: contest.image, name: contest.name, status: contest.status })
            return arr
        }, [] as Pick<IContest, "id" | "image" | 'name' | 'status'>[])
    }
]

const stages: IStage[] = [
    {
        "id": "646a7a56345213d4752b14b1",
        "contest_unique_id": 'kotm1',
        "start_date": "2023-03-05T05:31:05.493000+00:00",
        "end_date": "2023-10-05T05:31:05.493000+00:00",
        "rates": {
            "social_media": { type: 'facebook', amount: 45 },
            "judge": 0,
            "tally": 0,
            "givaah": 55,
        },
        "grade": {
            "A": [70, 10000000],
            "B": [60, 69],
            "C": [50, 59],
            "D": [40, 49],
            "E": [20, 39],
            "F": [0, 19],
        },
        "format": "STRAIGHT",
        "active": false,
        "stage": 1,
        "number_of_contestants": 25,
        "total_registered_contestants": 25,
        "status": "ENDED",
        "success_count": 1000,
        "weight": 10,
        "contestants_upload_folder": "tournament_kotm/contest_kotm/stage_1/contestants_upload",
        "contestants_view_folder": "tournament_kotm/contest_kotm/stage_1/contestants_view"
    },
    {
        "id": "646a7e3d345213d4752b14b3",
        "contest_unique_id": 'kotm1',
        "start_date": "2023-03-05T05:31:05.493000+00:00",
        "end_date": "2023-10-05T05:31:05.493000+00:00",
        "rates": {
            "social_media": { type: 'instagram', amount: 45 },
            "judge": 0,
            "tally": 0,
            "givaah": 55,
        },
        "grade": {
            "A": [70, 10000000],
            "B": [60, 69],
            "C": [50, 59],
            "D": [40, 49],
            "E": [30, 39],
            "F": [0, 29],
        },
        "format": "STRAIGHT",
        "active": true,
        "stage": 2,
        "number_of_contestants": 6,
        "total_registered_contestants": 25,
        "status": "ONGOING",
        "success_count": 1000,
        "weight": 10,
        "contestants_upload_folder": "tournament_kotm/contest_kotm/stage_2/contestants_upload",
        "contestants_view_folder": "tournament_kotm/contest_kotm/stage_2/contestants_view"
    },
    {
        "id": "64af08140a582a136f661976",
        "contest_unique_id": 'kotm1',
        "start_date": "2023-07-12T19:53:10.622000+00:00",
        "end_date": "2023-07-12T19:53:10.622000+00:00",
        "stage": 3,
        "rates": {
            "social_media": { type: 'twitter', amount: 45 },
            "judge": 0,
            "tally": 0,
            "givaah": 55,
        },
        "grade": {
            "A": [70, 10000000],
            "B": [60, 69],
            "C": [50, 59],
            "D": [40, 49],
            "E": [20, 39],
            "F": [0, 19],
        },
        "format": "STRAIGHT",
        "active": false,
        "number_of_contestants": 4,
        "total_registered_contestants": 25,
        "status": "NOT_STARTED",
        "success_count": 0,
        "weight": 3,
        "contestants_upload_folder": "tournament_kotm/contest_kotm/stage_0/contestants_upload",
        "contestants_view_folder": "tournament_kotm/contest_kotm/stage_0/contestants_view"
    },
    {
        "id": "646a7a56345213d4752b14b1",
        "contest_unique_id": "kotm2",
        "start_date": "2023-03-05T05:31:05.493000+00:00",
        "end_date": "2023-10-05T05:31:05.493000+00:00",
        "rates": {
            "social_media": { type: 'facebook', amount: 45 },
            "judge": 0,
            "tally": 0,
            "givaah": 55,
        },
        "grade": {
            "A": [70, 10000000],
            "B": [60, 69],
            "C": [50, 59],
            "D": [40, 49],
            "E": [20, 39],
            "F": [0, 19],
        },
        "format": "STRAIGHT",
        "active": false,
        "stage": 1,
        "number_of_contestants": 25,
        "total_registered_contestants": 25,
        "status": "ENDED",
        "success_count": 1000,
        "weight": 10,
        "contestants_upload_folder": "tournament_kotm/contest_kotm/stage_1/contestants_upload",
        "contestants_view_folder": "tournament_kotm/contest_kotm/stage_1/contestants_view"
    },
    {
        "id": "646a7a56345213d4752b14b1",
        "contest_unique_id": "kotm3",
        "start_date": "2023-03-05T05:31:05.493000+00:00",
        "end_date": "2023-10-05T05:31:05.493000+00:00",
        "rates": {
            "social_media": { type: 'facebook', amount: 45 },
            "judge": 0,
            "tally": 0,
            "givaah": 55,
        },
        "grade": {
            "A": [70, 10000000],
            "B": [60, 69],
            "C": [50, 59],
            "D": [40, 49],
            "E": [20, 39],
            "F": [0, 19],
        },
        "format": "STRAIGHT",
        "active": false,
        "stage": 1,
        "number_of_contestants": 25,
        "total_registered_contestants": 25,
        "status": "ENDED",
        "success_count": 1000,
        "weight": 10,
        "contestants_upload_folder": "tournament_kotm/contest_kotm/stage_1/contestants_upload",
        "contestants_view_folder": "tournament_kotm/contest_kotm/stage_1/contestants_view"
    },
    {
        "id": "646a7a56345213d4752b14b1",
        "contest_unique_id": "koty4",
        "start_date": "2023-03-05T05:31:05.493000+00:00",
        "end_date": "2023-10-05T05:31:05.493000+00:00",
        "rates": {
            "social_media": { type: 'facebook', amount: 45 },
            "judge": 0,
            "tally": 0,
            "givaah": 55,
        },
        "grade": {
            "A": [70, 10000000],
            "B": [60, 69],
            "C": [50, 59],
            "D": [40, 49],
            "E": [20, 39],
            "F": [0, 19],
        },
        "format": "STRAIGHT",
        "active": false,
        "stage": 1,
        "number_of_contestants": 25,
        "total_registered_contestants": 25,
        "status": "ENDED",
        "success_count": 1000,
        "weight": 10,
        "contestants_upload_folder": "tournament_kotm/contest_kotm/stage_1/contestants_upload",
        "contestants_view_folder": "tournament_kotm/contest_kotm/stage_1/contestants_view"
    },
    {
        "id": "646a7a56345213d4752b14b1",
        "contest_unique_id": "koty5",
        "start_date": "2023-03-05T05:31:05.493000+00:00",
        "end_date": "2023-10-05T05:31:05.493000+00:00",
        "rates": {
            "social_media": { type: 'facebook', amount: 45 },
            "judge": 0,
            "tally": 0,
            "givaah": 55,
        },
        "grade": {
            "A": [70, 10000000],
            "B": [60, 69],
            "C": [50, 59],
            "D": [40, 49],
            "E": [20, 39],
            "F": [0, 19],
        },
        "format": "STRAIGHT",
        "active": false,
        "stage": 1,
        "number_of_contestants": 25,
        "total_registered_contestants": 25,
        "status": "ENDED",
        "success_count": 1000,
        "weight": 10,
        "contestants_upload_folder": "tournament_kotm/contest_kotm/stage_1/contestants_upload",
        "contestants_view_folder": "tournament_kotm/contest_kotm/stage_1/contestants_view"
    },
    {
        "id": "646a7a56345213d4752b14b1",
        "contest_unique_id": "koty6",
        "start_date": "2023-03-05T05:31:05.493000+00:00",
        "end_date": "2023-10-05T05:31:05.493000+00:00",
        "rates": {
            "social_media": { type: 'facebook', amount: 45 },
            "judge": 0,
            "tally": 0,
            "givaah": 55,
        },
        "grade": {
            "A": [70, 10000000],
            "B": [60, 69],
            "C": [50, 59],
            "D": [40, 49],
            "E": [20, 39],
            "F": [0, 19],
        },
        "format": "STRAIGHT",
        "active": false,
        "stage": 1,
        "number_of_contestants": 25,
        "total_registered_contestants": 25,
        "status": "ENDED",
        "success_count": 1000,
        "weight": 10,
        "contestants_upload_folder": "tournament_kotm/contest_kotm/stage_1/contestants_upload",
        "contestants_view_folder": "tournament_kotm/contest_kotm/stage_1/contestants_view"
    },
    {
        "id": "646a7a56345213d4752b14b1",
        "contest_unique_id": "mbds7",
        "start_date": "2023-03-05T05:31:05.493000+00:00",
        "end_date": "2023-10-05T05:31:05.493000+00:00",
        "rates": {
            "social_media": { type: 'facebook', amount: 45 },
            "judge": 0,
            "tally": 0,
            "givaah": 55,
        },
        "grade": {
            "A": [70, 10000000],
            "B": [60, 69],
            "C": [50, 59],
            "D": [40, 49],
            "E": [20, 39],
            "F": [0, 19],
        },
        "format": "STRAIGHT",
        "active": false,
        "stage": 1,
        "number_of_contestants": 25,
        "total_registered_contestants": 25,
        "status": "ENDED",
        "success_count": 1000,
        "weight": 10,
        "contestants_upload_folder": "tournament_kotm/contest_kotm/stage_1/contestants_upload",
        "contestants_view_folder": "tournament_kotm/contest_kotm/stage_1/contestants_view"
    },
    {
        "id": "646a7a56345213d4752b14b1",
        "contest_unique_id": "mbds8",
        "start_date": "2023-03-05T05:31:05.493000+00:00",
        "end_date": "2023-10-05T05:31:05.493000+00:00",
        "rates": {
            "social_media": { type: 'facebook', amount: 45 },
            "judge": 0,
            "tally": 0,
            "givaah": 55,
        },
        "grade": {
            "A": [70, 10000000],
            "B": [60, 69],
            "C": [50, 59],
            "D": [40, 49],
            "E": [20, 39],
            "F": [0, 19],
        },
        "format": "STRAIGHT",
        "active": false,
        "stage": 1,
        "number_of_contestants": 25,
        "total_registered_contestants": 25,
        "status": "ENDED",
        "success_count": 1000,
        "weight": 10,
        "contestants_upload_folder": "tournament_kotm/contest_kotm/stage_1/contestants_upload",
        "contestants_view_folder": "tournament_kotm/contest_kotm/stage_1/contestants_view"
    },
    {
        "id": "646a7a56345213d4752b14b1",
        "contest_unique_id": "mbds9",
        "start_date": "2023-03-05T05:31:05.493000+00:00",
        "end_date": "2023-10-05T05:31:05.493000+00:00",
        "rates": {
            "social_media": { type: 'facebook', amount: 45 },
            "judge": 0,
            "tally": 0,
            "givaah": 55,
        },
        "grade": {
            "A": [70, 10000000],
            "B": [60, 69],
            "C": [50, 59],
            "D": [40, 49],
            "E": [20, 39],
            "F": [0, 19],
        },
        "format": "STRAIGHT",
        "active": false,
        "stage": 1,
        "number_of_contestants": 25,
        "total_registered_contestants": 25,
        "status": "ENDED",
        "success_count": 1000,
        "weight": 10,
        "contestants_upload_folder": "tournament_kotm/contest_kotm/stage_1/contestants_upload",
        "contestants_view_folder": "tournament_kotm/contest_kotm/stage_1/contestants_view"
    },
]


export async function getTournaments(): Promise<ITournament[]> {
    return tournaments
}
export async function getTournament(id: string): Promise<ITournament | null> {
    return tournaments.find(tournament => tournament.id === id) ?? null
}
export async function getContests<K extends keyof IContest>(options?: { where: Record<K, IContest[K]> }) {
    if (!options) return contests
    const { where } = options
    return contests.filter(contest => {
        for (const key in where) {
            if (contest[key] !== where[key]) return false
        }
        return true
    }) ?? null
}
export async function getContestsWStages(): Promise<IContestWStage[]> {
    return contests.map(contest => ({
        ...contest,
        stages: stages.filter(stage => stage.contest_unique_id === contest.id)
    }))
}
export async function getContest(id: string) {
    return contests.find(contest => contest.id === id) ?? null
}
export async function getContestWStages(id: string) {
    return (await getContestsWStages()).find(contest => contest.id === id) ?? null
}
export async function getContestsInTournament(tournamentId: string): Promise<IContest[]> {
    return contests.filter(contest => contest.tournament_unique_id === tournamentId)
}
export async function getContestsInTournamentWStages(tournamentId: string) {
    return (await getContestsWStages()).filter(contest => contest.tournament_unique_id === tournamentId)
}
