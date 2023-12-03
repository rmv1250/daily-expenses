// this should be a different api, built like this only to demonstrate integration of api with redux
import {getExpense} from "./expenseApi.ts";
import {json} from "react-router-dom";
import {IExpense} from "../models/IExpense.ts";

const getDefaultCategories = async () => {
  const response = await getExpense('');

  if (!response.ok) {
    throw json('Fail to load expense categories')
  }

  const expenses: IExpense[] = await response.json() as IExpense[];

  const categories = new Set<string>();

  expenses.forEach(expense => {
    categories.add(expense.category)
  });

  return [...categories].map((cat, index) => ({id: index, label: cat}));
}

export {getDefaultCategories};