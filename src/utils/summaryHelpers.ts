import {IExpense} from "../models/IExpense.ts";
import * as dayjs from "dayjs";
import {SummaryCardListItem} from "../components/summary/SummaryCard.tsx";

const filterExpenses = (expenses: IExpense[], startDate: string, endDate: string) => {
  const start = dayjs(startDate, 'D/MM/YYYY');
  const end = dayjs(endDate, 'D/MM/YYYY');

  return expenses.filter(expense => {
    const currentExpenseDate = dayjs(expense.transactionDate, 'D/MM/YYYY');

    return !(currentExpenseDate.isBefore(start, "day") || currentExpenseDate.isAfter(end, "day"));

  });
}

const reduceListItems = (items: SummaryCardListItem[]) => {
  const itemsMap = new Map<string, string>();
  for (const item of items) {
    if (itemsMap.has(item.heading)) {
      const existingItem = itemsMap.get(item.heading) ?? '0';
      itemsMap.set(item.heading, (parseFloat(item.label) + parseFloat(existingItem)).toString())
    } else {
      itemsMap.set(item.heading, item.label);
    }
  }

  return Array.from(itemsMap).map((entry) => {
    return {
      heading: entry[0],
      label: entry[1]
    }
  });
}

const expensesToListItems = (expense: IExpense[], heading: keyof IExpense) => {
  return expense.map(expense => {
    return {heading: expense[heading] || 'N/A', label: expense.amount.toString()}
  }) as SummaryCardListItem[]
}

export {filterExpenses, reduceListItems, expensesToListItems};