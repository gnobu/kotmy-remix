import { useState } from 'react'
import { Form } from '@remix-run/react'
import DragnDrop from '~/components/public/contests/DragnDrop'
import Cta from '~/components/reusables/Cta'
import FormControl from '~/components/reusables/FormControl'
import Select from '~/components/reusables/Select'
import CategoryInputs from './CategoryInputs'
import StageInputs from './StageInputs'

export default function CreateContestForm({ tournaments }: { tournaments: Pick<Tournament, 'uniqueId'>[] }) {
    const [numOfStages, setNumOfStages] = useState(1)
    return (
        <Form className='max-w-[700px] mx-auto grid gap-12 text-sm' method='post'>
            <h1 className='text-2xl font-bold text-primary'>Contest Details</h1>

            <fieldset className="grid gap-6 grid-cols-2">
                <Select name="tournament" id="tournament" label='Tournament' className="uppercase">
                    {tournaments.map(tournament => (
                        <option key={tournament.uniqueId} value={tournament.uniqueId}>{tournament.uniqueId}</option>
                    ))}
                </Select>
                <FormControl as='input' labelText='Contest Name' placeholder='Enter contest name' id='name' name='name' required />
                <FormControl as='textarea' rows={3} labelClassNames='col-span-2' labelText='Contest Description' placeholder='Enter contest description' id='description' name='description' required />
                <FormControl as='input' labelText='Unique Contest ID' placeholder='Enter unique ID' id='uniqueId' name='uniqueId' required />
                <FormControl as='input' type='number' labelText='Number of Stages' id='no_stages' name='no_stages' value={numOfStages} onChange={(e) => setNumOfStages(+e.target.value)} min={1} required />
                <FormControl as='input' type='date' labelText='Contest Start Date' id='start_date' name='start_date' required />
                <FormControl as='input' type='date' labelText='Contest End Date' id='end_date' name='end_date' required />
                <FormControl as='input' type='date' labelText='Registration Deadline' id='reg_deadline' name='reg_deadline' required />
                <FormControl as='textarea' rows={2} labelText='Contest Prizes' placeholder='Enter contest prizes' id='prizes' name='prizes' required />
                <DragnDrop className='col-span-2' />
            </fieldset>

            <CategoryInputs />
            <StageInputs stages={numOfStages} />

            <fieldset className="grid gap-6">
                <legend className='text-lg mb-4 font-bold'>Submission Guidelines</legend>
                <FormControl as='textarea' rows={4} labelText='Submission Requirements' placeholder='Enter text here...' id='sub_req' name='sub_req' required />
                <FormControl as='textarea' rows={4} labelText='Terms & Conditions' placeholder='Enter text here...' id='tnc' name='tnc' required />
                <FormControl as='textarea' rows={4} labelText='Additional Information' placeholder='Enter text here...' id='add_info' name='add_info' required />
            </fieldset>

            <div className='flex justify-end gap-6'>
                <Cta element='button' type='submit' className='px-8 py-2 rounded-lg font-medium'>Create Contest</Cta>
            </div>
        </Form>
    )
}
