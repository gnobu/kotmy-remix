import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import _default from "node_modules/chart.js/dist/core/core.defaults";
import { contestRepo } from "~/services/contest/contest.server";



export async function loader({ params }: LoaderFunctionArgs) {
  let winnerId = params.winnerId!;
  let { data: winner, error } = await contestRepo.getWinnerById(winnerId);
  return { winner, error };
}


export default function WinnerDetailsPage() {
  const {winner, error} = useLoaderData<typeof loader>();

  const description =
    `We Are Thrilled To Announce The Triumphant Winner Of Our Recent '${winner?.contest_name}'! Let's Take A Moment To Applaud The Outstanding Creativity And Talent That Graced Our Contest.`;

  return (
    <div className="min-h-screen bg-[#EFEFFF] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto bg-transparent">
        
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          
          <div className="w-full aspect-[3/4] overflow-hidden rounded-2xl shadow-xl order-2 md:order-1">
            <img
              src={winner?.image_url}
              alt={winner?.full_name}
              className="w-full h-full object-cover"
            />
          </div>
         
          <div className="space-y-4 md:space-y-6 order-1 md:order-2">
            <h1 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold text-[#5B50FB] leading-tight">
              {winner?.contest_name} Winner
            </h1>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              {description}
            </p>
            <p className="text-lg sm:text-xl font-bold text-gray-900">
              Grand Winner:{" "}
              <span className="text-gray-900">{winner?.full_name}</span> (
              {winner?.contest_name})
            </p>
            <p className="text-sm italic text-gray-600 pt-2">
                Winner's Note: "{winner?.remark}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
