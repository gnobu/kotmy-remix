import { Form, Link, useActionData, useNavigate, useParams, useSearchParams } from "@remix-run/react"
import { icons } from "~/assets/icons"
import { adminAvatar } from "~/assets/images"
import FormControl from "~/components/reusables/FormControl"
import Cta from "~/components/reusables/Cta"
import Svg from "~/components/reusables/Svg"
import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from "@remix-run/node"
import { ILoginDTO } from "~/services/auth/types/auth.dtos"
import { authServer } from "~/services/auth/auth.server"
import { setToast } from "~/lib/session.server"
import { toast, useToast } from "~/components/reusables/use-toast"
import { Toast } from "~/components/reusables/toast"
import { useEffect } from "react"
import { useUserManager } from "~/lib/store/store_managers/tokenManager"


export async function loader({request}:LoaderFunctionArgs) {

    return null
}
export async function action({request}:ActionFunctionArgs) {

    const url = new URL(request.url);
    const searchQuery = url.searchParams;
    const formData = await request.formData()
    const loginDto: ILoginDTO = {
        email: formData.get("email") as string,
        password: formData.get("password") as string
    }

    const {error, data, headers} = await authServer.login(loginDto)
    if(error){
        return { error: error.detail?.toString() || "An error occurred during login.", data: null};
    }

    console.log(data)
    console.log("God abeg o, HEADERS", headers)

    let responseHeaders : Record<string, string> = {};
    if(headers?.['Set-Cookie']){
        const setCookieHeader = headers?.['Set-Cookie'];
        responseHeaders = { "Set-Cookie": setCookieHeader }
        return json({ data, error: null }, { 
            headers: responseHeaders 
         });
    }

    return json({ data, error: null })
    
}

function useLoginController(){
    const actionData = useActionData<typeof action>();
    const [searchQuery] = useSearchParams();
    const {setUserStoreManager, getUserStoreManager} = useUserManager();

    const { toast } = useToast();

    const navigate = useNavigate();

    useEffect(() => {
        // try to get user
        const user = getUserStoreManager();
        if(user){
            navigate(searchQuery.get("redirectTo") || '/user');
        }
        // if user is signed in already, redirect to dashboard

    }, [])
    useEffect(() => {
        if(actionData?.error){
            toast({
                variant: "destructive",
                title: "Login Failed",
                description: actionData.error
            });
            actionData.error = "";
        }
    }, [actionData?.error]);

    useEffect(() => {
        if(actionData?.data){
            setUserStoreManager(actionData.data, true);
            navigate(searchQuery.get("redirectTo") || '/user');
            return;
        }
    }, [actionData?.data])
    return {actionData}
}
export default function Login() {
    const { actionData } = useLoginController();
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
                    <FormControl as="input" id="email" name="email" placeholder="Enter your email address"
                        labelText="email" icon={icons.avatarIcon} required />
                    
                    <FormControl as="input" id="password" name="password" placeholder="Enter your password"
                        labelText="Password" type="password" icon={icons.lockIcon} required />
                </div>
                <Cta element="button" type="submit" className="rounded-lg p-3">Login</Cta>
            </Form>
        </section>
    </main>
}
