import { ActionFunctionArgs, json } from "@remix-run/node";
import { useLoaderData, useRouteLoaderData } from "@remix-run/react";

import ContestTimer from "~/components/public/contests/ContestTimer";
import { noImage } from "~/assets/images";
import StatusTag from "~/components/reusables/StatusTag";
import { StageContestantsLoader } from "./_public.contests.$tournamentId.$contestId";
import { contestantRepo } from "~/services/contestant/contestant.server";
import { setToast } from "~/lib/session.server";
import StageUploadForm from "~/components/public/contests/StageUploadForm";

export async function loader({ request }: ActionFunctionArgs) {
  const url = new URL(request.url);
  const hash = url.searchParams.get("hash");
  if (!hash) return null;
  const { data, error } = await contestantRepo.getContestantViaHash(hash);
  if (error) {
    const { headers } = await setToast({
      request,
      toast: `error::An error occurred while fetching your data. Please try again.::${Date.now()}`,
    });
    return json(null, { headers });
  }
  return json({ contest: data, hash });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent") as "stage_upload";
  if (intent === "stage_upload") {
    console.log(...formData);
    return json(null);
  }
  const { headers } = await setToast({
    request,
    toast: `error::This action is not yet supported::${Date.now()}`,
  });
  return json(null, { headers });
}

export default function StageMediaUpload() {
  //   const parentRouteData = useRouteLoaderData<StageContestantsLoader>(
  //     "routes/_public.contests.$tournamentId.$contestId"
  //   );
  //   if (!parentRouteData) throw new Error("Could not load stage contestants");
  const contestFromCode = useLoaderData<typeof loader>();
  const contest = contestFromCode?.contest;
  const stage = contestFromCode?.contest?.stages[0];
  const hash = contestFromCode?.hash ?? "";
  const color =
    contest?.status === "registering"
      ? "yellow"
      : contest?.status === "ongoing"
        ? "green"
        : contest?.status === "completed"
          ? "red"
          : "gray";
  return (
    <main className="grow">
      {contest ? (
        <>
          <header className="wrapper my-16 grid md:grid-cols-2 justify-between gap-6 md:gap-8">
            <div className="grid">
              <div className="max-w-2xl">
                <h1 className="text-accent text-2xl lg:text-4xl font-satoshi-black max-w-3xl mb-3 uppercase">
                  {contest!.name}
                </h1>
                <p className="font-satoshi-medium">{contest.desc}</p>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-2 max-w-4xl">
                <div className="">
                  <span className="block font-satoshi-bold mb-1">Status</span>
                  <StatusTag status={contest.status} color={color} />
                </div>
                <div className="">
                  <span className="block font-satoshi-bold mb-1">
                    Categories
                  </span>
                  <div className="flex gap-4 flex-wrap capitalize">
                    {contest.categories.map((category) => (
                      <span key={category}>~ {category}</span>
                    ))}
                  </div>
                </div>
                <div className="col-span-2">
                  <span className="block font-satoshi-bold mb-1">Prizes</span>
                  <span className="block">{contest.prizes}</span>
                </div>
              </div>
              <ContestTimer
                deadline={new Date(contest.end_date)}
                title="contest ends in"
              />
            </div>
            <img
              src={contest.image || noImage}
              alt="kid smiling"
              className="w-full rounded-3xl h-[350px] object-cover"
            />
          </header>
          <section className="my-10 flex flex-col gap-6">
            <div className="wrapper">
              <h2 className="font-bold text-2xl textacc">
                Stage {stage?.stage} Form
              </h2>
            </div>
            <div className="wrapper flex">
              <StageUploadForm
                contest={contest}
                contestant={contest.stages[0]?.contestants?.[0]}
                hash={hash}
              />
            </div>
          </section>
        </>
      ) : null}
    </main>
  );
}
