import type { MetaFunction } from "@remix-run/node"
import { Outlet, useLocation } from "@remix-run/react"
import { useEffect, useState } from "react"
import AdminMobileNavigation from "~/components/admin/AdminMobileNavigation"
import MobileHeader from "~/components/admin/MobileHeader"
import AdminNavigation from "~/components/admin/AdminNav"
import PrimaryHeader from "~/components/admin/PrimaryHeader"
import Cta from "~/components/reusables/Cta"

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
        <PrimaryHeader toggleNav={() => { setShowNav(prev => !prev) }} />
        <MobileHeader toggleNav={() => { setShowNav(prev => !prev) }} />
        <AdminMobileNavigation onClose={() => { setShowNav(false) }} show={showNav} />
        <div className="sm:flex sm:h-[calc(100vh-85px)]">
            <AdminNavigation show={showNav} />
            {children}
        </div>
    </div>)
}

export default function AdminLayout() {
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
            <Cta element="link" to="/admin/overview" className="px-4 py-1 rounded-md">Back to Admin Home</Cta>
        </div>
    </Layout>
}