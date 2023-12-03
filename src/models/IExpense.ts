export interface IExpense{
  "title": string
  "amount": number,
  "currency": string,
  "category": string,
  "transactionDate": string,
  "recipient": string
  "tags": string[],
  "receiptUrl": string,
  "location": string,
  "comments": string,
  "id": number
}