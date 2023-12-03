import MenuItem from "@mui/material/MenuItem";
import {TextField} from "@mui/material";
import {ChangeEvent, useState} from "react";
import {IExpense} from "../../models/IExpense.ts";
import * as dayjs from "dayjs";

export interface YearSelectorProps{
 expenses: IExpense[];
 onYearChange: (year: string)=>void;
}
const YearSelector = ({onYearChange, expenses}: YearSelectorProps) => {
  const availableYears = [
    ...expenses.reduce(
        (acc, expense) => {
          return acc.add(dayjs(expense.transactionDate, 'D/MM/YYYY').format('YYYY'))
        },
        new Set<string>())
  ].map(year => ({value: year, label: year}))
  .sort((a, b) => {
    return parseFloat(b.value) - parseFloat(a.value);
  });

  const [year, setYear] = useState('')

  function handleYearChange(e: ChangeEvent<HTMLInputElement>){
    onYearChange(e.target.value);
    setYear(e.target.value);
  }

  return <TextField
      sx={{width: "150px"}}
      id="outlined-select-currency"
      select
      label="Select year"
      value={year}
      onChange={handleYearChange}
  >
    {availableYears.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
    ))}
  </TextField>
}

export default YearSelector;