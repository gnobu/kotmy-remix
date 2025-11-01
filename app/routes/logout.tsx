import {  Link, useSearchParams } from "@remix-run/react"
import { useEffect } from "react"
import { useUserManager } from "~/lib/store/store_managers/tokenManager"





function useLogoutController(){
    const [searchQuery] = useSearchParams();
    const {deleteUserStoreManager} = useUserManager();

   
    useEffect(() => {
        // try to get user
        deleteUserStoreManager();
        // if user is signed in already, redirect to dashboard

    }, [])
    
}
export default function Logout() {
    useLogoutController();
    return <main className="h-dvh bg-secondary p-4 flex flex-col justify-center items-center">
        <h1 className="text-2xl font-satoshi-bold text-center">You have been logged out</h1>
        <Link to={'/login'} className="mt-4 text-center underline">Login again</Link>
    </main>
}
