import {BarChart} from "@mui/x-charts";
import {getYearlyDataSet, yearlyChartSettings} from "../../utils/reports/yearlyDataSet.ts";
import Box from "@mui/material/Box";
import {useState} from "react";

import {IExpense} from "../../models/IExpense.ts";
import YearSelector from "./YearSelector.tsx";

export interface YearlyBarChartProps{
  expenses: IExpense[],
  target: string;
  yLabel: string;
}
const YearlyBarChart = ({expenses, target, yLabel}: YearlyBarChartProps) => {
  const [selectedYear, setSelectedYear] = useState('');
  const yearlyDataSet = getYearlyDataSet(expenses, parseFloat(selectedYear), target);

  function handleYearChange(e: string) {
    setSelectedYear(e);
  }

  return <Box>
    <YearSelector expenses={expenses} onYearChange={handleYearChange}/>
    <BarChart
        dataset={yearlyDataSet.dataSet}
        xAxis={[{scaleType: 'band', dataKey: 'month', label: yLabel}]}
        series={yearlyDataSet.series}
        {...yearlyChartSettings}
    />
  </Box>
}

export default YearlyBarChart;