import { Form, useSearchParams } from '@remix-run/react'
import DragnDrop from '~/components/public/contests/DragnDrop'
import Cta from '~/components/reusables/Cta'
import FormControl from '~/components/reusables/FormControl'
import Select from '~/components/reusables/Select'
import CategoryInputs from './CategoryInputs'
import StageInputs from './StageInputs'
import { ITournament } from '~/services/tournament/types/tournament.interface'

export default function CreateContestForm({ tournaments }: { tournaments: Pick<ITournament, 'id'>[] }) {
    const [searchParams] = useSearchParams()
    const defaultTournament = searchParams.get('tournament') ?? undefined
    return (
        <Form className='max-w-[700px] mx-auto my-8 grid gap-6 sm:gap-12 text-sm' method='post' encType="multipart/form-data">
            <h1 className='text-2xl font-bold text-primary'>Contest Details</h1>

            <fieldset className="grid gap-3 sm:gap-6 sm:grid-cols-2">
                <Select name="tournament" id="tournament" label='Tournament' className="uppercase" defaultValue={defaultTournament} required>
                    <option value=''>Select a tournament</option>
                    {tournaments.map(tournament => (
                        <option key={tournament.id} value={tournament.id}>{tournament.id}</option>
                    ))}
                </Select>
                <FormControl as='input' labelText='Contest Name' placeholder='Enter contest name' id='name' name='name' required />
                <FormControl as='textarea' rows={3} labelClassNames='sm:col-span-2' labelText='Contest Description' placeholder='Enter contest description' id='description' name='description' required />
                <FormControl as='input' labelText='Unique Contest ID' placeholder='Enter unique ID' id='uniqueId' name='uniqueId' required />
                <FormControl as='input' type='date' labelText='Registration Deadline' id='reg_deadline' name='reg_deadline' required />
                <FormControl as='input' type='date' labelText='Contest Start Date' id='start_date' name='start_date' required />
                <FormControl as='input' type='date' labelText='Contest End Date' id='end_date' name='end_date' required />
                <FormControl as='textarea' rows={2} labelText='Contest Prizes' labelClassNames='sm:col-span-2' placeholder='Enter contest prizes' id='prizes' name='prizes' required />
                <DragnDrop className='sm:col-span-2' name='image' multiple={false} />
            </fieldset>

            <CategoryInputs />
            <StageInputs />

            <fieldset className="grid gap-3 sm:gap-6">
                <legend className='text-lg mb-4 font-bold'>Submission Guidelines</legend>
                <FormControl as='textarea' rows={4} labelText='Submission Requirements' placeholder='Enter text here...' id='sub_req' name='sub_req' required />
                <FormControl as='textarea' rows={4} labelText='Terms & Conditions' placeholder='Enter text here...' id='tnc' name='tnc' required />
                <FormControl as='textarea' rows={4} labelText='Additional Information' placeholder='Enter text here...' id='add_info' name='add_info' required />
            </fieldset>

            <div className='flex justify-end gap-6'>
                <Cta element='button' type='submit' className='px-8 py-2 rounded-lg font-medium max-sm:grow'>Create Contest</Cta>
            </div>
        </Form>
    )
}
