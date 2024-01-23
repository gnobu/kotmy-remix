import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../reusables/select-shad"
import { cn } from "~/lib/utils"
import DoughnutChart from "../reusables/Doughnut"
import { ChartData } from "chart.js"
import { numberFormatter } from "~/lib/numbers.utils"

type Props = {
    data: Record<string, Record<string, number>>
}
const numberFormatterOptions = { style: 'currency', currency: 'NGN', currencyDisplay: 'code' }
export default function TransactionSummary({ data }: Props) {
    const years = Object.keys(data).reverse()
    const [selectedYear, setSelectedYear] = useState(years[0])
    const yearData = data[selectedYear]
    const colors = ['#6246EA', '#817EFB', '#A3A8FE']
    const doughnutData: ChartData<"doughnut", number[], unknown> = {
        datasets: [{
            label: 'Income',
            data: Object.values(yearData),
            backgroundColor: colors,
            hoverOffset: 10
        }]
    }
    return (
        <div className="border rounded-xl overflow-hidden basis-1/3 grow max-w-xl" >
            <div className="flex gap-2 xs:gap-4 justify-between items-center py-3 px-4 border-b">
                <h3 className="text-primary font-bold max-sm:text-xs">Transactions</h3>
                <Select onValueChange={(year) => setSelectedYear(year)}>
                    <SelectTrigger className="w-max">
                        <SelectValue placeholder={years[0]} defaultValue={years[0]} />
                    </SelectTrigger>
                    <SelectContent>
                        {years.map(year => (<SelectItem key={year} value={year}>{year}</SelectItem>))}
                    </SelectContent>
                </Select>
            </div>
            <div className="p-4 grid max-sm:text-sm">
                <DoughnutChart data={doughnutData} className="max-w-sm max-h-[384px] place-self-center" />
                {Object.entries(yearData).map(([transaction, amount], idx) => (
                    <span key={transaction} className="flex justify-between py-3 border-b last:border-b-0 text-primary font-medium">
                        <span className="flex items-center gap-2 capitalize">
                            <div className={cn("w-3 h-3 rounded-[4px] bg-[#A3A8FE]", `bg-[${colors[idx]}]`)}></div>
                            {transaction}
                        </span>
                        <span>{numberFormatter(amount, numberFormatterOptions)}</span>
                    </span>
                ))}
                <span className="flex justify-between py-3 border-b last:border-b-0 text-primary font-bold">
                    <span className="flex items-center gap-2 uppercase">
                        TOTAL
                    </span>
                    <span>{numberFormatter(Object.values(yearData).reduce((sum, curr) => sum + curr, 0), numberFormatterOptions)}</span>
                </span>
            </div>
        </div >
    )
}
