import { Form } from '@remix-run/react'
import Cta from '~/components/reusables/Cta'
import FormControl from '~/components/reusables/FormControl'
import Select from '~/components/reusables/Select'
import CategoryInputs from './CategoryInputs'
import StageInputs from './StageInputs'
import { ContestWStage, Tournament } from '~/lib/types/contest.interface'
import { parseDateForInput } from '~/lib/dates.utils'
import { useState } from 'react'
import useFilePreview from '~/hooks/useFilePreview'
import Svg from '~/components/reusables/Svg'
import { icons } from '~/assets/icons'

export default function EditContestForm({ tournaments, contest }: { tournaments: Pick<Tournament, 'uniqueId'>[], contest: ContestWStage }) {
    const [fileList, setFileList] = useState<FileList | null>(null)
    const { filePreview, clearFilePreview, fileName } = useFilePreview(fileList)
    return (
        <Form className='max-w-[700px] mx-auto grid gap-12 text-sm' method='post'>
            <h1 className='text-2xl font-bold text-primary'>Contest Details</h1>
            <div className="flex items-center gap-x-5">
                {filePreview
                    ? <img className="w-20 h-20 rounded-lg object-cover" src={filePreview} alt="chosen image" />
                    : contest.image
                        ? <img className="w-20 h-20 rounded-lg object-cover" src={contest.image} alt="Contest banner" />
                        : <div className="w-20 h-20 rounded-lg bg-slate-400"></div>
                }
                <label htmlFor='image' className="border-2 border-secondary text-primary cursor-pointer font-semibold py-2 px-4 rounded-lg">
                    Change Photo
                    <input id="image" name='image' type="file" onChange={(e) => { setFileList(e.currentTarget.files) }} className="hidden" />
                </label>
                {filePreview
                    ? <>
                        <span>{fileName}</span>
                        <Svg src={icons.closeIcon} onClick={clearFilePreview} className='text-red-600' />
                    </>
                    : null
                }
            </div>
            <fieldset className="grid gap-6 grid-cols-2">
                <Select name="tournament" id="tournament" label='Tournament' className="uppercase" defaultValue={contest.unique_tournament_id} required>
                    <option value=''>Select a tournament</option>
                    {tournaments.map(tournament => (
                        <option key={tournament.uniqueId} value={tournament.uniqueId}>{tournament.uniqueId}</option>
                    ))}
                </Select>
                <FormControl as='input' labelText='Contest Name' placeholder='Enter contest name' id='name' name='name' defaultValue={contest.title} required />
                <FormControl as='textarea' rows={3} labelClassNames='col-span-2' labelText='Contest Description' placeholder='Enter contest description' id='description' name='description' defaultValue={contest.description} required />
                <FormControl as='input' labelText='Unique Contest ID' placeholder='Enter unique ID' id='uniqueId' name='uniqueId' defaultValue={contest.contestId} required />
                <FormControl as='input' type='number' labelText='Number of Stages' id='no_stages' name='no_stages' defaultValue={contest.stages.length} min={1} required />
                <FormControl as='input' type='date' labelText='Contest Start Date' id='start_date' name='start_date' defaultValue={parseDateForInput(contest.start_date)} required />
                <FormControl as='input' type='date' labelText='Contest End Date' id='end_date' name='end_date' defaultValue={parseDateForInput(contest.end_date)} required />
                <FormControl as='input' type='date' labelText='Registration Deadline' id='reg_deadline' name='reg_deadline' defaultValue={parseDateForInput(contest.reg_deadline)} required />
                <FormControl as='textarea' rows={2} labelText='Contest Prizes' placeholder='Enter contest prizes' id='prizes' name='prizes' defaultValue={contest.prizes} required />
            </fieldset>

            <CategoryInputs categories={Object.values(contest.categories)} />
            <StageInputs stages={contest.stages} />

            <fieldset className="grid gap-6">
                <legend className='text-lg mb-4 font-bold'>Submission Guidelines</legend>
                <FormControl as='textarea' rows={4} labelText='Submission Requirements' placeholder='Enter text here...' id='sub_req' name='sub_req' defaultValue={contest.sub_req} required />
                <FormControl as='textarea' rows={4} labelText='Terms & Conditions' placeholder='Enter text here...' id='tnc' name='tnc' defaultValue={contest.terms_cond} required />
                <FormControl as='textarea' rows={4} labelText='Additional Information' placeholder='Enter text here...' id='add_info' name='add_info' defaultValue={contest.add_info} required />
            </fieldset>

            <div className='flex justify-end gap-6'>
                <Cta element='button' type='reset' onClick={clearFilePreview} className='px-8 py-2 rounded-lg font-medium border-secondary hover:border-slate-400 text-primary' variant='outline'>Reset Form</Cta>
                <Cta element='button' type='submit' className='px-8 py-2 rounded-lg font-medium'>Edit Contest</Cta>
            </div>
        </Form>
    )
}
