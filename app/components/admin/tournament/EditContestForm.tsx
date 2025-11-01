import { Form } from '@remix-run/react'
import Cta from '~/components/reusables/Cta'
import FormControl from '~/components/reusables/FormControl'
import Select from '~/components/reusables/Select'
import CategoryInputs from './CategoryInputs'
import StageInputs from './StageInputs'
import { parseDateForInput } from '~/lib/dates.utils'
import { useState } from 'react'
import useFilePreview from '~/hooks/useFilePreview'
import Svg from '~/components/reusables/Svg'
import { icons } from '~/assets/icons'
import { ITournament } from '~/services/tournament/types/tournament.interface'
import { IContestWStage } from '~/services/contest/types/contest.interface'
import { noImage } from '~/assets/images'

export default function EditContestForm({ tournaments, contest }: { tournaments: Pick<ITournament, 'id'>[], contest: IContestWStage }) {
    const [fileList, setFileList] = useState<FileList | null>(null)
    const { filePreview, clearFilePreview, fileName } = useFilePreview(fileList)
    return (
        <Form className='max-w-[700px] mx-auto grid gap-6 sm:gap-12 text-sm' method='post' encType='multipart/form-data'>
            <h1 className='text-2xl font-bold text-primary'>Contest Details</h1>
            <div className="flex items-center gap-x-5">
                {filePreview
                    ? <img className="w-20 h-20 rounded-lg object-cover" src={filePreview} alt="chosen image" />
                    : <img className="w-20 h-20 rounded-lg object-cover" src={contest.image || noImage} alt="Contest banner" />
                }
                <div className="flex flex-col items-start gap-2 max-xs:text-xs">
                    <label htmlFor='image' className="border-2 border-secondary text-primary cursor-pointer font-semibold py-2 px-4 rounded-lg">
                        Change Photo
                        <input id="image" name='image' type="file" onChange={(e) => { setFileList(e.currentTarget.files) }} className="hidden" />
                    </label>
                    <span className='flex items-center gap-3'>
                        <span>{fileName || 'PNG, JPG (max. 1440x900px)'}</span>
                        {fileName
                            ? <Svg src={icons.closeIcon} onClick={clearFilePreview} className='text-red-600 cursor-pointer' />
                            : null
                        }
                    </span>
                </div>
            </div>
            <fieldset className="grid gap-3 sm:gap-6 sm:grid-cols-2">
                <Select name="tournament" id="tournament" label='Tournament' className="uppercase" defaultValue={contest.tournament_unique_id} required>
                    <option value=''>Select a tournament</option>
                    {tournaments.map(tournament => (
                        <option key={tournament.id} value={tournament.id}>{tournament.id}</option>
                    ))}
                </Select>
                <FormControl as='input' labelText='Contest Name' placeholder='Enter contest name' id='name' name='name' defaultValue={contest.name} required />
                <FormControl as='textarea' rows={3} labelClassNames='sm:col-span-2' labelText='Contest Description' placeholder='Enter contest description' id='description' name='description' defaultValue={contest.desc} required />
                <FormControl as='input' labelText='Unique Contest ID' placeholder='Enter unique ID' id='uniqueId' name='uniqueId' defaultValue={contest.id} required />
                <FormControl as='input' type='date' labelText='Registration Deadline' id='reg_deadline' name='reg_deadline' defaultValue={parseDateForInput(contest.reg_deadline)} required />
                <FormControl as='input' type='date' labelText='Contest Start Date' id='start_date' name='start_date' defaultValue={parseDateForInput(contest.start_date)} required />
                <FormControl as='input' type='date' labelText='Contest End Date' id='end_date' name='end_date' defaultValue={parseDateForInput(contest.end_date)} required />
                <FormControl as='textarea' rows={2} labelText='Contest Prizes' labelClassNames='sm:col-span-2' placeholder='Enter contest prizes' id='prizes' name='prizes' defaultValue={contest.prizes} required />
            </fieldset>

            <CategoryInputs categories={Object.values(contest.categories)} />
            <StageInputs key={contest.stages.length} stages={contest.stages} />

            <fieldset className="grid gap-6">
                <legend className='text-lg mb-4 font-bold'>Submission Guidelines</legend>
                <FormControl as='textarea' rows={4} labelText='Submission Requirements' placeholder='Enter text here...' id='sub_req' name='sub_req' defaultValue={contest.sub_req} required />
                <FormControl as='textarea' rows={4} labelText='Terms & Conditions' placeholder='Enter text here...' id='tnc' name='tnc' defaultValue={contest.terms_cond} required />
                <FormControl as='textarea' rows={4} labelText='Additional Information' placeholder='Enter text here...' id='add_info' name='add_info' defaultValue={contest.add_info} required />
            </fieldset>

            <div className='flex max-sm:flex-col justify-end gap-3 sm:gap-6'>
                <Cta element='button' type='reset' onClick={clearFilePreview} className='px-8 py-2 rounded-lg font-medium border-secondary hover:border-slate-400 text-primary' variant='outline'>Reset Form</Cta>
                <Cta element='button' type='submit' name='contestId' value={contest._id} className='px-8 py-2 rounded-lg font-medium'>Edit Contest</Cta>
            </div>
        </Form>
    )
}
