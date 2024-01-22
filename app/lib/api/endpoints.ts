export class ApiEndPoints {
    // ADMIN
    static get adminCreateUser(): string {
        return "/users/admin_create_user"
    }
    static get getAdminAccounts(): string {
        return "/users/get_admin_accounts"
    }
    static get getAllUserRoles(): string {
        return "/users/all_roles"
    }
    static get updateStage(): string {
        return "/contest/update_stage"
    }
    static get createStage(): string {
        return "/contest/create_stage"
    }
    static get getActiveContestsAndStages(): string {
        return "/contest/contests_and_stages"
    }

    // PUBLIC
    static get getYoutubeLinks(): string {
        return "/home/youtube"
    }
    static get getTournaments(): string {
        return "/api/tournament"
    }
    static get getActiveContests(): string {
        return "/contest/active"
    }
    static getContestsInTournament(tournamentUniqueId: string) {
        return `/contest/tournament/${tournamentUniqueId}`
    }
    static migrateStage({ oldStageId, newStageId }: { oldStageId: string, newStageId: string }) {
        return `/contest/migration?oldstageid=${oldStageId}&newstageid=${newStageId}`
    }
    static get addContest() {
        return "/contest/add_contest"
    }
    static get patchContest() {
        return "/contest"
    }
    static get deleteContest() {
        return "/contest"
    }
    static get getContestByIdLean() {
        return "/contest/contest_lean"
    }
    static get createTournament() {
        return "/api/tournament"
    }

    static get addImageForContest() {
        return "/contest/add_image";
    }

    static getTournamentsPaged(page: number) {
        return `/api/tournament_paged?page=${page}`;
    }
}