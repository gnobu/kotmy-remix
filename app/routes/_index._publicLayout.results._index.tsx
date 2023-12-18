import Button from '~/components/reusables/Button'
import ContestCard from '~/components/reusables/ContestCard'
import { contests } from '~/lib/data/landingPage.data'

export default function Results() {
  return (
    <main className='grow'>
      <header className="wrapper my-16">
        <h1 className='text-accent text-2xl lg:text-4xl lg:leading-snug font-satoshi-bold max-w-3xl'>
          Congratulating the Extraordinary Talents That Stole the Spotlight!
        </h1>
      </header>

      <section className='wrapper'>
        <div className="p-2 rounded-full bg-secondary flex w-fit">
          <span className="whitespace-nowrap text-xs sm:text-base p-3 sm:px-6 sm:py-4 rounded-full font-satoshi-medium bg-accent text-white">All Contests</span>
          <span className="whitespace-nowrap text-xs sm:text-base p-3 sm:px-6 sm:py-4 rounded-full font-satoshi-medium">Ongoing Contests</span>
          <span className="whitespace-nowrap text-xs sm:text-base p-3 sm:px-6 sm:py-4 rounded-full font-satoshi-medium">Completed Contests</span>
        </div>
      </section>

      <section className='wrapper my-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center'>
        {contests.map(contest => (
          <ContestCard key={contest._id} contest={contest} />
        ))}
      </section>

      <div className="wrapper my-20 flex justify-center">
        <Button element="button" variant="outline">See more results</Button>
      </div>
    </main>
  )
}
