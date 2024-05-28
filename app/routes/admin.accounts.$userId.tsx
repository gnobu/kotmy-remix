import RoundCta from '~/components/reusables/RoundCta'
import { Form, useLoaderData, useNavigate } from '@remix-run/react'
import { icons } from '~/assets/icons'
import FormControl from '~/components/reusables/FormControl'
import Select from '~/components/reusables/Select'
import Cta from '~/components/reusables/Cta'
import PermissionsFormControl from '~/components/admin/PermissionsFormControl'
import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { adminUsers, permissions } from '~/lib/data/admin'
import { setToast } from '~/lib/session.server'

export async function loader({ params, request }: LoaderFunctionArgs) {
  const user = adminUsers.find(user => user.id == params.userId)
  if (!user) {
    const { headers } = await setToast({ request, toast: `error::Admin user not found::${Date.now()}` })
    return redirect('/admin/accounts', { headers })
  }
  return { permissions, user }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  console.log(...formData)
  console.log(formData.getAll('permission'))
  const { headers } = await setToast({ request, toast: `success::User updated  successfully::${Date.now()}` })
  return redirect('/admin/accounts', { headers })
}

export default function EditAdminUser() {
  const { permissions, user } = useLoaderData<typeof loader>()
  const navigate = useNavigate()
  return (
    <main className='w-full overflow-y-auto p-6'>
      <div className="flex items-center mb-10 sm:mb-16 gap-4">
        <RoundCta icon={icons.arrowPrevIcon} className="hover:bg-[#F7F7F8] text-primary" onClick={() => navigate(-1)} />
        <h1 className="text-2xl font-black text-primary">Edit User</h1>
      </div>
      <Form className='sm:wrapper grid sm:grid-cols-2 gap-3 sm:gap-6 text-sm' method='post'>
        <FormControl as='input' labelText='First Name' className='' placeholder='Enter first name' id='firstName' name='firstName' defaultValue={user.full_name.split(' ')[0]} required />
        <FormControl as='input' labelText='Last Name' className='' placeholder='Enter last name' id='lastName' name='lastName' defaultValue={user.full_name.split(' ')[1]} required />
        <FormControl as='input' labelText='Email Address' className='' placeholder='Enter email address' id='email' name='email' defaultValue={user.email} required />
        <FormControl as='input' labelText='Username' className='' placeholder='Enter username' id='username' name='username' defaultValue={user.username} required />
        <FormControl as='input' type='password' labelText='Password' className='' placeholder='Create password' id='password' name='password' defaultValue={user.password} required />
        <Select label='Assign Role' id='role' name='role' defaultValue={user.role} required>
          <option value="Role 1">Role 1</option>
          <option value="Role 2">Role 2</option>
          <option value="Role 3">Role 3</option>
        </Select>

        <PermissionsFormControl permissions={permissions} defaultPermissions={user.permissions} />

        <div className='grid grid-cols-2 sm:flex justify-end gap-3 sm:gap-6 sm:col-span-2 mt-4'>
          <Cta element='button' type='reset' className='px-4 sm:px-8 py-2 rounded-lg font-medium border-secondary active:border-accent' variant='outline'>Reset</Cta>
          <Cta element='button' type='submit' className='px-4 sm:px-8 py-2 rounded-lg font-medium'>Submit</Cta>
        </div>
      </Form>
    </main>
  )
}
