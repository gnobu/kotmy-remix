import { useState } from 'react'
import { icons } from '~/assets/icons'
import FormControl from '~/components/reusables/FormControl'
import Svg from '~/components/reusables/Svg'

export default function CategoryInputs({ categories }: { categories?: string[] }) {
    const [newCategory, setNewCategory] = useState('')
    const [catogories, setCategories] = useState<string[]>(categories ?? [])
    function addCategory() {
        if (!newCategory || catogories.includes(newCategory)) return
        setCategories(prev => ([...prev, newCategory]))
        setNewCategory('')
    }
    function removeCategory(category: string) {
        setCategories(prev => prev.filter(cat => cat !== category))
    }
    return (
        <div>
            <span className='font-bold'>Categories</span>
            <fieldset className="grid gap-3 sm:gap-6 sm:grid-cols-3 border border-secondary p-3 rounded-lg">
                {catogories.map(category => (
                    <div key={category} className="p-3 rounded-lg border border-secondary flex items-center">
                        <input type="text" className="grow pointer-events-none bg-transparent" name='category' defaultValue={category} />
                        <button type='button'>
                            <Svg src={icons.closeIcon} width={'.9em'}
                                className='hover:text-red-400' onClick={() => removeCategory(category)} />
                        </button>
                    </div>
                ))}
                <div className="flex max-sm:flex-col gap-3 sm:gap-6 sm:items-end sm:col-span-3">
                    <FormControl as='input' placeholder='Enter new category' id='new_catogory' value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
                    <button type='button' onClick={addCategory}
                        className='flex gap-2 items-center whitespace-nowrap px-8 py-3 rounded-lg border border-secondary hover:border-slate-400'>
                        <Svg src={icons.addIcon} width={'.9em'} />
                        Add Category
                    </button>
                </div>
            </fieldset>
        </div>
    )
}
