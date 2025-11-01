import { useReducer } from 'react'

import FormControl from "~/components/reusables/FormControl"
import Select from "~/components/reusables/Select"
import Svg from '~/components/reusables/Svg'
import { icons } from '~/assets/icons'
import { socials } from "~/lib/data/socials"
import { IStage } from '~/services/contest/types/contest.interface'

type StageAction = 'add' | 'remove' | 'edit_stage_number' | 'edit_stage_weight' | 'edit_sm_type'
function reducer(stages: Partial<IStage>[], action: { type: StageAction, stageNumber?: number, value?: unknown }) {
    if (action.type === 'add') {
        return [...stages, {
            stage: (stages.at(-1)?.stage ?? 0) + 1,
            weight: 0,
            rates: { social_media: { type: 'facebook', amount: 0 }, tally: 0, judge: 0, givaah: 0, }
        } as IStage]
    } else if (action.type === 'remove') {
        return stages.filter(stage => stage.stage !== action.stageNumber || stage._id !== action.value)
    } else if (action.type === 'edit_sm_type') {
        return stages.map(stage => {
            if (stage.stage === action.stageNumber) {
                return { ...stage, rates: { ...stage.rates!, social_media: { ...stage.rates!.social_media, type: action.value as typeof socials[number] } } }
            }
            return stage
        })
    } else if (action.type === 'edit_stage_number' && !stages.some(stage => stage.stage === action.value)) {
        return stages.map(stage => {
            if (stage.stage === action.stageNumber) { return { ...stage, stage: action.value as number } }
            return stage
        })
    } else if (action.type === 'edit_stage_weight') {
        return stages.map(stage => {
            if (stage.stage === action.stageNumber) { return { ...stage, weight: action.value as number } }
            return stage
        })
    }
    return stages
}

export default function StageInputs({ stages }: { stages?: Partial<IStage>[] }) {
    const [stagesState, dispatch] = useReducer(reducer, stages ?? [])
    return (
        <div>
            <span className='font-bold'>Stages <span className='font-normal'>(weights must sum up to 100%)</span></span>
            <div className="grid gap-4 border border-secondary p-3 rounded-lg">
                {stagesState.map((stage, index) => (
                    <div key={stage.stage} className="flex gap-4 items-end">
                        <fieldset className="grow grid gap-3 sm:gap-6 sm:grid-cols-3">
                            <FormControl as='input' type='number' labelText={`Stage`} id={`Stage_${index + 1}`} value={stage.stage} onChange={(e) => dispatch({ type: 'edit_stage_number', stageNumber: stage.stage, value: +e.target.value })} />
                            <FormControl as='input' type='number' labelText='Stage Weight (%)' id={`weight_${index + 1}`} name={`weight_${index + 1}`} value={stage?.weight ?? 0} min={0} onChange={(e) => dispatch({ type: 'edit_stage_weight', stageNumber: stage.stage, value: +e.target.value })} />
                            <Select label='Social Media' id={`social_media_${index + 1}`} name={`social_media_${index + 1}`} className="capitalize" value={stage?.rates?.social_media.type ?? ''} onChange={(e) => dispatch({ type: 'edit_sm_type', stageNumber: stage.stage, value: e.target.value })}>
                                {socials.map(social => (
                                    <option key={social} value={social}>{social}</option>
                                ))}
                            </Select>
                            {stage._id ? <input type="hidden" name={`stage_${index + 1}_id`} value={stage._id} /> : null}
                        </fieldset>
                        {stage._id
                            ? <button type='submit' className='m-4' title='delete stage' name='intent' value={stage._id}>
                                <Svg src={icons.closeIcon} width={'.9em'} className='hover:text-red-400' />
                            </button>
                            : <button type='button' className='m-4' value={stage._id} onClick={() => dispatch({ type: 'remove', stageNumber: stage.stage })}>
                                <Svg src={icons.closeIcon} width={'.9em'} className='hover:text-red-400' />
                            </button>}
                    </div>
                ))}
                <button type='button' onClick={() => dispatch({ type: 'add' })}
                    className='flex gap-2 place-self-start items-center whitespace-nowrap px-6 py-2 rounded-lg border border-secondary hover:border-slate-400'>
                    <Svg src={icons.addIcon} width={'.9em'} />
                    Add Stage
                </button>
            </div>
            <input type="hidden" name="no_of_stages" value={stagesState.length} />
        </div>
    )
}
