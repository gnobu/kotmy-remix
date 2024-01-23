import type { MetaFunction } from "@remix-run/node"
import { Outlet } from "@remix-run/react"
import { useEffect, useState } from "react"
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
    useEffect(() => {
        setShowNav(window.innerWidth >= 640)
    }, [])
    return (<div className="bg-tertiary text-admin-pry">
        <PrimaryHeader toggleNav={() => { setShowNav(prev => !prev) }} />
        <MobileHeader toggleNav={() => { setShowNav(prev => !prev) }} />
        <AdminMobileNavigation onClose={() => { setShowNav(false) }} show={showNav} />
        <div className="sm:flex sm:h-[calc(100vh-85px)]">
            <AdminNavigation show={showNav} />
            <Outlet />
        </div>
    </div>)
}
