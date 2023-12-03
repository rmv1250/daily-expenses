import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ExpenseForm from "../../../components/expense/ExpenseForm.tsx";
import {useLoaderData} from "react-router-dom";
import {IExpense} from "../../../models/IExpense.ts";

const EditExpensePage = () => {
  const loadedExpense = useLoaderData() as IExpense;

  return <Container maxWidth="sm" sx={{p: 2}}>
    <Typography variant="h5" sx={{mb: 2}}>
      Update expense details
    </Typography>
    <ExpenseForm defaultExpense={loadedExpense} method="patch"/>
  </Container>
}

export default EditExpensePage;