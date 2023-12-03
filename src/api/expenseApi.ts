import {API_PATHS} from "./apiPaths.ts";
import {IExpense} from "../models/IExpense.ts";
import delay from "../utils/delay.ts";
import {json} from "react-router-dom";

const expenseApi = async (expense: IExpense, method = 'POST') => {
  await delay(import.meta.env.VITE_API_DELAY);
  let identifier = '';
  if (method !== 'POST') {
    if (!expense.id) {
      throw json({message: 'Expense not found'}, {status: 400})
    }
    identifier = '/' + expense.id.toString();
  }

  return await fetch(`${import.meta.env.VITE_API_HOST}/${API_PATHS.EXPENSES}${identifier}`, {
    method,
    body: JSON.stringify(expense),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

const getExpense = async (id: number | string) => {
  return await fetch(`${import.meta.env.VITE_API_HOST}/${API_PATHS.EXPENSES}/${id}`)
}


export {expenseApi, getExpense}