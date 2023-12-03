import {useLoaderData} from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import ExpenseTable from "../../../components/expense/ExpenseTable.tsx";
import {IExpense} from "../../../models/IExpense.ts";
import ExpenseFilter from "../../../components/expense/ExpenseFilter.tsx";
import {useSelector} from "react-redux";
import {StoreState} from "../../../store/store.ts";

const DashboardExpensesPage = () => {
  const filter = useSelector((state: StoreState) => state.filter);
  const expenses: IExpense[] = (useLoaderData() as IExpense[]).filter(
      (expense) => {
        const filterKeywords = filter.value.toLowerCase().split(', ');
        for (const keyword of filterKeywords) {
          if (expense[filter.columnId].toString().toLowerCase().includes(keyword)) {
            return true;
          }
        }
        return false;
      }
  );

  return (
      <Container maxWidth="xl" sx={{p: 2}}>
        <Typography variant="h5" sx={{mb: 2}}>
          Expense Dashboard
        </Typography>
        <ExpenseFilter
        />
        <ExpenseTable expenses={expenses}/>
      </Container>
  )
}

export default DashboardExpensesPage