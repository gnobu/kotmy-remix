import { Form } from '@remix-run/react'
import { useState } from 'react'
import { icons } from '~/assets/icons'
import { noImage } from '~/assets/images'
import Cta from '~/components/reusables/Cta'
import FormControl from '~/components/reusables/FormControl'
import Svg from '~/components/reusables/Svg'
import useFilePreview from '~/hooks/useFilePreview'
import { ITournament } from '~/services/tournament/types/tournament.interface'

export default function EditTournamentForm({ tournament }: { tournament: ITournament }) {
    const [fileList, setFileList] = useState<FileList | null>(null)
    const { filePreview, clearFilePreview, fileName } = useFilePreview(fileList)
    return (
        <Form className='max-w-xl mx-auto grid gap-6 sm:gap-12 text-sm' method='post' encType='multipart/form-data'>
            <h1 className='text-xl xs:text-2xl font-bold text-primary'>Edit Tournament</h1>
            <div className="grid gap-3 sm:gap-6">
                <div className="flex items-center gap-x-5">
                    {filePreview
                        ? <img className="w-20 h-20 rounded-lg object-cover" src={filePreview} alt="chosen image" />
                        : <img className="w-20 h-20 rounded-lg object-cover" src={tournament.image || noImage} alt="Tournament banner" />
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
                <FormControl as='input' labelText='Tournament Name' placeholder='Enter tournament name' id='name' name='name' defaultValue={tournament.name} required />
                <FormControl as='input' labelText='Tournament Unique ID' placeholder='Enter unique ID' id='uniqueId' name='uniqueId' defaultValue={tournament.id} required />
                <FormControl as='textarea' rows={3} labelText='Tournament Description' placeholder='Enter tournament description' id='description' name='description' defaultValue={tournament.description} required />
            </div>
            <div className='flex max-sm:flex-col justify-end gap-3 sm:gap-6'>
                <Cta element='button' onClick={clearFilePreview} type='reset' className='px-8 py-2 rounded-lg font-medium border-secondary active:border-accent sm:hover:border-accent' variant='outline'>Reset</Cta>
                <Cta element='button' type='submit' name='tournamentId' value={tournament._id} className='px-8 py-2 rounded-lg font-medium'>Edit Tournament</Cta>
            </div>
        </Form>
    )
}
