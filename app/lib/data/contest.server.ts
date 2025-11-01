import { contestImage1, contestImage2 } from "~/assets/images"
import { IContest, IContestWFinalResult } from "~/services/contest/types/contest.interface"
import { ApiCall } from "../api/fetcher"

export const contests: IContest[] = [
    {
        _id: 'kotm1',
        id: 'kotm1',
        image: contestImage1,
        name: 'Kid of February 2024',
        tournament_unique_id: 'kotm',
        desc: 'A monthly photo contest for kids of various age ranges',
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
        desc: 'A monthly photo contest for kids of various age ranges',
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
        desc: 'A monthly photo contest for kids of various age ranges',
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
        desc: 'A monthly photo contest for kids of various age ranges',
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
        desc: 'A monthly photo contest for kids of various age ranges',
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
        desc: 'A monthly photo contest for kids of various age ranges',
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
        desc: 'A monthly photo contest for kids celebrrating their birthdays in the contest month',
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
        desc: 'A monthly photo contest for kids celebrrating their birthdays in the contest month',
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
        desc: 'A monthly photo contest for kids celebrrating their birthdays in the contest month',
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

export const contestsWResult: IContestWFinalResult[] = [
     {
    _id: "68c946b773576310874c1c6d",
    str_id: "68c946b773576310874c1c6d",
    name: "REVIEW_CONTEST_2025",
    desc: "REVIEW_CONTEST_2025",
    tournament_unique_id: "review_2025",
    contest_unique_id: "REVIEW_CONTEST_2025",
    start_date: "2025-09-15T00:00:00Z",
    end_date: "2025-10-31T00:00:00Z",
    reg_deadline: "2025-09-14T00:00:00Z",
    categories: [
        "REVIEW_CONTEST_2025"
    ],
    prizes: "REVIEW_CONTEST_2025",
    sub_req: "REVIEW_CONTEST_2025",
    terms_cond: "REVIEW_CONTEST_2025",
    add_info: "REVIEW_CONTEST_2025",
    uploaded_by: "66f1da7715531777c030eb64",
    // image: null,
    no_of_stages: 4,
    image_url: "",
    can_register: true,
    // is_completed: false,
    no_of_winners: 3,
    // rewards: {},
    stages: [
        {
            _id: "68c946b973576310874c1c6e",
            contest_unique_id: null,
            stage: 1,
            weight: 10,
            start_date: "2025-09-15T00:00:00Z",
            end_date: "2025-10-31T00:00:00Z",
            rates: {
                social_media: {
                    type: "kotmy",
                    amount: 40
                },
                tally: 60,
                judge: 0,
                givaah: 0,
                bonus: 0,
                price_per_vote: 60.0,
                vote_currency: "NGN"
            },
            success_count: 0,
            grade: {
                A: [8, 10000000],
                B: [0, 0],
                C: [0, 5],
                D: [0, 0],
                E: [0, 0],
                F: [0, 0]
            },
            format: null,
            active: true,
            number_of_contestants: 3,
            total_registered_contestants: 3,
            contestants_upload_folder: "tournament_review_2025/contest_REVIEW_CONTEST_2025/stage_1/contestants_upload",
            contestants_view_folder: "tournament_review_2025/contest_REVIEW_CONTEST_2025/stage_1/contestants_view",
            contest_id: "68c946b773576310874c1c6d",
            media_type: "image",
            status: "ongoing"
        },
        {
            _id: "68c946bb73576310874c1c6f",
            // str_id: "68c946bb73576310874c1c6f",
            contest_unique_id: null,
            stage: 2,
            weight: 30,
            start_date: "2025-09-15T00:00:00Z",
            end_date: "2025-09-17T00:00:00Z",
            rates: {
                social_media: {
                    type: "facebook",
                    amount: 30
                },
                tally: 50,
                judge: 0,
                givaah: 0,
                bonus: 0,
                price_per_vote: 60.0,
                vote_currency: "NGN"
            },
            success_count: 0,
            grade: {
                A: [61, 10000000000],
                B: [51, 60],
                C: [31, 50],
                D: [21, 30],
                E: [11, 20],
                F: [0, 10]
            },
            format: null,
            active: false,
            number_of_contestants: 2,
            total_registered_contestants: 2,
            contestants_upload_folder: "tournament_review_2025/contest_REVIEW_CONTEST_2025/stage_2/contestants_upload",
            contestants_view_folder: "tournament_review_2025/contest_REVIEW_CONTEST_2025/stage_2/contestants_view",
            contest_id: "68c946b773576310874c1c6d",
            media_type: "image",
            // stage_social_media_votes: null,
            status: "completed"
        },
        {
            _id: "68c946bc73576310874c1c70",
            contest_unique_id: null,
            stage: 3,
            weight: 50,
            start_date: "2025-09-16T12:10:33.523373Z",
            end_date: "2025-09-16T12:10:33.523409Z",
            rates: {
                social_media: {
                    type: "facebook",
                    amount: 0
                },
                tally: 0,
                judge: 0,
                givaah: 0,
                bonus: 0,
                price_per_vote: 60.0,
                vote_currency: "NGN"
            },
            success_count: 0,
            grade: {
                A: [0, 0], B: [0, 0], C: [0, 0], D: [0, 0], E: [0, 0], F: [0, 0]
            },
            format: null,
            active: false,
            number_of_contestants: 0,
            total_registered_contestants: 0,
            contestants_upload_folder: "tournament_review_2025/contest_REVIEW_CONTEST_2025/stage_3/contestants_upload",
            contestants_view_folder: "tournament_review_2025/contest_REVIEW_CONTEST_2025/stage_3/contestants_view",
            contest_id: "68c946b773576310874c1c6d",
            media_type: "image",
            status: "completed"
        },
        {
            _id: "68c9517073576310874c1c7b",
            contest_unique_id: null,
            stage: 4,
            weight: 10,
            start_date: "2025-09-16T12:10:33.523373Z",
            end_date: "2025-09-16T12:10:33.523409Z",
            rates: {
                social_media: {
                    type: "instagram",
                    amount: 0
                },
                tally: 0,
                judge: 0,
                givaah: 0,
                bonus: 0,
                price_per_vote: 60.0,
                vote_currency: "NGN"
            },
            success_count: 0,
            grade: {
                A: [0, 0], B: [0, 0], C: [0, 0], D: [0, 0], E: [0, 0], F: [0, 0]
            },
            format: null,
            active: false,
            number_of_contestants: 0,
            total_registered_contestants: 0,
            contestants_upload_folder: "tournament_review_2025/contest_REVIEW_CONTEST_2025/stage_4/contestants_upload",
            contestants_view_folder: "tournament_review_2025/contest_REVIEW_CONTEST_2025/stage_4/contestants_view",
            contest_id: "68c946b773576310874c1c6d",
            media_type: "image",
            status: "completed"
        }
    ],
    status: "ongoing",
    final_result_headings: [
        "s/n",
        "contestant",
        "stage_1",
        "stage_2",
        "stage_3",
        "stage_4",
        "grand total",
        "position"
        
    ],
    final_result_scores: [
        {
            stage_results: {
                'stage_1': 5.2,
                'stage_2': 15.0,
                'stage_3': 0.0,
                'stage_4': 0.0
            },
            position: 1,
            total_votes: 20.2,
            contestant_biodata: {
                _id: "68c947d073576310874c1c74",
                first_name: "Marvelous",
                last_name: "Ugochukwu",
                dob: "2025-09-16",
                sex: "MALE",
                email: "atumasaake@gmail.com",
                state_of_residence: "Delta",
                whatsapp_no: "2347059180332",
                info: ""
            },
            table_data: {
                's/n': 1,
                contestant: "Marvelous Ugochukwu",
                'stage_1': 5.2,
                'stage_2': 15.0,
                'stage_3': 0,
                'stage_4': 0,
                position: 1,
                'grand total': 20.2
            }
        },
        {
            stage_results: {
                'stage_1': 4.8,
                'stage_2': 9.0,
                'stage_3': 0.0,
                'stage_4': 0.0
            },
            position: 2,
            total_votes: 13.8,
            contestant_biodata: {
                _id: "68c9478473576310874c1c71",
                first_name: "Caleb",
                last_name: "Ekeke",
                dob: "2025-09-16",
                sex: "MALE",
                email: "atumasaake@gmail.com",
                state_of_residence: "Ebonyi",
                whatsapp_no: "2347059180332",
                info: ""
            },
            table_data: {
                's/n': 2,
                contestant: "Caleb Ekeke",
                'stage_1': 4.8,
                'stage_2': 9.0,
                'stage_3': 0,
                'stage_4': 0,
                position: 2,
                'grand total': 13.8
            }
        },
        {
            stage_results: {
                'stage_1': 0.0,
                'stage_2': 0.0,
                'stage_3': 0.0,
                'stage_4': 0.0
            },
            position: 3,
            total_votes: 0.0,
            contestant_biodata: {
                _id: "66e0151a460cf145157bf75e",
                first_name: "Samuel",
                last_name: "Atuma",
                dob: "2025-09-16",
                sex: "FEMALE",
                email: "atumasaake@gmail.com",
                state_of_residence: "Cross River",
                whatsapp_no: "2347059180332",
                info: ""
            },
            table_data: {
                's/n': 3,
                contestant: "Samuel Atuma",
                'stage_1': 0.0,
                'stage_2': 0,
                'stage_3': 0,
                'stage_4': 0,
                position: 3,
                'grand total': 0.0
            }
        }
    ],
    // payment_transactions: null
}
]
// contestsWResult[0].final_result_scores = (new Array(50)).fill(contestsWResult[0].final_result_scores![0])


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
export async function getContest(id: string): Promise<IContest | null> {
    return contests.find(contest => contest.id === id) ?? null
}


