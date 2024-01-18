import type { MetaFunction } from "@remix-run/node"
import { Outlet } from "@remix-run/react"
import { useLayoutEffect, useState } from "react"
import AdminMobileNavigation from "~/components/admin/AdminMobileNavigation"
import MobileHeader from "~/components/admin/MobileHeader"
import AdminNavigation from "~/components/admin/AdminNav"
import PrimaryHeader from "~/components/admin/PrimaryHeader"

export const meta: MetaFunction = () => {
    return [
        { title: "KOTMY | Admin" },
        { name: "description", content: "KOTMY Admin application" },
    ]
}

export default function AdminLayout() {
    const [showNav, setShowNav] = useState(false)
    // useLayoutEffect(() => {
    //     function handleWindowSize() { setShowNav(window.innerWidth >= 640) }
    //     handleWindowSize()
    //     window.addEventListener('resize', handleWindowSize)
    //     return () => { window.removeEventListener('resize', handleWindowSize) }
    // }, [])
    return (<>
        {/* MOBILE */}
        <div className="sm:hidden bg-tertiary text-admin-pry">
            <MobileHeader toggleNav={() => { setShowNav(prev => !prev) }} />
            <AdminMobileNavigation onClose={() => { setShowNav(false) }} show={showNav} />
            <Outlet />
        </div>
        {/* TAB/DESKTOP */}
        <div className="hidden sm:block bg-tertiary text-admin-pry">
            <PrimaryHeader toggleNav={() => { setShowNav(prev => !prev) }} />
            <div className="flex h-[calc(100vh-82.5px)]">
                <AdminNavigation show={showNav} />
                <Outlet />
            </div>
        </div>
    </>)
}
