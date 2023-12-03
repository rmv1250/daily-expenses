import {IExpense} from "../models/IExpense.ts";
import * as dayjs from "dayjs";

export type ExpenseTableColumnComparator<T> = (a: T, b: T) => -1 | 0 | 1;

const defaultExpenseComparator: (id: keyof IExpense) => ExpenseTableColumnComparator<IExpense> = (id) => {
  return (a: IExpense, b: IExpense) => {
    let propA = a[id];
    let propB = b[id];
    if (typeof a[id] === 'string') {
      propA = a[id].toString().toLowerCase();
      propB = b[id].toString().toLowerCase();
    }
    if (propA === propB) {
      return 0;
    }
    if (propA > propB) {
      return 1;
    }

    return -1
  }
}
const expenseTableComparatorsMap: Map<keyof IExpense, ExpenseTableColumnComparator<IExpense>> = new Map();

expenseTableComparatorsMap.set('transactionDate', (a: IExpense, b: IExpense) => {
  const aDate = dayjs(a.transactionDate, 'D/MM/YYYY');
  const bDate = dayjs(b.transactionDate, 'D/MM/YYYY');

  if (aDate.isSame(bDate)) {
    return 0;
  }

  if (aDate.isAfter(bDate)) {
    return 1
  }

  return -1;
})

// desc order
expenseTableComparatorsMap.set('id', (a: IExpense, b: IExpense) => {
  if(a.id === b.id){
    return 0;
  }

  if(a.id - b.id > 0){
    return -1
  }

  return 1
})

const getExpenseComparator = (id: keyof IExpense) => {
  if (expenseTableComparatorsMap.has(id)) {
    return expenseTableComparatorsMap.get(id)
  }
  return defaultExpenseComparator(id)
}

export default getExpenseComparator;
