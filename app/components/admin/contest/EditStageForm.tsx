import { Form } from '@remix-run/react'
import Cta from '~/components/reusables/Cta'
import FormControl from '~/components/reusables/FormControl'
import GradeInputs from './GradeInputs'
import { Row } from '@tanstack/react-table'
import { ContestWStage, Grade, Stage } from '~/lib/types/contest.interface'
import { useState } from 'react'
import cn from 'classnames'

export default function EditStageForm({ row }: { row: Row<ContestWStage> }) {
  const [selectedStage, setSelectedStage] = useState<Stage | null>(row.original.stages[0] ?? null)
  return (
    <div className='p-6'>
      <div className="p-3 flex gap-2 border border-disabled bg-[#F6F8FA] rounded-md">
        {row.original.stages.length
          ? row.original.stages.map(stage => (
            <Cta key={stage.id} element='button' variant='outline' onClick={() => setSelectedStage(stage)}
              className={cn('px-5 py-1 text-xs text-admin-pry rounded-md', {
                'border-secondary bg-white': selectedStage?.stage === stage.stage,
                'border-transparent': selectedStage?.stage !== stage.stage
              })}
            >Stage {stage.stage}</Cta>
          ))
          : <span>There are no stages.</span>
        }
      </div>
      {row.original.stages.length
        ? <Form method='POST' className='text-primary text-xs flex flex-col gap-4'>
          <fieldset className="py-4 grid grid-cols-4 gap-3 border-b">
            <FormControl as='input' id='start_date' name='start_date' labelText='Stage Start Date' type='date' defaultValue={selectedStage?.start_date.split('T')[0]} />
            <FormControl as='input' id='end_date' name='end_date' labelText='Stage End Date' type='date' defaultValue={selectedStage?.end_date.split('T')[0]} />
            <FormControl as='input' id='weight' name='weight' labelText='Stage Weight (%)' type='number' min={0} defaultValue={selectedStage?.weight} />
            <FormControl as='input' id='success_count' name='success_count' labelText='Success Count' type='number' min={0} defaultValue={selectedStage?.success_count} />
          </fieldset>
          <fieldset className="pt-2 py-4 grid grid-cols-4 gap-3 border-b">
            <legend className='font-bold text-sm text-admin-pry'>Stage Rates <span className='font-normal'>(must sum up to 100%)</span></legend>
            <FormControl as='input' id='social_media_rate' name='social_media_rate' labelText='Social Media Rate (%)' type='number' min={0} defaultValue={selectedStage?.rates.social_media} />
            <FormControl as='input' id='tally_rate' name='tally_rate' labelText='Tally Rate (%)' type='number' min={0} defaultValue={selectedStage?.rates.tally} />
            <FormControl as='input' id='givaah_rate' name='givaah_rate' labelText='Givaah Rate (%)' type='number' min={0} defaultValue={selectedStage?.rates.givaah} />
            <FormControl as='input' id='judge_rate' name='judge_rate' labelText='Judge Rate (%)' type='number' min={0} defaultValue={selectedStage?.rates.judge} />
          </fieldset>
          <fieldset className="pt-2 py-4 grid grid-cols-2 gap-3 border-b">
            <legend className='font-bold text-sm text-admin-pry'>Grades</legend>
            {selectedStage && Object.entries(selectedStage.grade).map((grade) => (
              <GradeInputs key={grade[0]} grade={grade as [Grade, [number, number]]} />
            ))}
          </fieldset>

          <div className='flex justify-end gap-6'>
            <Cta element='button' type='button' variant='outline' onClick={row.getToggleExpandedHandler()}
              className='px-3 py-2 rounded-md font-bold min-w-[90px] border-secondary hover:border-slate-400 text-primary'>Close Form</Cta>
            <Cta element='button' type='submit' className='px-3 py-2 rounded-md font-bold min-w-[90px] text-white'>Submit</Cta>
          </div>
          <input type="hidden" name='contest_id' value={selectedStage?.contest_id} />
          <input type="hidden" name='id' value={selectedStage?.id} />
        </Form>
        : null
      }
    </div >
  )
}
