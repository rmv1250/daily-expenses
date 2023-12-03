import {getExpense} from "./expenseApi.ts";
import {LoaderFunctionArgs} from "react-router-dom";

const expenseDetailLoader = async ({params}: LoaderFunctionArgs<{ expenseId: string }>) => {
  const expenseId = params.id ?? '';

  return await getExpense(expenseId);
}

export default expenseDetailLoader;