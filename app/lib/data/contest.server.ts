import { contestImage1, contestImage2 } from "~/assets/images"
import { Contest, ContestWStage, Stage, Tournament, TournamentWContest } from "../types/contest.interface"

export const tournaments: Tournament[] = [
    {
        id: '1',
        image: contestImage1,
        title: 'Kid of the Month Photo Contest',
        description: 'A monthly photo contest for kids of various age ranges',
        uniqueId: 'kotm',
    },
    {
        id: '2',
        image: contestImage2,
        title: 'Kid of the Year Contest',
        description: 'An annual photo contest for kids of various age ranges',
        uniqueId: 'koty',
    },
    {
        id: '3',
        image: contestImage1,
        title: 'My Birthday Splash Contest',
        description: 'A monthly photo contest for kids celebrrating their birthdays in the contest month',
        uniqueId: 'mbds',
    }
]

export const contests: Contest[] = [
    {
        id: '1',
        image: contestImage1,
        title: 'Kid of February 2024',
        tournamentId: '1',
        unique_tournament_id: 'kotm',
        description: 'A monthly photo contest for kids of various age ranges',
        contestId: 'kotm1',
        status: 'registering',
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
        reg_deadline: new Date().toISOString(),
        categories: {
            "infant": "infant",
            "newborn": "newborn"
        },
        prizes: '3 million naira worth of prizes',
        sub_req: 'Some requirements',
        terms_cond: 'Terms and contitions',
        add_info: 'Some additional information',
    },
    {
        id: '2',
        image: contestImage2,
        title: 'Kid of January 2024',
        description: 'A monthly photo contest for kids of various age ranges',
        tournamentId: '1',
        unique_tournament_id: 'kotm',
        contestId: 'kotm2',
        status: 'ongoing',
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
        reg_deadline: new Date().toISOString(),
        categories: {
            "infant": "infant",
            "newborn": "newborn"
        },
        prizes: '3 million naira worth of prizes',
        sub_req: 'Some requirements',
        terms_cond: 'Terms and contitions',
        add_info: 'Some additional information',
    },
    {
        id: '3',
        image: contestImage1,
        title: 'Kid of December 2023',
        description: 'A monthly photo contest for kids of various age ranges',
        tournamentId: '1',
        unique_tournament_id: 'kotm',
        contestId: 'kotm3',
        status: 'completed',
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
        reg_deadline: new Date().toISOString(),
        categories: {
            "infant": "infant",
            "newborn": "newborn"
        },
        prizes: '3 million naira worth of prizes',
        sub_req: 'Some requirements',
        terms_cond: 'Terms and contitions',
        add_info: 'Some additional information',
    },
    {
        id: '4',
        image: contestImage2,
        title: 'Kid of the Year 2025',
        description: 'A monthly photo contest for kids of various age ranges',
        tournamentId: '2',
        unique_tournament_id: 'koty',
        contestId: 'koty4',
        status: 'registering',
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
        reg_deadline: new Date().toISOString(),
        categories: {
            "infant": "infant",
            "newborn": "newborn"
        },
        prizes: '3 million naira worth of prizes',
        sub_req: 'Some requirements',
        terms_cond: 'Terms and contitions',
        add_info: 'Some additional information',
    },
    {
        id: '5',
        image: contestImage1,
        title: 'Kid of the Year 2024',
        description: 'A monthly photo contest for kids of various age ranges',
        tournamentId: '2',
        unique_tournament_id: 'koty',
        contestId: 'koty5',
        status: 'ongoing',
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
        reg_deadline: new Date().toISOString(),
        categories: {
            "infant": "infant",
            "newborn": "newborn"
        },
        prizes: '3 million naira worth of prizes',
        sub_req: 'Some requirements',
        terms_cond: 'Terms and contitions',
        add_info: 'Some additional information',
    },
    {
        id: '6',
        image: contestImage2,
        title: 'Kid of the Year 2023',
        description: 'A monthly photo contest for kids of various age ranges',
        tournamentId: '2',
        unique_tournament_id: 'koty',
        contestId: 'koty6',
        status: 'completed',
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
        reg_deadline: new Date().toISOString(),
        categories: {
            "infant": "infant",
            "newborn": "newborn"
        },
        prizes: '3 million naira worth of prizes',
        sub_req: 'Some requirements',
        terms_cond: 'Terms and contitions',
        add_info: 'Some additional information',
    },
    {
        id: '7',
        image: contestImage2,
        title: 'My Birthday Splash February 2024',
        description: 'A monthly photo contest for kids celebrrating their birthdays in the contest month',
        tournamentId: '3',
        unique_tournament_id: 'mbds',
        contestId: 'mbds7',
        status: 'registering',
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
        reg_deadline: new Date().toISOString(),
        categories: {
            "infant": "infant",
            "newborn": "newborn"
        },
        prizes: '3 million naira worth of prizes',
        sub_req: 'Some requirements',
        terms_cond: 'Terms and contitions',
        add_info: 'Some additional information',
    },
    {
        id: '8',
        image: contestImage1,
        title: 'My Birthday Splash January 2024',
        description: 'A monthly photo contest for kids celebrrating their birthdays in the contest month',
        tournamentId: '3',
        unique_tournament_id: 'mbds',
        contestId: 'mbds8',
        status: 'ongoing',
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
        reg_deadline: new Date().toISOString(),
        categories: {
            "infant": "infant",
            "newborn": "newborn"
        },
        prizes: '3 million naira worth of prizes',
        sub_req: 'Some requirements',
        terms_cond: 'Terms and contitions',
        add_info: 'Some additional information',
    },
    {
        id: '9',
        image: contestImage2,
        title: 'My Birthday Splash December 2023',
        description: 'A monthly photo contest for kids celebrrating their birthdays in the contest month',
        tournamentId: '3',
        unique_tournament_id: 'mbds',
        contestId: 'mbds9',
        status: 'completed',
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
        reg_deadline: new Date().toISOString(),
        categories: {
            "infant": "infant",
            "newborn": "newborn"
        },
        prizes: '3 million naira worth of prizes',
        sub_req: 'Some requirements',
        terms_cond: 'Terms and contitions',
        add_info: 'Some additional information',
    },
]



