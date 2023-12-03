import {createSlice, SliceCaseReducers} from '@reduxjs/toolkit'
import {IExpense} from "../models/IExpense.ts";

export interface IFilterState {
  value: string;
  columnId: keyof IExpense
}


const filterSlice = createSlice<IFilterState, SliceCaseReducers<IFilterState>, string>({
  name: 'filter',
  initialState: {
    value: '',
    columnId: 'transactionDate'
  },
  reducers: {
    set(state, action: {type: string, payload: IFilterState}) {
      state.value = action.payload.value;
      state.columnId = action.payload.columnId;
    },
    clear(state){
      state.value ='';
      state.columnId = 'transactionDate'
    }
  }
});

export default filterSlice;
export const filterReducer = filterSlice.reducer;
export const filterAction = filterSlice.actions;