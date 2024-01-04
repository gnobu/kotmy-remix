import type { MetaFunction } from "@remix-run/node"
import { Outlet } from "@remix-run/react"
import { useState } from "react"
import AdminNavigation from "~/components/admin/AdminNav"
import PrimaryHeader from "~/components/admin/PrimaryHeader"

export const meta: MetaFunction = () => {
    return [
        { title: "KOTMY | Admin" },
        { name: "description", content: "KOTMY Admin application" },
    ]
}

export default function AdminLayout() {
    const [showNav, setShowNav] = useState(true)
    return (
        <div className="h-screen overflow-hidden bg-tertiary flex flex-col text-admin-pry">
            <PrimaryHeader toggleNav={() => { setShowNav(prev => !prev) }} />
            <div className="flex h-full">
                <AdminNavigation show={showNav} />
                <Outlet />
            </div>
        </div>
    )
}
