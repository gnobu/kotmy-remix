import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { TypedChartComponent } from "node_modules/react-chartjs-2/dist/types"
import { Doughnut } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

const DoughnutChart: TypedChartComponent<"doughnut"> = (props) => {
    return <Doughnut {...props} />
}
export default DoughnutChart
