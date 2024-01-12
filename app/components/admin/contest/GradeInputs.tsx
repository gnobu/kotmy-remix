import cn from 'classnames'
import FormControl from '~/components/reusables/FormControl'
import { Grade } from '~/lib/types/contest.interface'

export default function GradeInputs({ grade }: { grade: [Grade, [number, number]] }) {
    const [grd, [min, max]] = grade
    return (
        <div className='flex gap-2'>
            <div className='flex flex-col'>
                <span className='block font-bold'>Grade</span>
                <span className={cn(`h-full w-[40px] px-2 py-1 flex items-center justify-center bg-grade-${grd} rounded-md text-white font-black`)}>
                    {grd}
                </span>
            </div>
            <FormControl as='input' id={`min_${grd}`} name={`min_${grd}`} labelText='Min. Score' type='number' min={0} defaultValue={min} />
            <FormControl as='input' id={`max_${grd}`} name={`max_${grd}`} labelText='Max. Score' type='number' min={0} defaultValue={max} />
        </div>
    )
}
