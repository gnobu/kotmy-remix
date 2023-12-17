import ContestCard from '~/components/reusables/ContestCard'
import { contests } from '~/lib/data/landingPage.data'

export default function Contests() {
  return (
    <main className='grow'>
      <header className="wrapper my-16">
        <h1 className='text-2xl lg:text-4xl font-satoshi-medium max-w-3xl'>
          From Artistic Marvels to Captivating Moments. Unleash Your Talent and Win Big in Our Monthly and Yearly Contests!
        </h1>
      </header>

      <section className='wrapper my-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center'>
        {contests.map(contest => (
          <ContestCard key={contest._id} contest={contest} />
        ))}
      </section>
    </main>
  )
}
