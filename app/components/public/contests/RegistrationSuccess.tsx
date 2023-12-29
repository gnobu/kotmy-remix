import { hero5 } from "~/assets/images"
import { icons } from "~/assets/icons"

export default function RegistrationSuccess() {
    return (
        <div className='bg-secondary p-10 sm:rounded-3xl flex flex-col max-w-xl gap-10'>
            <aside className="border-2 border-success-700 bg-success-500 rounded-xl p-6 flex items-start gap-4">
                <img src={icons.alertCheckIcon} width={30} height={30} className="mt-1" />
                <p>
                    <span className="block font-bold mb-2">Dear Esteemed Contestant/Guardian</span>
                    <span className="font-medium">Congratulations, Jane Doe! Your submission to the Kid of December photo 2023 contest has been received successfully!</span>
                </p>
            </aside>
            <div className="grid grid-cols-2 justify-between gap-6 sm:gap-10">
                <img src={hero5} alt="kid smiling" className="rounded-3xl" />
                <div className="grid">
                    <p className="">
                        <span className="block font-satoshi-bold mb-1">Full Name</span>
                        <span className="block">Jane Doe</span>
                    </p>
                    <p className="">
                        <span className="block font-satoshi-bold mb-1">Date of Birth</span>
                        <span className="block">10/12/2019</span>
                    </p>
                    <p className="">
                        <span className="block font-satoshi-bold mb-1">Gender</span>
                        <span className="block">Female</span>
                    </p>
                    <p className="">
                        <span className="block font-satoshi-bold mb-1">Email Address</span>
                        <span className="block">janedoe@mail.com</span>
                    </p>
                    <p className="">
                        <span className="block font-satoshi-bold mb-1">State of Residence</span>
                        <span className="block">Lagos State</span>
                    </p>
                </div>
            </div>
        </div>
    )
}
