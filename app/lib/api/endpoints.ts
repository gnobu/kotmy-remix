export class ApiEndPoints {
    // GENERAL
    static get getTournaments(): string {
        return "/tournament"
    }
    static getTournamentById(uniqueId: string): string {
        return `/tournament/${uniqueId}`
    }
    static getContestsInTournament(tournamentUniqueId: string) {
        return `/contest/tournament/${tournamentUniqueId}`
    }
    static getTournamentsPaged(page: number) {
        return `/api/tournament_paged?page=${page}`;
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
        return "/admin/tournament"
    }
    static updateTournament(id: string) {
        return `/admin/tournament/${id}`
    }
    static deleteTournament(id: string) {
        return `/admin/tournament/${id}`
    }
    static get createContest() {
        return "/admin/contest"
    }
    static get getContests() {
        return "/admin/contest"
    }
    static adminGetContestsInTournament(tournamentUniqueId: string) {
        return `/admin/contest/tournament/${tournamentUniqueId}`
    }
    static getContestById(id: string) {
        return `/contest/${id}`
    }
    static updateContest(id: string) {
        return `/admin/contest/${id}`
    }
    static deleteContest(id: string) {
        return `/admin/contest/${id}`
    }
    static updateStage(id: string) {
        return `/admin/stage/${id}`
    }
    static deleteStage(id: string) {
        return `/admin/stage/${id}`
    }
    static migrateStage({ oldStageId, newStageId }: { oldStageId: string, newStageId: string }) {
        return `/contest/migration?oldstageid=${oldStageId}&newstageid=${newStageId}`
    }
    static toggleRegistration({ contestId }: { contestId: string }) {
        return `/admin/contest/can_register/${contestId}`
    }
}