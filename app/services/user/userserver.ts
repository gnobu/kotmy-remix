import { ApiEndPoints } from "~/lib/api/endpoints";
import { ApiCall } from "~/lib/api/fetcher";
import { IContestWStageWContestant } from "../contest/types/contest.interface";
import { IPendingContestantUpload as IPendingContestantUpload } from "./types/user.interface";
import { contestRepo, ContestRepository } from "../contest/contest.server";
import { IEditContestantDTO } from "../contestant/types/contestant.interface";
import { contestantRepo, ContestantRepository } from "../contestant/contestant.server";


export interface IUserServer {

}
export class UserServer implements IUserServer {
    private readonly contestantServer: ContestantRepository
    public constructor(_contestServer: ContestantRepository){
        this.contestantServer = _contestServer
    }

    async getPendingUploads(cookies: string){
        return await this.contestantServer.getPendingUploads(cookies)
        
    }

    async getContestantDetails(contestantId: string, cookies: string){
        return await this.contestantServer.getContestantDetailsWithContest(contestantId, cookies)
    }

    async updateUserContestant(payload: {contestantId: string, formData: FormData, editContestantDTO?: IEditContestantDTO}, cookies?: string){
       const {error, authRequired, data} = await contestantRepo.updateUserContestant(payload, cookies)

       return {error, authRequired, data};
    }


}






export let userServer = new UserServer(contestantRepo);