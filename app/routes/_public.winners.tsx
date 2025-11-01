import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { contestRepo } from "~/services/contest/contest.server";

export async function loader({ params }: LoaderFunctionArgs) {
  let { data: winners, error } = await contestRepo.getWinners();
  return { winners, error };
}

interface WinnerCardProps {
  image_url: string;
  contest_name: string;
  remark: string;
  full_name: string;
  id: string;
}

const WinnerCard: React.FC<WinnerCardProps> = ({
  image_url,
  contest_name,
  remark,
  full_name,
  id
}) => (
  <Link to={`/winner/${id}`} className="block transition-shadow">
  <article>
    <img
      src={image_url}
      alt={full_name}
      className="w-full aspect-[3/4] rounded-lg object-cover"
    />
    <div className="pt-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        {contest_name}
      </p>
      <h3 className="mt-1 text-lg font-bold text-gray-900">{full_name}</h3>
    </div>
  </article>
  </Link>
);

const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
    />
  </svg>
);

export default function Winners() {
  const { winners, error } = useLoaderData<typeof loader>();
  const [searchWinners, setSearchWinners] = useState("");
  const [winnersFiltered, setWinnersFiltered] = useState(winners ?? []);

  useEffect(() => {
    setWinnersFiltered(winners ?? []);
  }, [winners]);

  useEffect(() => {
    const updated = (winners ?? []).filter((winner) =>
      winner.full_name.toLowerCase().includes(searchWinners.trim().toLowerCase()) ||
      winner.contest_name.toLowerCase().includes(searchWinners.trim().toLowerCase())
    );
    setWinnersFiltered(updated);
  }, [searchWinners, winners]);

  if (error) {
    return (
      <h1 className="font-satoshi-bold text-4xl text-center">
        {error.detail as string}
      </h1>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <header className="bg-[#817EFB] overflow-hidden rounded-3xl py-8 md:py-12 lg:py-16 px-5">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Meet Our Talented Contest Winners
            </h1>
            <p className="mt-4 text-base md:text-lg text-purple-100">
              A Glimpse of the Extraordinary Creations That Stole the Show
            </p>
            <div className="mt-8 relative max-w-lg mx-auto">
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
            </div>
          </div>
        </header>
        <main className="py-12 md:py-16">
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {winnersFiltered.map((winner, idx) => (
              <WinnerCard
                key={winner.contestant_code || idx}
                image_url={winner.image_url}
                contest_name={winner.contest_name}
                remark={winner.remark}
                full_name={winner.full_name}
                id={winner._id}
              />
            ))}
          </div>
          <div className="mt-12 md:mt-16 text-center">
            <button
              type="button"
              className="inline-flex items-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors"
            >
              See more
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}