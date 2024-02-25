export class ApiEndPoints {
    // GENERAL
    static get getTournaments(): string {
        return "/api/tournament"
    }
    static get getContests() {
        return "/contest"
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
        return "/api/tournament"
    }
    static updateTournament(id: string) {
        return `/api/tournament/${id}`
    }
    static deleteTournament(id: string) {
        return `/api/tournament/${id}`
    }
    static get createContest() {
        return "/admin/contest"
    }
    static updateContest(id: string) {
        return `/contest/${id}`
    }
    static deleteContest(id: string) {
        return `/contest/${id}`
    }
    static updateStage(id: string) {
        return `/contest/stage/${id}`
    }
    static migrateStage({ oldStageId, newStageId }: { oldStageId: string, newStageId: string }) {
        return `/contest/migration?oldstageid=${oldStageId}&newstageid=${newStageId}`
    }
}