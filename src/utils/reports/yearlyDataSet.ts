import {IExpense} from "../../models/IExpense.ts";
import * as dayjs from "dayjs";


type DataSetMap = Record<string, number>

const monthsWeight: Record<string, number> = {
  "Jan": 1,
  "Feb": 2,
  "Mar": 3,
  "Apr": 4,
  "May": 5,
  "Jun": 6,
  "Jul": 7,
  "Aug": 8,
  "Sep": 9,
  "Oct": 10,
  "Nov": 11,
  "Dec": 12
}

const yearlyChartSettings = {
  width: 400,
  height: 400,
  label: 'Year overview'
};
const getYearlyDataSet = (expenses: IExpense[], year: number, columnId = 'currency') => {
  const yearExpenses = expenses.filter(expense => expense.transactionDate.endsWith(year.toString()));
  const dataSet = new Map<string, DataSetMap>;

  for (const expense of yearExpenses) {
    const month = dayjs(expense.transactionDate, 'D/MM/YYYY').format('MMM');
    if (dataSet.has(month)) {
      const existing = dataSet.get(month) ?? {};
      // @ts-expect-error key type
      existing[expense[columnId]] = (existing[expense[columnId]] ?? 0) + expense.amount

      dataSet.set(month, existing);
    } else {
      const toAdd = {
        // @ts-expect-error key type
        [expense[columnId]]: expense.amount,
      }
      dataSet.set(month, toAdd)
    }
  }

  const dataSetArray: Record<string, number | string>[] = [];
  let seriesKeys: string[] = [];

  for (const entry of dataSet.entries()) {
    seriesKeys.push(...Object.keys(entry[1]));
    dataSetArray.push({month: entry[0], ...entry[1]})
  }

  seriesKeys = [...new Set(seriesKeys)];

  for(const serie of seriesKeys){
    for(const set of dataSetArray){
      set[serie] = set[serie] || 0;
    }
  }


  const series = seriesKeys.map(serie => ({
    dataKey: serie,
    label: serie,
    stack: 'a'
  }));

  dataSetArray.sort( (a, b) => {
    return monthsWeight[a.month] - monthsWeight[b.month];

  })

  return {dataSet: dataSetArray, series};
}

export {getYearlyDataSet, yearlyChartSettings}