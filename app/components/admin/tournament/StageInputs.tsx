import FormControl from "~/components/reusables/FormControl"
import Select from "~/components/reusables/Select"
import { socials } from "~/lib/data/socials"
import { Stage } from "~/lib/types/contest.interface"

export default function StageInputs({ stages }: { stages: Stage[] }) {
    return (
        <div>
            <span className='font-bold'>Stages <span className='font-normal'>(weights must sum up to 100%)</span></span>
            <div className="grid gap-6 border border-secondary p-3 rounded-lg">
                {stages.map((stage, index) => (
                    <fieldset key={index} className="grid gap-3 sm:gap-6 sm:grid-cols-3">
                        <FormControl as='input' type='number' labelText={`Stage`} id={`Stage_${index + 1}`} defaultValue={index + 1} disabled />
                        <FormControl as='input' type='number' labelText='Stage Weight (%)' id={`weight_${index + 1}`} name={`weight_${index + 1}`} defaultValue={stage?.weight ?? 0} min={0} />
                        <Select label='Social Media' id={`social_media_${index + 1}`} name={`social_media_${index + 1}`} className="capitalize" defaultValue={stage?.rates.social_media.type ?? ''}>
                            {socials.map(social => (
                                <option key={social} value={social}>{social}</option>
                            ))}
                        </Select>
                    </fieldset>
                ))}
            </div>
        </div>
    )
}
