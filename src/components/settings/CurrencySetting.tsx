import SettingBox from "./SettingBox.tsx";
import {Autocomplete, TextField} from "@mui/material";
import currencyList from "../../utils/currencyList.ts";
import {useDispatch, useSelector} from "react-redux";
import {StoreState} from "../../store/store.ts";
import {settingsAction} from "../../store/settingsSlice.ts";

const CurrencySetting = () => {
  const settings = useSelector((state: StoreState) => state.settings);
  const dispatch = useDispatch();
  const currencyListAutocomplete = currencyList.map(currency => ({...currency, label: currency.cc}))

  function handleChange(currency: string | null) {
    if (currencyList.find(c => c.cc === currency)) {
      dispatch(settingsAction.setCurrency(currency))
    }
  }

  return (
      <SettingBox label="Select default currency">
        <Autocomplete
            disablePortal
            id="currency"
            options={currencyListAutocomplete.map(c => c.label)}
            sx={{width: 130}}
            value={settings.defaultCurrency}
            onChange={(_, newValue: string | null) => {
              handleChange(newValue);
            }}
            renderInput={
              (params) => (
                  <TextField
                      name="currency"
                      variant="standard"
                      required {...params}/>)}
        />
      </SettingBox>
  );
}

export default CurrencySetting