export async function getTournaments(): Promise<Tournament[]> {
    return tournaments
}

export async function getTournament(id: string): Promise<Tournament | null> {
    return tournaments.find(tournament => tournament.id === id) ?? null
}

export async function getTournamentsWithContests(): Promise<TournamentWContest[]> {
    return tournaments.map(tournament => ({
        ...tournament,
        contests: contests.filter(contest => contest.tournamentId === tournament.id)
    }))
}

export async function getContests<K extends keyof Contest>(options?: { where: Record<K, Contest[K]> }) {
    if (!options) return contests
    const { where } = options
    return contests.filter(contest => {
        for (const key in where) {
            if (contest[key] !== where[key]) return false
        }
        return true
    }) ?? null
}

export async function getContest(id: string) {
    return contests.find(contest => contest.id === id || contest.contestId === id) ?? null
}

export async function getContestWStages(id: string) {
    return (await getContestsWStages()).find(contest => contest.id === id || contest.contestId === id) ?? null
}

export async function getContestsWStages(): Promise<ContestWStage[]> {
    return contests.map(contest => ({
        ...contest,
        stages: stages.filter(stage => stage.contest_id === contest.id)
    }))
}

export async function getContestsInTournament(tournamentId: string): Promise<Contest[]> {
    return contests.filter(contest => contest.tournamentId === tournamentId)
}

export async function getContestsInTournamentWStages(tournamentId: string) {
    return (await getContestsWStages()).filter(contest => contest.tournamentId === tournamentId)
}

