import { Form } from '@remix-run/react'
import { useState } from 'react'
import { icons } from '~/assets/icons'
import Cta from '~/components/reusables/Cta'
import FormControl from '~/components/reusables/FormControl'
import Svg from '~/components/reusables/Svg'
import useFilePreview from '~/hooks/useFilePreview'
import { Tournament } from '~/lib/types/contest.interface'

export default function EditTournamentForm({ tournament }: { tournament: Tournament }) {
    const [fileList, setFileList] = useState<FileList | null>(null)
    const { filePreview, clearFilePreview, fileName } = useFilePreview(fileList)
    return (
        <Form className='max-w-xl mx-auto grid gap-12' method='post'>
            <h1 className='text-2xl font-bold text-primary'>Edit New Tournament</h1>

            <div className="grid gap-6">
                <div className="flex items-center gap-x-5">
                    {filePreview
                        ? <img className="w-20 h-20 rounded-lg object-cover" src={filePreview} alt="chosen image" />
                        : tournament.image
                            ? <img className="w-20 h-20 rounded-lg object-cover" src={tournament.image} alt="Tournament banner" />
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
                <FormControl as='input' labelText='Tournament Name' placeholder='Enter tournament name' id='name' name='name' defaultValue={tournament.title} required />
                <FormControl as='input' labelText='Tournament Unique ID' placeholder='Enter unique ID' id='uniqueId' name='uniqueId' defaultValue={tournament.uniqueId} required />
                <FormControl as='textarea' rows={3} labelText='Tournament Description' placeholder='Enter tournament description' id='description' name='description' defaultValue={tournament.description} required />
            </div>

            <div className='flex justify-end gap-6'>
                <Cta element='button' onClick={clearFilePreview} type='reset' className='px-8 py-2 rounded-lg font-medium' variant='outline'>Reset</Cta>
                <Cta element='button' type='submit' className='px-8 py-2 rounded-lg font-medium'>Edit Tournament</Cta>
            </div>
        </Form>
    )
}
