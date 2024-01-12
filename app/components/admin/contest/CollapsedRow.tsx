import { Form } from '@remix-run/react'
import Cta from '~/components/reusables/Cta'
import FormControl from '~/components/reusables/FormControl'
import GradeInputs from './GradeInputs'
import { Row } from '@tanstack/react-table'
import { Contest } from '~/lib/types/contest.interface'

export default function CollapsedRow({ row }: { row: Row<Contest> }) {
  return (
    <div className='p-6'>
      <div className="p-3 flex gap-2 border border-disabled bg-[#F6F8FA] rounded-md">
        <Cta element='button' variant='outline' className='px-5 py-1 text-xs text-admin-pry rounded-md border-secondary bg-white'>Stage 1</Cta>
        <Cta element='button' variant='outline' className='px-5 py-1 text-xs text-admin-pry rounded-md border-transparent'>Stage 2</Cta>
        <Cta element='button' variant='outline' className='px-5 py-1 text-xs text-admin-pry rounded-md border-transparent'>Stage 3</Cta>
      </div>
      <Form className='text-primary text-xs flex flex-col gap-4'>
        <fieldset className="py-4 grid grid-cols-4 gap-3 border-b">
          <FormControl as='input' id='startDate' name='startDate' labelText='Stage Start Date' type='date' />
          <FormControl as='input' id='endDate' name='endDate' labelText='Stage End Date' type='date' />
          <FormControl as='input' id='stageWeight' name='stageWeight' labelText='Stage Weight (%)' type='number' min={0} />
          <FormControl as='input' id='successCount' name='successCount' labelText='Success Count' type='number' min={0} />
        </fieldset>
        <fieldset className="pt-2 py-4 grid grid-cols-4 gap-3 border-b">
          <legend className='font-bold text-sm text-admin-pry'>Stage Rates <span className='font-normal'>(must sum up to 100%)</span></legend>
          <FormControl as='input' id='socialMediaRate' name='socialMediaRate' labelText='Social Media Rate (%)' type='number' min={0} />
          <FormControl as='input' id='tallyRate' name='tallyRate' labelText='Tally Rate (%)' type='number' min={0} />
          <FormControl as='input' id='givaahRate' name='givaahRate' labelText='Givaah Rate (%)' type='number' min={0} />
          <FormControl as='input' id='judgeRate' name='judgeRate' labelText='Judge Rate (%)' type='number' min={0} />
        </fieldset>
        <fieldset className="pt-2 py-4 grid grid-cols-2 gap-3 border-b">
          <legend className='font-bold text-sm text-admin-pry'>Grades</legend>
          {['A', 'B', 'C', 'D', 'E', 'F'].map(grade => (<GradeInputs key={grade} grade={grade} />))}
        </fieldset>

        <div className='flex justify-end gap-6'>
          <Cta element='button' type='button' className='px-3 py-2 rounded-md font-bold min-w-[90px] border-secondary hover:border-slate-400 text-primary' variant='outline'>Close Form</Cta>
          <Cta element='button' type='submit' className='px-3 py-2 rounded-md font-bold min-w-[90px] text-white'>Submit</Cta>
        </div>
      </Form>
    </div>
  )
}
