import {IExpense} from "./IExpense.ts";

export interface Column {
  id: keyof IExpense,
  hidden?: boolean,
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number, cc: string) => string;
}


export const columns: readonly Column[] = [
  {id: 'transactionDate', label: "Date"},
  {id: "title", label: "Title"},
  {
    id: "amount", label: "Amount", format: (value, cc) => {
      const formatter = new Intl.NumberFormat('en-CH', {
        style: 'currency',
        currency: cc,
      })
      return formatter.format(value)
    }
  },
  {id: 'currency', label: 'Currency', hidden: true},
  {id: "recipient", label: "Recipient"},
  {id: "category", label: "Category"},
  {id: "location", label: "Location"}
]