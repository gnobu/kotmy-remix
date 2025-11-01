import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import ContestCard from '~/components/reusables/ContestCard'
import { tournamentRepo } from '~/services/tournament/tournament.server'

export async function loader() {
  const { data: tournaments, error } = await tournamentRepo.getTournaments()
  if (error) throw new Error(error.detail as string)
  return json({ tournaments })
}

export default function Contests() {
  const { tournaments } = useLoaderData<typeof loader>()
  return (
    <main className='grow'>
      <header className="wrapper my-16">
        <h1 className='text-2xl lg:text-4xl font-satoshi-medium max-w-3xl'>
          From Artistic Marvels to Captivating Moments. Unleash Your Talent and Win Big in Our Monthly and Yearly Contests!
        </h1>
      </header>

      <section className='wrapper my-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center'>
        {tournaments.map(tournament => (
          <ContestCard key={tournament.id} contest={tournament} to={`/contests/${tournament.id}`} />
        ))}
      </section>
    </main>
  )
}
