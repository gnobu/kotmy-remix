
import { useEffect, useState } from "react";
import {useUserManager} from "~/lib/store/store_managers/tokenManager";
import { Link, useLoaderData, useNavigate } from "@remix-run/react";
import { userServer } from "~/services/user/userserver";
import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { IContestWStageWContestant } from "~/services/contest/types/contest.interface";
import { StageMediaType, StageStatus } from "~/lib/types/contest.interface";
import StageMediaUpload from "./_public.contests.$tournamentId.$contestId.stage_upload";
import { toast } from "~/components/reusables/use-toast";
import { IPendingContestantUpload } from "~/services/user/types/user.interface";
import { noImage } from "~/assets/images";


export async function loader({request}: LoaderFunctionArgs){

  const cookieHeader = request.headers.get("Cookie");
  console.log({cookieHeader})
  if (!cookieHeader) {
    // User is not signed in
    return redirect("/login"); 
  }
  const {data, error, authRequired} = await userServer.getPendingUploads(cookieHeader)
  console.log({data, error})

  if(authRequired){
      return redirect("/login"); 
  }

  return json({data, error, authRequired})
}


export class UserHelper {
        flattenToContestantUpload(contestWStageWContetant: IContestWStageWContestant): IPendingContestantUpload[]{
        const contestantsUpload: IPendingContestantUpload[] = []

        for(const stage of contestWStageWContetant.stages){
        for(const contestant of stage.contestants){
            
            const contestantUpload: IPendingContestantUpload = {
                fullName : `${contestant.contestant_biodata?.first_name} ${contestant.contestant_biodata?.last_name}`,
                contestantCode: contestant.code,
                contestName: contestWStageWContetant.name,
                stage: stage.stage,
                status: stage.status,
                stageMediaType: stage.media_type ?? "image",
                contestImage: contestWStageWContetant.image_url ?? '',
                contestantId: contestant._id
            }

            contestantsUpload.push(contestantUpload)
        }
        }

        return contestantsUpload
    }

    flattenToContestantsPendingUpload(contestsWStageWContetant: IContestWStageWContestant[]): IPendingContestantUpload[]{

        let pendingUploads: IPendingContestantUpload[] = []
        for(const contest of contestsWStageWContetant){
            const flattenedContest = this.flattenToContestantUpload(contest)
            pendingUploads.push(...flattenedContest)
        }

        return pendingUploads
    }
}

const userHelper = new UserHelper();




interface WinnerCardProps {
  contestImageUrl: string;
  contest_name: string;
  stage: string;
  full_name: string;
  contestantId: string;
}

const PendingUploadCard: React.FC<WinnerCardProps> = ({
  contestImageUrl,
  contest_name,
  stage,
  full_name,
  contestantId
}) => (
  <Link to={`/user/contestant/${contestantId}`} className="block transition-shadow">
  <article >
    <img
      src={contestImageUrl || noImage}
      alt={full_name}
      className="w-full aspect-[3/4] rounded-lg object-cover"
    />
    <div className="pt-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        {contest_name} 
        <br/>
        stage {stage}
      </p>
      <h3 className="mt-1 text-lg font-bold text-gray-900">{full_name}</h3>
    </div>
  </article>
  </Link>
);

export function useUserPendingsUploadController(){

  const {data, error, authRequired} = useLoaderData<typeof loader>()

  const [pendingUploads, setPendingUploads] = useState<IPendingContestantUpload[]>([]);

   if(error){
      toast({
          variant: "destructive",
          title: "An error occured",
          description: error?.detail.toString() ?? "Error occured"
      });
  }

  useEffect(() => {
    if (data) {
        let flattenedUploads = userHelper.flattenToContestantsPendingUpload(data);
        setPendingUploads(flattenedUploads);
        console.log({flattenedUploads})
    }
  }, [data]);
  
  return {pendingUploads}
}

export default function UserPendingsUpload(){
  const {pendingUploads} = useUserPendingsUploadController()
  return(
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <header className="bg-[#817EFB] overflow-hidden rounded-3xl py-8 md:py-12 lg:py-16 px-5">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Pending uploads
            </h1>
            <p className="mt-4 text-base md:text-lg text-purple-100">
              Please, we are expecting your uploads for the following stages
            </p>
            {/* <div className="mt-8 relative max-w-lg mx-auto">
              <input
                type="text"
                placeholder="Search by keyword or name"
                value={searchWinners}
                onChange={(e) => setSearchWinners(e.target.value)}
                className="w-full rounded-2xl py-3 px-6 pr-12 text-gray-900 shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-auto">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div> */}
          </div>
        </header>
        <main className="py-12 md:py-16">
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {pendingUploads.map((pendingUpload, idx) => (
              <PendingUploadCard
                key={pendingUpload.contestantId}
                contestImageUrl={pendingUpload.contestImage}
                contest_name={pendingUpload.contestName}
                stage={pendingUpload.stage.toString()}
                full_name={pendingUpload.fullName}
                contestantId={pendingUpload.contestantId}
              />
            ))}
          </div>
         
        </main>
      </div>
    </div>
  )

}