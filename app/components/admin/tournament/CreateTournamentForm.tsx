import { Form } from '@remix-run/react'
import DragnDrop from '~/components/public/contests/DragnDrop'
import Cta from '~/components/reusables/Cta'
import FormControl from '~/components/reusables/FormControl'

export default function CreateTournamentForm() {
    return (
        <Form className='max-w-xl mx-auto grid gap-12' method='post'>
            <h1 className='text-2xl font-bold text-primary'>Create New Tournament</h1>

            <div className="grid gap-6">
                <FormControl as='input' labelText='Tournament Name' placeholder='Enter tournament name' id='name' name='name' required />
                <FormControl as='input' labelText='Tournament Unique ID' placeholder='Enter unique ID' id='uniqueId' name='uniqueId' required />
                <FormControl as='textarea' rows={3} labelText='Tournament Description' placeholder='Enter tournament description' id='description' name='description' required />
                <DragnDrop />
            </div>

            <div className='flex justify-end gap-6'>
                <Cta element='button' type='submit' className='px-8 py-2 rounded-lg font-medium'>Create Tournament</Cta>
            </div>
        </Form>
    )
}
