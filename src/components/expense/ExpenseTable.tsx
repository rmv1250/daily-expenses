import {IExpense} from "../../models/IExpense.ts";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel} from "@mui/material";
import ExpenseTableRow from "./ExpenseTableRow.tsx";
import {useState} from "react";
import getExpenseComparator from "../../utils/expenseTableComparators.ts";
import {columns} from "../../models/ExpenseColumns.ts";



const ExpenseTable = ({expenses}: { expenses: IExpense[] }) => {
  const [orderBy, setOrderBy] = useState<keyof IExpense>('transactionDate')
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const sortedExpenses = [...expenses].sort(getExpenseComparator(orderBy));
  if(order === 'desc'){
    sortedExpenses.reverse()
  }

  function handleSort(id: keyof IExpense) {
    if (orderBy === id) {
      setOrder((order) => (order === "asc" ? "desc" : "asc"))
      return;
    }

    setOrderBy(id);
  }

  return (
      <Paper sx={{width: '100%', overflow: 'hidden'}}>
        <TableContainer sx={{maxHeight: '100%'}}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => ( !column.hidden &&
                    <TableCell
                        key={column.id}
                        align={column.align}
                        style={{minWidth: column.minWidth}}
                    >
                      <TableSortLabel
                          direction={order}
                          active={orderBy === column.id}
                          onClick={() => handleSort(column.id)}
                      >
                        {column.label}
                      </TableSortLabel>
                    </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedExpenses.map((expense) => (
                      <ExpenseTableRow key={expense.id} columns={columns} expense={expense}/>
                  )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
  )
}

export default ExpenseTable;