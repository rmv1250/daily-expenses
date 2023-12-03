import {createAsyncThunk, createSlice, SliceCaseReducers} from '@reduxjs/toolkit'
import {settingsApi} from "../api/settingsApi.ts";

export interface ISettingsState {
  "autoSaveCategories": boolean,
  "defaultCurrency": string,
  "userDefaultCategories": { id: number, label: string }[],
}


const settingsSlice = createSlice<ISettingsState, SliceCaseReducers<ISettingsState>, string>({
  name: 'settings',
  initialState: {
    autoSaveCategories: true,
    defaultCurrency: "CHF",
    userDefaultCategories: [],
  },
  reducers: {
    replace(_, action: { type: string, payload: ISettingsState }) {
      return action.payload;
    },
    setAutoSave(state, action) {
      state.autoSaveCategories = action.payload;
    },
    setCurrency(state, action) {
      state.defaultCurrency = action.payload
    },
    addCategory(state, action) {
      const existing = state.userDefaultCategories.find(cat => cat.label === action.payload.label);
      if (!existing) {
        state.userDefaultCategories.push({id: action.payload.id, label: action.payload.label})
      }
    },
    removeCategory(state, action) {
      const existingPosition = state.userDefaultCategories.findIndex(cat => cat.label === action.payload.label);
      if (existingPosition >= 0) {
        state.userDefaultCategories.splice(existingPosition, 1);
      }
    }
  }
});

export const fetchSettingsThunk = createAsyncThunk('settings',
    async (_, thunkAPI) => {
      const settings = await settingsApi();
      thunkAPI.dispatch(settingsAction.replace(settings));
    })


export default settingsSlice;
export const settingsReducer = settingsSlice.reducer;
export const settingsAction = settingsSlice.actions;