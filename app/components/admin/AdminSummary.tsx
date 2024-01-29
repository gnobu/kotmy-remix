import { AdminUser } from "~/lib/types/user.interface"
import Cta from "../reusables/Cta"
import AdminUserCard from "./accounts/AdminUserCard"

export default function AdminSummary({ users }: { users: AdminUser[] }) {
    return (
        <div className="border rounded-xl overflow-hidden basis-3/5 max-w-xl">
            <div className="flex gap-2 xs:gap-4 justify-between items-center py-3 px-4 border-b">
                <h3 className="text-primary font-bold max-sm:text-xs">Admin Accounts</h3>
                <Cta element="link" to={'/admin/accounts'} variant="outline"
                    className="border-disabled rounded-lg text-inherit py-1.5 px-3 text-xs font-medium">
                    See All Users
                </Cta>
            </div>
            <div className="px-4 grid">
                {users.slice(0, 5).map(user => (
                    <AdminUserCard key={user.id} user={user} className="border-0 shadow-none rounded-none border-b last:border-b-0" />
                ))}
            </div>
        </div>
    )
}
