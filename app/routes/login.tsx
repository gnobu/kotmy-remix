import { Form, Link } from "@remix-run/react"
import { icons } from "~/assets/icons"
import { adminAvatar } from "~/assets/images"
import FormControl from "~/components/reusables/FormControl"
import Cta from "~/components/reusables/Cta"
import Svg from "~/components/reusables/Svg"
import { ActionFunctionArgs } from "@remix-run/node"

export async function action({request}:ActionFunctionArgs) {
    const formData = await request.formData()
    console.log(...formData)
    return null
}

export default function Login() {
    return <main className="h-dvh bg-secondary p-4 flex flex-col">
        <Link to={'/'} aria-label='home'>
            <Svg src={icons.logoIcon} className='w-14 h-14 sm:w-16 sm:h-16' />
        </Link>
        <section className="grow flex flex-col justify-center items-center">
            <Form method="POST" className="w-full max-w-md p-4 sm:p-8 bg-white border rounded-3xl flex flex-col gap-3">
                <div className="w-max mx-auto p-4 border border-disabled rounded-full bg-gradient-to-b from-slate-200 to-white">
                    <div className="w-max p-4 border border-disabled rounded-full bg-white">
                        <img src={adminAvatar} alt="person silhouette" width={24} height={24} />
                    </div>
                </div>
                <h1 className="text-2xl font-satoshi-bold text-center">Enter your details to login</h1>
                <hr />
                <div className="my-2 flex flex-col gap-3">
                    <FormControl as="input" id="username" name="username" placeholder="Enter your username"
                        labelText="Username" icon={icons.avatarIcon} required />
                    <FormControl as="input" id="password" name="password" placeholder="Enter your password"
                        labelText="Password" type="password" icon={icons.lockIcon} required />
                </div>
                <Cta element="button" type="submit" className="rounded-lg p-3">Login</Cta>
            </Form>
        </section>
    </main>
}
