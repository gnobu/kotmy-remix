export class ApiEndPoints {
    // GENERAL
    static get getTournaments(): string {
        return "/v2/api/tournament"
    }
    static getTournamentById(uniqueId: string): string {
        return `/v2/api/tournament/${uniqueId}`
    }
    static getContestsInTournament(tournamentUniqueId: string) {
        return `/v2/api/contest/tournament/${tournamentUniqueId}`
    }

    static finalResultForContest(contestUniqueId: string) {
        return `/v2/api/contest/final_result/${contestUniqueId}`
    }
    static getTournamentsPaged(page: number) {
        return `/v2/api/tournament_paged?page=${page}`
    }
    static registerContestant(contestId: string) {
        return `/v2/api/contestant/register_for_contest/${contestId}`
    }
    static getContestantsInStage(stageId: string) {
        return `/v2/api/contestant/${stageId}`
    }
    static get getTallyLink(): string {
        return "/v2/api/payment"
    }
    static get callTallyWebhook(): string {
        return "/v2/api/flutterwave-payment-status"
    }
    static voteContestant(stageId: string) {
        return `/v2/api/contestant/sm_vote/${stageId}`
    }
    static getContestantViaHash(contestantLink: string) {
        return `/v2/api/contestant/link_details/${contestantLink}`
    }
    static contestantUploadStageMedia() {
        return `/v2/api/contestant/upload_media`
    }
    
    // ADMIN
    static get createAdminAccount(): string {
        return "/users/admin_create_user"
    }
    static get getAdminAccounts(): string {
        return "/users/get_admin_accounts"
    }
    static get getAllRoles(): string {
        return "/users/all_roles"
    }
    static get createTournament() {
        return "v2/api/admin/tournament"
    }
    static updateTournament(id: string) {
        return `v2/api/admin/tournament/${id}`
    }
    static deleteTournament(id: string) {
        return `v2/api/admin/tournament/${id}`
    }
    static get createContest() {
        return "v2/api/admin/contest"
    }
    static get getContests() {
        return "v2/api/admin/contest"
    }
    static adminGetContestsInTournament(tournamentUniqueId: string) {
        return `v2/api/admin/contest/tournament/${tournamentUniqueId}`
    }
    static getContestById(id: string) {
        return `/v2/api/contest/${id}`
        // return `/v2/api/admin/contest/${id}`
    }
    static updateContest(id: string) {
        return `/v2/api/admin/contest/${id}`
    }
    static deleteContest(id: string) {
        return `/v2/api/admin/contest/${id}`
    }
    static updateStage(id: string) {
        return `/v2/api/admin/stage/${id}`
    }
    static deleteStage(id: string) {
        return `/v2/api/admin/stage/${id}`
    }
    static get migrateStage() {
        return `/v2/api/admin/contest/migration`
    }
    static toggleRegistration({ contestId }: { contestId: string }) {
        return `/v2/api/admin/contest/can_register/${contestId}`
    }
    static editContestant(contestantId: string) {
        return `/v2/api/admin/contestant/with_image/${contestantId}`
    }

    static editUserContestant(contestantId: string) {
        return `/v2/api/contestant/user/${contestantId}`
    }
    static get toggleEvictContestants() {
        return `/v2/api/admin/contestant/toggle_evict_multiple`
    }

    static get getWinners() {
        return `/v2/api/contest/winners`
    }

    static getWinner(winnerId: string) {
        return `/v2/api/contest/winners/${winnerId}`
    }

    static get login() {
        return "/v2/api/users/signin"
    }

    static get userPendingUploads(){
        return `v2/api/contestant/pending_uploads`
    }

    static userContestantDeets(contestantId: string){
        return `/v2/api/contestant/details/${contestantId}`;
    }
}