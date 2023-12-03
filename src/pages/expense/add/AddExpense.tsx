import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import ExpenseForm from "../../../components/expense/ExpenseForm.tsx";


const AddExpensePage = () => {

  return <Container maxWidth="sm" sx={{p: 2}}>
    <Typography variant="h5" sx={{mb: 2}}>
      Add new expense
    </Typography>
    <ExpenseForm />
  </Container>
}

export default AddExpensePage;