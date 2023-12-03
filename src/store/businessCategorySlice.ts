import {createAsyncThunk, createSlice, SliceCaseReducers} from '@reduxjs/toolkit'
import {getDefaultCategories} from "../api/businessCategoriesApi.ts";

export interface IBusinessCategoriesState {
  list: {id: number, label: string}[],
}


const businessCategoriesSlice = createSlice<IBusinessCategoriesState, SliceCaseReducers<IBusinessCategoriesState>, string>({
  name: 'businessCategories',
  initialState: {
    list: [],
  },
  reducers: {
    set(state, action: { type: string, payload: IBusinessCategoriesState }) {
      state.list = action.payload.list;
    },
    clear(state) {
      state.list = [];
    }
  }
});


export const fetchCategoriesThunk = createAsyncThunk('businessCategories/list',
    async (_, thunkAPI) => {
      const categories = await getDefaultCategories();
      thunkAPI.dispatch(businessCategoriesActions.set({list: categories}));
    })

export default businessCategoriesSlice;
export const businessCategoriesReducer = businessCategoriesSlice.reducer;
export const businessCategoriesActions = businessCategoriesSlice.actions;