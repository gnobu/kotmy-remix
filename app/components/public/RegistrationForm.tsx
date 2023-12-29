import { Form } from '@remix-run/react'
import FormControl from '../reusables/FormControl'
import Select from '../reusables/Select'
import Button from '../reusables/Button'
import DragnDrop from './DragnDrop'

export default function RegistrationForm({ onSubmit }: { onSubmit?: () => void }) {
    return (
        <Form className='bg-secondary p-10 sm:rounded-3xl flex flex-col w-full max-w-xl gap-6'>
            <p className='text-2xl font-satoshi-bold'>
                Participate by filling in your basic information below and clicking 'Submit'.
            </p>
            <div className="grid gap-6 lg:grid-cols-2">
                <FormControl as='input' labelText='Full Name' id='fullName' name='fullName'
                    placeholder='Enter your full name'
                />
                <FormControl as='input' labelText='Email Address' id='email' name='email'
                    placeholder='Enter your email address'
                />
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
                <FormControl as='input' type='date' labelText='Date of Birth' id='state' name='state'
                    placeholder='mm/dd/yyyy' min={new Date().toISOString().split("T")[0]}
                />
                <Select label='Gender'>
                    <option defaultValue={''}>Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </Select>
            </div>
            <FormControl as='input' labelText='State of Residence' id='state' name='state'
                placeholder='Enter your state of residence'
            />
            <DragnDrop />
            <Button element='button' type='submit' onClick={onSubmit} className='md:self-end'>Submit</Button>
        </Form>
    )
}
