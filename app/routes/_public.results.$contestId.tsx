import { LoaderFunctionArgs, json, redirect } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { table } from "node:console"
import Pagination from "~/components/reusables/Pagination"
import Select from "~/components/reusables/Select"
import StatusTag from "~/components/reusables/StatusTag"
import { getContest } from "~/lib/data/contest.server"
import { getFinalResultForContest } from "~/services/contest/contest.server"

export async function loader({ params }: LoaderFunctionArgs) {
    const { contestId } = params
    if (!contestId) return redirect(`/results`)
    const {data: contest, error} = await getFinalResultForContest(contestId)
    
    if (error) redirect(`/results`)
    return { contest }
}

export default function ContestResult() {
    const {  contest } = useLoaderData<typeof loader>()
    if(!contest) throw redirect(`/results`)
    
    const color = contest.status === 'registering'
        ? 'yellow' : contest.status === 'ongoing'
            ? 'green' : contest.status === 'completed'
                ? 'red' : 'gray'
    let headings: string[] = []
    let table_results: {[key: string]: string | number}[] = []
    if(contest?.final_result_scores){
        headings = contest.final_result_headings
        table_results = contest.final_result_scores.map(res => res.table_data)
    }
    return (
        <main className='grow'>
            <header className="wrapper my-16">
                <h1 className='text-accent text-2xl lg:text-4xl lg:leading-snug font-satoshi-bold max-w-3xl uppercase mb-10'>
                    {contest.name} Result Table
                </h1>
                <div className="grid gap-6 max-w-2xl">
                    <div className="">
                        <span className="block font-satoshi-bold mb-1">Status</span>
                        <StatusTag status={contest.status} color={color} />
                    </div>
                    <div className="grid grid-cols-2 gap-14">
                        <div className="">
                            <span className="block font-satoshi-bold mb-1">Categories</span>
                            <span className="block">{contest.categories.join(", ")}</span>
                        </div>
                        <div className="">
                            <span className="block font-satoshi-bold mb-1">Stages</span>
                            <span className="block">{contest.no_of_stages ?? 0}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-14">
                        <div className="">
                            <span className="block font-satoshi-bold mb-1">Duration</span>
                            <span className="block">From May 23 to June 20</span>
                        </div>
                        <div className="">
                            <span className="block font-satoshi-bold mb-1">Prizes</span>
                            <span className="block">{contest.prizes}</span>
                        </div>
                    </div>
                </div>
            </header>
            <section className="bg-white my-16">
                <div className="wrapper py-6">
                    <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-8 justify-between md:items-center py-6">
                        <fieldset className="flex gap-4 flex-wrap sm:justify-end">
                            <Select name="stage" id="stage" containerClass="bg-secondary">
                                <option value="1">{contest.name.toUpperCase()} - {"FINAL RESULT TABLE"}</option>
                            </Select>
                            <Select name="category" id="category" containerClass="bg-secondary">
                                <option value="">Sort by category</option>
                            </Select>
                        </fieldset>
                        <span className="whitespace-nowrap font-satoshi-bold">SMV: SOCIAL MEDIA VOTES</span>
                    </div>
                    <div className="w-full overflow-x-auto">
                        <table className="w-full table-auto border border-secondary">
                            <thead>
                                <tr>
                                    <th className="text-left uppercase font-satoshi-black border border-secondary px-6 py-4">S/N</th>
                                    {headings.map(heading => (
                                        <th className="text-left uppercase font-satoshi-black border border-secondary px-6 py-4" key={heading}>{heading}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {/* {(new Array(20) as typeof resultData[]).fill(resultData).map((contestant, index) => ( */}
                                {table_results.map((contestant, index) => (
                                    
                                    <tr key={index}>
                                        <td className="border border-secondary px-6 py-4">{index + 1}</td>
                                        {headings.map(heading => (
                                            <td className="border border-secondary px-6 py-4" key={heading}>{contestant[heading]}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination className="p-6" />
                </div>
            </section>
        </main>
    )
}
