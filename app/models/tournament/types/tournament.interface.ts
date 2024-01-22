import { IContestDTO } from "~/models/contest/types/contest.interface"

export interface ITournamentDTO {
    id: string
    image: string
    title: string
    description: string
    uniqueId: string
}

export interface ITournamentWContestDTO extends ITournamentDTO {
    contests: IContestDTO[]
}

export interface ITournamentRepository {
    getTournaments(): Promise<ITournamentDTO[]>
    getTournamentsWContests(): Promise<ITournamentWContestDTO[]>
    getTournamentById(tournamentId: string): Promise<ITournamentDTO | null>
    createTournament(tournament: Partial<ITournamentDTO>, token: string): Promise<ITournamentDTO>
}