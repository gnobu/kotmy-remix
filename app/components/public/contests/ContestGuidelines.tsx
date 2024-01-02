import StatusTag from "../../reusables/StatusTag";

const tnc = [
    'To be eligible for this Competition, an individual must: be a legal resident of Nigeria and the age of maturity in the province of Nigeria - 18 years and above; and must be a parent, related guardian or sibling to the competing kid.',
    'A valid Birth Certificate for the Child will be requested before prize presentation.',
    'All competing babies must be between the ages of 0 and 14 years.',
    'The Company reserve the right, in their sole discretion, to disqualify any entrant should such an entrant at any stage supply untruthful, incomplete, inaccurate, or misleading personal details and/or information.'
]

const notes = [
    'Parents or legal guardians must assist participants under the age of 14 with the submission process.',
    'By submitting a photo, participants agree to allow the contest organizers to showcase their photo on the website and social media.',
]

export default function ContestGuidelines() {
    return (
        <div className='wrapper sm:max-w-lg sm:mx-0'>
            <div className="mb-6">
                <span className="block font-satoshi-bold mb-1">Status</span>
                <StatusTag status={'registering'} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 my-8">
                <div className="">
                    <span className="block font-satoshi-bold mb-1">Age Categories</span>
                    <span className="block">0 - 14 Years</span>
                </div>
                <div className="">
                    <span className="block font-satoshi-bold mb-1">Submission Guideline</span>
                    <span className="block">High-resolution images preferred for clarity.</span>
                </div>
                <div className="">
                    <span className="block font-satoshi-bold mb-1">Submission Deadline</span>
                    <span className="block">All entries must be submitted by [Insert Date].</span>
                </div>
                <div className="">
                    <span className="block font-satoshi-bold mb-1">Prizes</span>
                    <span className="block">3 million naira worth of prizes for winners.</span>
                </div>
            </div>
            <ol className="list-decimal list-inside flex flex-col gap-4 my-8">
                <span className="font-satoshi-bold">Terms & Conditions</span>
                {tnc.map(item => (
                    <li key={item}>{item}</li>
                ))}
            </ol>
            <ol className="list-decimal list-inside flex flex-col gap-4 my-8">
                <span className="font-satoshi-bold">Additional Notes</span>
                {notes.map(note => (
                    <li key={note}>{note}</li>
                ))}
            </ol>
        </div>
    )
}
