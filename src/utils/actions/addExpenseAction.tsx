import expenseValidationMap from "../../pages/expense/validators.tsx";
import {expenseApi} from "../../api/expenseApi.ts";
import {json, redirect} from "react-router-dom";
import {IExpense} from "../../models/IExpense.ts";

// @ts-expect-error any params
const addExpenseAction = async ({request}) => {
  const data = await request.formData();


  const errorMap = new Map();
  for (const field of data.entries()) {
    const fieldKey: string = field[0];
    const fieldValue: string = field[1];
    if (expenseValidationMap[fieldKey] && !expenseValidationMap[fieldKey]?.validate(fieldValue)) {
      errorMap.set(fieldKey, expenseValidationMap[fieldKey].errorMessage)
    }
  }

  if (errorMap.size > 0) {
    return errorMap;
  }

  const apiData = Object.fromEntries(data);
  apiData.tags = apiData.tags.length > 0 ? apiData.tags.split(',') : [];
  apiData.tags = apiData.tags.map((tag: string) => tag.trim());
  apiData.amount = parseFloat(apiData.amount);

  const response = await expenseApi(apiData as IExpense, request.method);
  if (!response.ok) {
    throw json({message: 'Failed to save new expense'}, {status: 500})
  }

  return redirect('/')
}

export default addExpenseAction