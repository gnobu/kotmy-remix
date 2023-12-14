import { icons } from '~/assets/icons'
import { birthdayPresent, hero1, hero2, hero3, hero4, hero5, sponsorLogo, underline } from '~/assets/images'
import ContactForm from '~/components/public/ContactForm'
import Footer from '~/components/public/Footer'
import Button from '~/components/reusables/Button'
import Svg from '~/components/reusables/Svg'

export default function LandingPage() {
    return (
        <main>
            <section className='wrapper flex flex-col md:flex-row gap-16 xl:gap-24 md:items-center py-8 md:py-16'>
                <div className='flex flex-col gap-6 sm:gap-8'>
                    <h1 className='font-black text-4xl sm:text-5xl xl:text-[64px] leading-tight sm:leading-snug whitespace-nowrap'>
                        Capturing Moments
                        <br />
                        Creating <span className='text-accent'>Memories.</span>
                    </h1>
                    <p className='text-xl'>Join our monthly/yearly photo contests open to kids, both male and female aged 0-14 years and discover a world of imagination and inspiration.</p>
                    <div className='flex gap-4 flex-wrap'>
                        <Button element='button'>Join Now</Button>
                        <Button element='button' variant='outline'>Explore Contests</Button>
                    </div>
                </div>
                <div className='grid grid-cols-3 gap-8 xl:gap-9 w-full'>
                    <div className='flex flex-col gap-8 xl:gap-9'>
                        <div className='aspect-3/7 overflow-hidden rounded-full outline-dashed outline-offset-4'>
                            <img className='object-cover object-center h-full w-full' src={hero1} alt="kid smiling" />
                        </div>
                        <div className='aspect-3/4 grow overflow-hidden rounded-full outline-dashed outline-offset-4'>
                            <img className='object-cover object-center h-full w-full' src={hero2} alt="kid smiling" />
                        </div>
                    </div>
                    <div className='flex flex-col gap-8 xl:gap-9 justify-center'>
                        <div className='aspect-square overflow-hidden rounded-full outline-dashed outline-offset-4'>
                            <img className='object-cover object-center h-full w-full' src={hero3} alt="kid smiling" />
                        </div>
                        <div className='aspect-3/7 overflow-hidden rounded-full outline-dashed outline-offset-4'>
                            <img className='object-cover object-center h-full w-full' src={hero4} alt="kid smiling" />
                        </div>
                    </div>
                    <div className='flex flex-col justify-center'>
                        <div className='aspect-3/7 overflow-hidden rounded-full outline-dashed outline-offset-4'>
                            <img className='object-cover object-center h-full w-full' src={hero5} alt="kid smiling" />
                        </div>
                    </div>
                </div>
            </section>

            <section className='wrapper py-8 md:py-16'>
                <h2 className='font-bold text-xl mb-4'>Who supports us</h2>
                <div className="flex gap-4 overflow-x-hidden">
                    <img src={sponsorLogo} alt="Zendesk" />
                    <img src={sponsorLogo} alt="Zendesk" />
                    <img src={sponsorLogo} alt="Zendesk" />
                    <img src={sponsorLogo} alt="Zendesk" />
                    <img src={sponsorLogo} alt="Zendesk" />
                    <img src={sponsorLogo} alt="Zendesk" />
                    <img src={sponsorLogo} alt="Zendesk" />
                </div>
            </section>

            <section className='py-8 md:py-16'>
                <div className='sm:wrapper bg-secondary md:px-24 py-16 md:py-28 flex flex-col md:flex-row justify-between items-center gap-16 sm:rounded-3xl'>
                    <div className="wrapper">
                        <div className="mb-8">
                            <p className='font-black text-xl'>Our Vision</p>
                            <img className="object-cover object-center" src={underline} alt="underline" width={100} />
                        </div>
                        <h2 className='text-2xl sm:text-3xl font-black mb-6 leading-snug'>
                            Crafting <span className="text-accent">Unforgettable</span> Moments for Every Child's Special Day.
                        </h2>
                        <p className='font-medium'>To create uniquely memorable and exciting kid's birthdays, we strive to be entertaining, transparent, innovative, creative, exciting, efficient, and reliable in every aspect of our service.</p>
                    </div>
                    <div className="wrapper">
                        <img className="object-cover object-center w-full" src={birthdayPresent} alt="wrapped gift" />
                    </div>
                </div>
            </section>

            <section className='py-8 md:py-16'>
                <div className='sm:wrapper bg-accent text-secondary md:px-24 py-16 md:py-28 flex flex-col md:flex-row justify-between items-center gap-16 sm:rounded-3xl'>
                    <div className="wrapper">
                        <h2 className='text-2xl sm:text-[40px] font-satoshi-black mb-6 leading-snug'>
                            Refer A Friend And Earn Rewards
                        </h2>
                        <p className='font-satoshi-medium mb-8'>Lorem ipsum dolor sit amet consectetur.
                            Velit egestas auctor in amet dis sed sit egestas.
                            Viverra morbi eget consectetur accumsan integer.
                            Mi et etiam amet est egestas tellus quis.
                        </p>
                        <span className='inline-block bg-[#E7E7E7] text-primary py-4 px-8 text-lg rounded-md font-black whitespace-nowrap'>COMING SOON</span>
                    </div>
                    <div className="wrapper bg-[#E7E7E7] rounded-3xl w-full aspect-square">
                    </div>
                </div>
            </section>

            <section className='py-8 md:py-16'>
                <div className='sm:wrapper bg-secondary md:px-24 py-16 md:py-28 flex flex-col md:flex-row justify-between gap-16 sm:rounded-3xl'>
                    <div className="wrapper flex flex-col gap-12">
                        <h2 className='text-2xl sm:text-[40px] font-satoshi-black leading-tight'>
                            Do you want to know more about the way we work?
                        </h2>
                        <div className="flex flex-col lg:flex-row gap-6">
                            <p>
                                <span className='block font-satoshi-black mb-3'>Phone Us</span>
                                <span className='font-satoshi-medium'>+234 703 515 9093</span>
                            </p>
                            <p>
                                <span className='block font-satoshi-black mb-3'>Email Us</span>
                                <span className='font-satoshi-medium'>kidmonthyear@gmail.com</span>
                            </p>
                        </div>
                        <div>
                            <span className='block font-satoshi-black mb-3'>Follow Us</span>
                            <span className='flex gap-4'>
                                <Svg src={icons.twitterXIcon} width={'24px'} height={'24px'} />
                                <Svg src={icons.instagramIcon} width={'24px'} height={'24px'} />
                                <Svg src={icons.facebookIcon} width={'24px'} height={'24px'} />
                                <Svg src={icons.youtubeIcon} width={'24px'} height={'24px'} />
                            </span>
                        </div>
                    </div>
                    <ContactForm />
                </div>
            </section>
            <Footer />
        </main>
    )
}