const stages: Stage[] = [
    {
        "id": "646a7a56345213d4752b14b1",
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
        "board_vote": false,
        "contest_id": "1",
        "stage": 1,
        "number_of_contestants": 25,
        "total_registered_contestants": 25,
        "status": "completed",
        "success_count": 1000,
        "weight": 10,
        "contestants_upload_folder": "tournament_kotm/contest_kotm/stage_1/contestants_upload",
        "contestants_view_folder": "tournament_kotm/contest_kotm/stage_1/contestants_view"
    },
    {
        "id": "646a7e3d345213d4752b14b3",
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
        "board_vote": false,
        "contest_id": "1",
        "stage": 2,
        "number_of_contestants": 6,
        "total_registered_contestants": 25,
        "status": "ongoing",
        "success_count": 1000,
        "weight": 10,
        "contestants_upload_folder": "tournament_kotm/contest_kotm/stage_2/contestants_upload",
        "contestants_view_folder": "tournament_kotm/contest_kotm/stage_2/contestants_view"
    },
    {
        "id": "64af08140a582a136f661976",
        "start_date": "2023-07-12T19:53:10.622000+00:00",
        "end_date": "2023-07-12T19:53:10.622000+00:00",
        "contest_id": "1",
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
        "board_vote": false,
        "number_of_contestants": 4,
        "total_registered_contestants": 25,
        "status": "yet_to_start",
        "success_count": 0,
        "weight": 3,
        "contestants_upload_folder": "tournament_kotm/contest_kotm/stage_0/contestants_upload",
        "contestants_view_folder": "tournament_kotm/contest_kotm/stage_0/contestants_view"
    },
    {
        "id": "646a7a56345213d4752b14b1",
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
        "board_vote": false,
        "contest_id": "2",
        "stage": 1,
        "number_of_contestants": 25,
        "total_registered_contestants": 25,
        "status": "completed",
        "success_count": 1000,
        "weight": 10,
        "contestants_upload_folder": "tournament_kotm/contest_kotm/stage_1/contestants_upload",
        "contestants_view_folder": "tournament_kotm/contest_kotm/stage_1/contestants_view"
    },
    {
        "id": "646a7a56345213d4752b14b1",
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
        "board_vote": false,
        "contest_id": "3",
        "stage": 1,
        "number_of_contestants": 25,
        "total_registered_contestants": 25,
        "status": "completed",
        "success_count": 1000,
        "weight": 10,
        "contestants_upload_folder": "tournament_kotm/contest_kotm/stage_1/contestants_upload",
        "contestants_view_folder": "tournament_kotm/contest_kotm/stage_1/contestants_view"
    },
    {
        "id": "646a7a56345213d4752b14b1",
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
        "board_vote": false,
        "contest_id": "4",
        "stage": 1,
        "number_of_contestants": 25,
        "total_registered_contestants": 25,
        "status": "completed",
        "success_count": 1000,
        "weight": 10,
        "contestants_upload_folder": "tournament_kotm/contest_kotm/stage_1/contestants_upload",
        "contestants_view_folder": "tournament_kotm/contest_kotm/stage_1/contestants_view"
    },
    {
        "id": "646a7a56345213d4752b14b1",
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
        "board_vote": false,
        "contest_id": "5",
        "stage": 1,
        "number_of_contestants": 25,
        "total_registered_contestants": 25,
        "status": "completed",
        "success_count": 1000,
        "weight": 10,
        "contestants_upload_folder": "tournament_kotm/contest_kotm/stage_1/contestants_upload",
        "contestants_view_folder": "tournament_kotm/contest_kotm/stage_1/contestants_view"
    },
    {
        "id": "646a7a56345213d4752b14b1",
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
        "board_vote": false,
        "contest_id": "6",
        "stage": 1,
        "number_of_contestants": 25,
        "total_registered_contestants": 25,
        "status": "completed",
        "success_count": 1000,
        "weight": 10,
        "contestants_upload_folder": "tournament_kotm/contest_kotm/stage_1/contestants_upload",
        "contestants_view_folder": "tournament_kotm/contest_kotm/stage_1/contestants_view"
    },
    {
        "id": "646a7a56345213d4752b14b1",
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
        "board_vote": false,
        "contest_id": "7",
        "stage": 1,
        "number_of_contestants": 25,
        "total_registered_contestants": 25,
        "status": "completed",
        "success_count": 1000,
        "weight": 10,
        "contestants_upload_folder": "tournament_kotm/contest_kotm/stage_1/contestants_upload",
        "contestants_view_folder": "tournament_kotm/contest_kotm/stage_1/contestants_view"
    },
    {
        "id": "646a7a56345213d4752b14b1",
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
        "board_vote": false,
        "contest_id": "8",
        "stage": 1,
        "number_of_contestants": 25,
        "total_registered_contestants": 25,
        "status": "completed",
        "success_count": 1000,
        "weight": 10,
        "contestants_upload_folder": "tournament_kotm/contest_kotm/stage_1/contestants_upload",
        "contestants_view_folder": "tournament_kotm/contest_kotm/stage_1/contestants_view"
    },
    {
        "id": "646a7a56345213d4752b14b1",
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
        "board_vote": false,
        "contest_id": "9",
        "stage": 1,
        "number_of_contestants": 25,
        "total_registered_contestants": 25,
        "status": "completed",
        "success_count": 1000,
        "weight": 10,
        "contestants_upload_folder": "tournament_kotm/contest_kotm/stage_1/contestants_upload",
        "contestants_view_folder": "tournament_kotm/contest_kotm/stage_1/contestants_view"
    },
]
