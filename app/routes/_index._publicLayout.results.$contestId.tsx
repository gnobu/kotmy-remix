import { LoaderFunctionArgs, json, redirect } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { icons } from "~/assets/icons"
import Button from "~/components/reusables/Button"
import Select from "~/components/reusables/Select"
import StatusTag from "~/components/reusables/StatusTag"
import Svg from "~/components/reusables/Svg"
import { contests } from "~/lib/data/landingPage.data"

export async function loader({ params }: LoaderFunctionArgs) {
    const { contestId } = params
    const contest = contests.find(contest => contest._id === contestId)
    if (!contest) return redirect('/results')
    return json({ result: contest })
}

const resultData = {
    's/n': 1,
    'contestant': 'BAKARE GREAT IREAYOMIDE',
    'facebook': 0.6,
    'instagram': 0.6,
    'twitter': 0.6,
    'total smv': 1.8,
    'tally vote': 1.07,
    'grand total': 2.87,
    'top 3 positions': '1st'
}
const headings = Object.keys(resultData) as (keyof typeof resultData)[]

export default function ContestResult() {
    const { result } = useLoaderData<typeof loader>()

    return (
        <main className='grow'>
            <header className="wrapper my-16">
                <h1 className='text-accent text-2xl lg:text-4xl lg:leading-snug font-satoshi-bold max-w-3xl uppercase mb-10'>
                    {result.title} Result Table
                </h1>
                <div className="grid gap-6 max-w-2xl">
                    <div className="">
                        <span className="block font-satoshi-bold mb-1">Status</span>
                        <StatusTag status={result.status} />
                    </div>
                    <div className="grid grid-cols-2 gap-14">
                        <div className="">
                            <span className="block font-satoshi-bold mb-1">Age Categories</span>
                            <span className="block">0 - 14 Years</span>
                        </div>
                        <div className="">
                            <span className="block font-satoshi-bold mb-1">Stages</span>
                            <span className="block">3</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-14">
                        <div className="">
                            <span className="block font-satoshi-bold mb-1">Duration</span>
                            <span className="block">From May 23 to June 20</span>
                        </div>
                        <div className="">
                            <span className="block font-satoshi-bold mb-1">Prizes</span>
                            <span className="block">3 million naira worth of prizes for winners.</span>
                        </div>
                    </div>
                </div>
            </header>
            <section className="bg-white my-16">
                <div className="wrapper py-6">
                    <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-8 justify-between md:items-center py-6">
                        <fieldset className="flex gap-4 flex-wrap sm:justify-end">
                            <Select name="stage" id="stage">
                                <option value="1">KID OF JUNE 2023 - STAGE 1 RESULT TABLE</option>
                            </Select>
                            <Select name="category" id="category">
                                <option value="">Sort by category</option>
                            </Select>
                        </fieldset>
                        <span className="whitespace-nowrap font-satoshi-bold">SMV: SOCIAL MEDIA VOTES</span>
                    </div>
                    <table className="w-full table-auto border border-secondary">
                        <thead>
                            <tr>
                                {headings.map(heading => (
                                    <th className="text-left uppercase font-satoshi-black border border-secondary px-6" key={heading}>{heading}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {(new Array(20) as typeof resultData[]).fill(resultData).map((contestant, index) => (
                                <tr>
                                    {headings.map(heading => (
                                        <td className="border border-secondary px-6" key={heading}>{contestant[heading]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex gap-6 md:gap-8 justify-center items-center p-6 font-satoshi-bold">
                        <button className="flex gap-1 items-center rounded py-1 px-2 hover:outline outline-primary"><Svg src={icons.arrowPrevIcon} /> Prev</button>
                        <span className="whitespace-nowrap">1 of 20</span>
                        <button className="flex gap-1 items-center rounded py-1 px-2 hover:outline outline-primary">Next <Svg src={icons.arrowNextIcon} /></button>
                    </div>
                </div>
            </section>
        </main>
    )
}
