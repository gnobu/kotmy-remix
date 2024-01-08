import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { icons } from "~/assets/icons"
import Cta from "~/components/reusables/Cta"
import FormControl from "~/components/reusables/FormControl"
import Pagination from "~/components/reusables/Pagination"
import RoundCta from "~/components/reusables/RoundCta"
import Svg from "~/components/reusables/Svg"
import ToggleBtn from "~/components/reusables/ToggleBtn"

export function loader() {
    const tableData = [
        { 'id': 1, 'full name': 'Admin', 'email': 'admin@gmail.com', 'username': 'admin', 'role': 'Role 1', 'access': true, },
        { 'id': 2, 'full name': 'Nicole Clems', 'email': 'nicole@gmail.com', 'username': 'nicole', 'role': 'Role 2', 'access': false, },
        { 'id': 3, 'full name': 'Favour Wagor', 'email': 'favour@gmail.com', 'username': 'favour', 'role': 'Role 2', 'access': true, },
        { 'id': 4, 'full name': 'Oluchi Chinedu', 'email': 'chinedu@gmail.com', 'username': 'Oluchi', 'role': 'Role 3', 'access': false, },
        { 'id': 5, 'full name': 'Augustine Best', 'email': 'lilklara@gmail.com', 'username': 'lilklara', 'role': 'Role 3', 'access': true, },
        { 'id': 6, 'full name': 'Davidking Blossom', 'email': 'blossomdavid@gmail.com', 'username': 'davidking', 'role': 'Role 3', 'access': false, },
    ]
    const headings = ['full name', 'email', 'username', 'role', 'access'] satisfies (keyof typeof tableData[number])[]
    return json({ headings, tableData })
}

export default function Accounts() {
    const { headings, tableData } = useLoaderData<typeof loader>()
    return (
        <main className='w-full overflow-y-auto p-6'>
            <div className="flex justify-between items-center mb-16">
                <h1 className="text-2xl font-black text-primary">Admin Accounts</h1>
                <Cta element="link" to='add' className="flex gap-2 items-center rounded-lg px-3 py-2">
                    <Svg src={icons.addIcon} width={'.9em'} />
                    Add User
                </Cta>
            </div>
            <div className="flex justify-between items-center my-6">
                <p className="font-semibold">Registered Admin Users</p>
                <FormControl as="input" type="search" placeholder="Search user..." className="min-w-[280px]" />
            </div>
            <div className="w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="border-b border-secondary">
                            {headings.map(heading => (
                                <th className="text-left capitalize font-satoshi-black p-3" key={heading}>{heading}</th>
                            ))}
                            <th className="text-left capitalize font-satoshi-black p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((user, index) => (
                            <tr key={index} className="border-b border-secondary">
                                {headings.map(heading => {
                                    return heading === 'access'
                                        ? <td className="p-3" key={heading}>
                                            <span className="grid grid-cols-[76px_36px] items-center w-min">
                                                {user[heading] ? 'Enabled' : 'Disabled'}
                                                <ToggleBtn on={user[heading]} />
                                            </span>
                                        </td>
                                        : <td className="p-3" key={heading}>{user[heading]}</td>
                                })}
                                <td className="p-3">
                                    <div className="flex gap-4 items-center">
                                        <RoundCta icon={icons.editIcon} element="link" to={user.id} className="border-[#262626] bg-[#F7F7F8] text-primary" />
                                        <RoundCta icon={icons.trashIcon} className="border-red-500 bg-red-50 text-red-500" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center my-4">
                <label className="flex gap-2">Rows per page
                    <input type="number" name="rows" id="rows" className="w-10 pl-2 rounded-md border" defaultValue={10} />
                </label>
                <Pagination />
            </div>
        </main>
    )
}