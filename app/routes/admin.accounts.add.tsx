import RoundCta from '~/components/reusables/RoundCta'
import { Form, useLoaderData, useNavigate } from '@remix-run/react'
import { icons } from '~/assets/icons'
import FormControl from '~/components/reusables/FormControl'
import Select from '~/components/reusables/Select'
import Cta from '~/components/reusables/Cta'
import PermissionsFormControl from '~/components/admin/PermissionsFormControl'
import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'

export async function loader({ }: LoaderFunctionArgs) {
  const permissions = ['manage_users', 'edit_content', 'edit_blog']
  return { permissions }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  console.log(...formData)
  console.log(formData.getAll('permission'))
  return null
}

export default function AddAdminUser() {
  const { permissions } = useLoaderData<typeof loader>()
  const navigate = useNavigate()
  return (
    <main className='w-full overflow-y-auto p-6'>
      <div className="flex items-center mb-16 gap-4">
        <RoundCta icon={icons.arrowPrevIcon} className="hover:bg-[#F7F7F8] text-primary" onClick={() => navigate(-1)} />
        <h1 className="text-2xl font-black text-primary">Add User</h1>
      </div>
      <Form className='wrapper grid grid-cols-2 gap-6' method='post'>
        <FormControl as='input' labelText='First Name' className='' placeholder='Enter first name' id='firstName' name='firstName' required />
        <FormControl as='input' labelText='Last Name' className='' placeholder='Enter last name' id='lastName' name='lastName' required />
        <FormControl as='input' labelText='Email Address' className='' placeholder='Enter email address' id='email' name='email' required />
        <FormControl as='input' labelText='Username' className='' placeholder='Enter username' id='username' name='username' required />
        <FormControl as='input' type='password' labelText='Password' className='' placeholder='Create password' id='password' name='password' required />
        <Select label='Assign Role' id='role' name='role' required>
          <option value="1">Role 1</option>
          <option value="2">Role 2</option>
          <option value="3">Role 3</option>
        </Select>

        <PermissionsFormControl permissions={permissions} />

        <div className='flex justify-end gap-6 col-span-2'>
          <Cta element='button' type='reset' className='px-8 py-2 rounded-lg font-medium' variant='outline'>Reset</Cta>
          <Cta element='button' type='submit' className='px-8 py-2 rounded-lg font-medium'>Submit</Cta>
        </div>
      </Form>
    </main>
  )
}
