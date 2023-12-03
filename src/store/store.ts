import {configureStore} from "@reduxjs/toolkit";
import {filterReducer, IFilterState} from "./filterSlice.ts";
import {businessCategoriesReducer, IBusinessCategoriesState} from "./businessCategorySlice.ts";
import {ISettingsState, settingsReducer} from './settingsSlice.ts';

export interface StoreState{
  filter: IFilterState,
  businessCategories: IBusinessCategoriesState,
  settings: ISettingsState
}

const store = configureStore<StoreState>({
  reducer: {
    filter: filterReducer,
    businessCategories: businessCategoriesReducer,
    settings: settingsReducer
  }
})

export default store;