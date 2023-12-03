import {useFetcher} from "react-router-dom";
import * as dayjs from "dayjs";
import {HTMLFormMethod} from "@remix-run/router";

import {Autocomplete, Stack, TextField} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import SaveIcon from '@mui/icons-material/Save';
import Box from "@mui/material/Box";
import {LoadingButton} from "@mui/lab";

import currencyList from "../../utils/currencyList.ts";
import {IExpense} from "../../models/IExpense.ts";
import {useSelector} from "react-redux";
import {StoreState} from "../../store/store.ts";
import {useEffect, useState} from "react";

export interface ExpenseFormProps {
  method?: HTMLFormMethod,
  defaultExpense?: IExpense

}

const ExpenseForm = ({defaultExpense, method = 'POST'}: ExpenseFormProps) => {
  const settings = useSelector((state: StoreState) => state.settings);
  const businessCategoryList = settings.userDefaultCategories;
  const fetcher = useFetcher();
  const actionState = fetcher.state;
  const errorData: Map<string, string> = fetcher.data || new Map<string, string>();

  const currencyListAutocomplete = currencyList.map(currency => ({...currency, label: currency.cc}))
  const initCurrency = currencyListAutocomplete.find(cur => cur.cc === (defaultExpense?.currency || settings.defaultCurrency));
  const [currency, setCurrency] = useState(initCurrency)

  useEffect(() => {
    if (settings.defaultCurrency !== currency?.cc) {
      setCurrency(currencyListAutocomplete.find(cur => cur.cc === (defaultExpense?.currency || settings.defaultCurrency)));
    }

  }, [settings, currency, currencyListAutocomplete, defaultExpense]);


  // @ts-expect-error type
  function handleCurrencyChange(e) {
    setCurrency(e);
  }

  return <fetcher.Form
      method={method}
      action="/expenses/add"
  >
    <Stack spacing={2}>
      {defaultExpense?.id && <input name="id" type="hidden" readOnly={true} defaultValue={defaultExpense?.id}/>}
      <TextField
          id="title"
          name="title"
          defaultValue={defaultExpense?.title}
          label="Title"
          variant="standard"
          error={errorData.has('title')}
          helperText={errorData.get('title')}
          required/>
      <Box sx={{
        display: 'flex',
        flexGrow: 1
      }}>
        <TextField sx={{flexGrow: 1, mr: 2}}
                   id="amount"
                   type="number"
                   inputProps={{
                     step: 0.01
                   }}
                   name="amount"
                   defaultValue={defaultExpense?.amount}
                   label="Amount"
                   error={errorData.has('amount')}
                   helperText={errorData.get('amount')}
                   variant="standard"
                   required/>
        <Autocomplete
            disablePortal
            id="currency"
            isOptionEqualToValue={(a, b) => a.cc === b.cc}
            options={currencyListAutocomplete}
            sx={{width: 130}}
            value={currency}
            onChange={(_, newValue) => {
              handleCurrencyChange(newValue);
            }}
            renderInput={
              (params) => (
                  <TextField
                      name="currency"
                      variant="standard"
                      label="Currency"
                      error={errorData.has('currency')}
                      helperText={errorData.get('currency')}
                      required {...params}/>)}
        />
      </Box>
      <Autocomplete
          disablePortal
          freeSolo
          isOptionEqualToValue={(a, b) => a.id === b.id}
          id="category"
          options={businessCategoryList}
          defaultValue={businessCategoryList.find(category => category.label === defaultExpense?.category)}
          renderInput={
            (params) => (
                <TextField
                    name="category"
                    variant="standard"
                    label="Category"
                    error={errorData.has('category')}
                    helperText={errorData.get('category')}
                    required {...params}/>
            )
          }
      />
      <Box sx={{pt: 2}}>
        <DatePicker
            sx={{width: '100%'}}
            label="Transaction date"
            defaultValue={
              defaultExpense?.transactionDate ? dayjs(defaultExpense?.transactionDate, 'D/MM/YYYY') : dayjs(new Date())
            }
            format="D/MM/YYYY"
            maxDate={dayjs(new Date())}
            slotProps={
              {
                textField: {
                  name: 'transactionDate',
                  required: true,
                  error: errorData.has('transactionDate'),
                  helperText: errorData.get('transactionDate')
                }
              }
            }
        />
      </Box>
      <TextField
          id="recipient"
          name="recipient"
          defaultValue={defaultExpense?.recipient}
          error={errorData.has('recipient')}
          helperText={errorData.get('recipient')}
          label="Recipient"
          variant="standard"/>
      <TextField
          id="tags"
          name="tags"
          defaultValue={defaultExpense?.tags.join(', ')}
          error={errorData.has('tags')}
          helperText={errorData.has('tags') ? errorData.get('tags') : "comma separated"}
          label="Tags"
          variant="standard"
      />
      <TextField
          id="receiptUrl"
          name="receiptUrl"
          defaultValue={defaultExpense?.receiptUrl}
          error={errorData.has('receiptUrl')}
          helperText={errorData.get('receiptUrl')}
          label="Receipt Image URL"
          variant="standard"/>
      <TextField
          id="location"
          name="location"
          defaultValue={defaultExpense?.location}
          error={errorData.has('location')}
          helperText={errorData.get('location')}
          label="Location"
          variant="standard"/>
      <TextField
          id="comments"
          name="comments"
          defaultValue={defaultExpense?.comments}
          error={errorData.has('comments')}
          helperText={errorData.get('comments')}
          label="Comments"
          multiline
          rows={4}
          variant="standard"
      />
      <Box sx={{textAlign: 'center'}}>
        <LoadingButton
            size="medium"
            type="submit"
            loading={actionState === 'submitting'}
            loadingPosition="start"
            startIcon={<SaveIcon/>}
            variant="contained"
        >
          <span>{defaultExpense?.id ? "Update" : "Create"}</span>
        </LoadingButton>
      </Box>
    </Stack>
  </fetcher.Form>
}

export default ExpenseForm;