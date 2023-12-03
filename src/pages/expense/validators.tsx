import {intervalLength, isUrl, maxDate, maxLength, minValue} from "../../utils/validators.ts";

interface IAddExpenseFormValidation {
  [key: string]: {
    validate: (input: string) => boolean,
    errorMessage: string
  }
}


const expenseValidationMap: IAddExpenseFormValidation = {
  'title': {
    validate: (title: string) => intervalLength(title, 3, 30),
    errorMessage: 'Must be 3 to 30 characters long'
  },
  'amount': {
    validate: (amount: string) => minValue(amount, 0),
    errorMessage: 'Amount must be greater then 0'
  },
  'currency': {
    validate: (currency: string) => intervalLength(currency, 3, 3),
    errorMessage: 'Invalid currency'
  },
  'category': {
    validate: (category: string) => intervalLength(category, 3, 20),
    errorMessage: 'Must be between 3 and 20 characters long'
  },
  'transactionDate': {
    validate: (date: string) => maxDate(date, Date.now()),
    errorMessage: 'Invalid date selection'
  },
  'recipient': {
    validate: (recipient: string) => intervalLength(recipient, 0, 50),
    errorMessage: 'Must be less then 50 characters long'
  },
  'tags': {
    validate: (tags: string) => {
      if (tags.length === 0) {
        return true;
      }
      const tagsArray = tags.split(',');

      for (const tag of tagsArray) {
        if (!intervalLength(tag, 3, 15)) {
          return false;
        }
      }

      return true;
    },
    errorMessage: 'Tag must be between 3 and 15 characters long'
  },
  'receiptUrl': {
    validate: (url: string) => intervalLength(url, 0, 0) ||  isUrl(url) && maxLength(url, 75),
    errorMessage: 'Invalid url format or length'
  },
  'location': {
    validate: (location: string) => intervalLength(location, 0, 50),
    errorMessage: 'Must be less then 50 characters long'
  },
  'comments': {
    validate: (comments: string) => intervalLength(comments, 0, 255),
    errorMessage: 'Must be less then 255 characters long'
  }
}

export default expenseValidationMap;