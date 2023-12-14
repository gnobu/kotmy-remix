import Svg from '~/components/reusables/Svg'

export default function WhyCard(props: { title: string; subtext: string; icon: string; backgroundColor: string; }) {
    return (
        <article className={`block p-8 text-white rounded-3xl ${props.backgroundColor}`}>
            <div className="p-6 mb-8 rounded-3xl bg-[#FFFFFF29] w-fit">
                <Svg src={props.icon} width={24} height={24} />
            </div>
            <h3 className='mb-4 text-2xl font-black'>{props.title}</h3>
            <p className='font-bold'>{props.subtext}</p>
        </article>
    )
}
