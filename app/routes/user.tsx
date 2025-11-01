import type { MetaFunction } from "@remix-run/node"
import { Outlet, useLocation } from "@remix-run/react"
import { useEffect, useState } from "react"
import Cta from "~/components/reusables/Cta"
import UserPrimaryHeader from "~/components/user/UserPrimaryHeader"
import UserMobileHeader from "~/components/user/UserMobileHeader"
import UserMobileNavigation from "~/components/user/UserMobileNavigation"
import UserNavigation from "~/components/user/UserNavigation"

export const meta: MetaFunction = () => {
    return [
        { title: "KOTMY | Admin" },
        { name: "description", content: "KOTMY Admin application" },
    ]
}

function Layout({ children }: { children: React.ReactNode }) {
    const [showNav, setShowNav] = useState(false)
    useEffect(() => {
        setShowNav(window.innerWidth >= 640)
    }, [])
    return (<div className="bg-tertiary text-admin-pry">
        <UserPrimaryHeader toggleNav={() => { setShowNav(prev => !prev) }} />
        <UserMobileHeader toggleNav={() => { setShowNav(prev => !prev) }} />
        <UserMobileNavigation onClose={() => { setShowNav(false) }} show={showNav} />

        <div className="sm:flex sm:h-[calc(100vh-85px)]"> 
            {/* UserNavigation must be contained within a div that allows it to occupy the full height */}
            <UserNavigation show={showNav} />
            
            {/* ADDED: flex-grow and overflow-y-auto to the content area so only the content scrolls */}
            <div className="flex-grow overflow-y-auto">
                {children}
            </div>
        </div>
    </div>)
}

export default function UserLayout() {
    return <Layout><Outlet /></Layout>
}

export function ErrorBoundary() {
    const { pathname } = useLocation()
    let heading = 'Something went wrong'
    let message = `Apologies, something went wrong on our end. Please try again.`
    return <Layout>
        <div className="w-full max-sm:h-[calc(100dvh-73px)] p-5 m-auto lg:max-w-3xl grid place-content-center text-center gap-5">
            <h2 className="text-xl font-bold text-red-500">{heading}</h2>
            <p>{message}</p>
            <Cta element="link" to={pathname} className="px-4 py-1 rounded-md">Reload page</Cta>
            <Cta element="link" to="/user/overview" className="px-4 py-1 rounded-md">Back to User Home</Cta>
        </div>
    </Layout>
}