import { useState } from 'react'
import { Form, Link } from '@remix-run/react'
import cn from 'classnames'
import { Row } from '@tanstack/react-table'

import Cta from '~/components/reusables/Cta'
import FormControl from '~/components/reusables/FormControl'
import GradeInputs from './GradeInputs'
import { parseDateForInput } from '~/lib/dates.utils'
import { IContestWStage, Grade, IStage } from '~/services/contest/types/contest.interface'

export default function Stages({ row }: { row: Row<IContestWStage> }) {
  const [selectedStage, setSelectedStage] = useState<IStage | null>(row.original.stages[0] ?? null)
  return (
    <div className='p-6'>
      <div className="p-3 flex gap-2 border border-disabled bg-[#F6F8FA] rounded-md">
        {row.original.stages.length
          ? row.original.stages.map(stage => (
            <Cta key={stage._id} element='button' variant='outline' onClick={() => setSelectedStage(stage)}
              className={cn('px-5 py-1 text-xs text-admin-pry rounded-md', {
                'border-secondary bg-white': selectedStage?.stage === stage.stage,
                'border-transparent': selectedStage?.stage !== stage.stage
              })}
            >Stage {stage.stage}</Cta>
          ))
          : <span>There are no stages.</span>
        }
      </div>
      {selectedStage
        ? <EditStageForm key={selectedStage._id} stage={selectedStage} contestId={row.original.id} closeForm={row.getToggleExpandedHandler()} />
        : null
      }
    </div >
  )
}


function EditStageForm({ stage, contestId, closeForm }: { stage: IStage, contestId: string, closeForm: () => void }) {
  return (
    <Form method='POST' className='text-primary text-xs flex flex-col gap-4'>
      <fieldset className="py-4 grid grid-cols-4 gap-3 border-b">
        <FormControl as='input' id='start_date' name='start_date' labelText='Stage Start Date' type='date' defaultValue={parseDateForInput(stage.start_date)} />
        <FormControl as='input' id='end_date' name='end_date' labelText='Stage End Date' type='date' defaultValue={parseDateForInput(stage.end_date)} />
        <FormControl as='input' id='weight' name='weight' labelText='Stage Weight (%)' type='number' min={0} defaultValue={stage.weight} />
        <FormControl as='input' id='success_count' name='success_count' labelText='Success Count' type='number' min={0} defaultValue={stage.success_count} />
      </fieldset>
      <fieldset className="pt-2 pb-4 grid grid-cols-4 gap-3 border-b">
        <legend className='font-bold text-sm text-admin-pry w-max'>Stage Rates <span className='font-normal'>(must sum up to 100%)</span></legend>
        <FormControl as='input' id='social_media_rate' name='social_media_rate' labelText='Social Media Rate (%)' type='number' min={0} defaultValue={stage.rates.social_media.amount} />
        <FormControl as='input' id='tally_rate' name='tally_rate' labelText='Tally Rate (%)' type='number' min={0} defaultValue={stage.rates.tally} />
        <FormControl as='input' id='givaah_rate' name='givaah_rate' labelText='Givaah Rate (%)' type='number' min={0} defaultValue={stage.rates.givaah} />
        <FormControl as='input' id='judge_rate' name='judge_rate' labelText='Judge Rate (%)' type='number' min={0} defaultValue={stage.rates.judge} />
      </fieldset>
      <fieldset className="pt-2 py-4 grid grid-cols-2 gap-3 border-b">
        <legend className='font-bold text-sm text-admin-pry'>Grades</legend>
        {Object.entries(stage.grade).map((grade) => (
          <GradeInputs key={grade[0]} grade={grade as [Grade, [number, number]]} />
        ))}
      </fieldset>

      <div className='flex justify-between items-center gap-6'>
        <Link to={`${contestId}/${stage._id}`} className='text-accent hover:text-accent/80 font-semibold'>View contestants</Link>
        <div className='flex justify-end gap-6'>
          <Cta element='button' type='button' variant='outline' onClick={closeForm}
            className='px-3 py-2 rounded-md font-bold min-w-[90px] border-secondary hover:border-slate-400 text-primary'>Close Form</Cta>
          <Cta element='button' type='submit' name='intent' value='update_stage' className='px-3 py-2 rounded-md font-bold min-w-[90px] text-white'>Submit</Cta>
        </div>
      </div>
      <input type="hidden" name='social_media_type' value={stage.rates.social_media.type} />
      <input type="hidden" name='stageId' value={stage._id} />
    </Form>
  )
}