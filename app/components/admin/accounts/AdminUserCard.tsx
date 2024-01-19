import { icons } from '~/assets/icons'
import { adminAvatar } from '~/assets/images'
import RoundCta from '~/components/reusables/RoundCta'
import Svg from '~/components/reusables/Svg'
import ToggleBtn from '~/components/reusables/ToggleBtn'
import Toggletip from '~/components/reusables/ToggleTip'
import { AdminUser } from '~/lib/types/user.interface'

export default function AdminUserCard({ user }: { user: AdminUser }) {
    const mainComponent = <span className=''>
        <Svg src={icons.optionsIcon} />
    </span>
    return (
        <article className='border rounded-lg shadow-sm p-3 text-xs font-satoshi-medium'>
            <div className="flex gap-4 mb-3">
                <p><span>{user.role}</span> | <span>{user.username}</span></p>
                <Toggletip mainComponent={mainComponent} mainContainerClass='ml-auto'
                    childContainerClass="top-[110%] right-0 bg-tertiary p-3 border border-disabled text-xs flex gap-4"
                >
                    <RoundCta icon={icons.editIcon} element="link" to={user.id} className="border-[#262626] bg-[#F7F7F8] text-primary" />
                    <RoundCta icon={icons.trashIcon} className="border-red-500 bg-red-50 text-red-500" />
                </Toggletip>
            </div>
            <div className="flex gap-4 justify-between">
                <div className='flex gap-3 items-center'>
                    <img src={adminAvatar} alt="cartoon head" width={40} height={40} />
                    <span className="grid">
                        <span className='text-primary'>{user.full_name}</span>
                        <span>{user.email}</span>
                    </span>
                </div>
                <span className="flex gap-3 items-center">
                    {user.access ? 'Enabled' : 'Disabled'}
                    <ToggleBtn on={user.access} />
                </span>
            </div>
        </article>
    )
}