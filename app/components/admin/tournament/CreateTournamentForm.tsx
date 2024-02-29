import { Form } from '@remix-run/react'
import FormControl from '~/components/reusables/FormControl'
import DragnDrop from '~/components/public/contests/DragnDrop'
import Cta from '~/components/reusables/Cta'

export default function CreateTournamentForm() {
    return (
        <Form className='max-w-xl mx-auto grid gap-6 sm:gap-12' method='post' encType='multipart/form-data'>
            <h1 className='text-xl xs:text-2xl font-bold text-primary'>Create New Tournament</h1>

            <div className="grid gap-3 sm:gap-6">
                <FormControl as='input' labelText='Tournament Name' placeholder='Enter tournament name' id='name' name='name' required />
                <FormControl as='input' labelText='Tournament Unique ID' placeholder='Enter unique ID' id='uniqueId' name='uniqueId' required />
                <FormControl as='textarea' rows={3} labelText='Tournament Description' placeholder='Enter tournament description' id='description' name='description' required />
                <DragnDrop labelText='Tournament Image' name='image' />
            </div>

            <div className='flex justify-end gap-6'>
                <Cta element='button' type='submit' className='px-8 py-2 rounded-lg font-medium max-sm:grow'>Create Tournament</Cta>
            </div>
        </Form>
    )
}
