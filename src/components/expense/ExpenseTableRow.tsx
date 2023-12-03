import {TableCell, TableRow} from "@mui/material";
import {IExpense} from "../../models/IExpense.ts";
import {useNavigate} from "react-router-dom";
import {Column} from "../../models/ExpenseColumns.ts";

interface ExpenseTableRowProps {
  columns: readonly Column[],
  expense: IExpense
}

const ExpenseTableRow = ({columns, expense}: ExpenseTableRowProps) => {
  const navigate = useNavigate();

  function handleRowClick(expense: IExpense) {
    navigate(expense.id.toString())
  }


  return <TableRow hover tabIndex={-1} key={expense.id} onClick={() => handleRowClick(expense)}>
    {columns.map((column) => {
      const value = expense[column.id];
      if(column.hidden) return null;
      return (
          <TableCell key={column.id} align={column.align}>
            {column.format && typeof value === 'number'
                ? column.format(value, expense.currency)
                : value}
          </TableCell>
      );
    })}
  </TableRow>
}

export default ExpenseTableRow