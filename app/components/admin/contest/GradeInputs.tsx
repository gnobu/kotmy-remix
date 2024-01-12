import cn from 'classnames'
import FormControl from '~/components/reusables/FormControl'

export default function GradeInputs({ grade }: { grade: string }) {
    return (
        <div className='flex gap-2'>
            <div className='flex flex-col'>
                <span className='block font-bold'>Grade</span>
                <span className={cn(`h-full w-[40px] px-2 py-1 flex items-center justify-center bg-grade-${grade} rounded-md text-white font-black`)}>
                    {grade}
                </span>
            </div>
            <FormControl as='input' id='minScore' name='minScore' labelText='Min. Score' type='number' min={0} />
            <FormControl as='input' id='maxScore' name='maxScore' labelText='Max. Score' type='number' min={0} />
        </div>
    )
}
