import {FormControlLabel, Radio, RadioGroup, Stack, TextField, useMediaQuery, useTheme} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {columns} from "../../models/ExpenseColumns.ts";
import {BaseSyntheticEvent, ChangeEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {filterAction} from "../../store/filterSlice.ts";
import {StoreState} from "../../store/store.ts";

const ExpenseFilter = () => {
  const dispatch = useDispatch();
  const initFilter = useSelector((state: StoreState) => state.filter);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [filter, setFilter] = useState(initFilter);


  const stackProps: {
    direction: "column" | "row" | "row-reverse" | "column-reverse",
    gap: number
  } = {
    direction: isSmallScreen ? "column" : "row",
    gap: 1
  }

  function handleRadioChange(e: BaseSyntheticEvent) {
    setFilter(state => ({
          ...state,
          columnId: e.target.value
        })
    );
  }

  function handleFilterChange(e: ChangeEvent<HTMLInputElement>){
    setFilter(state => ({
      ...state,
      value: e.target.value
    }))
  }

  function handleApply() {
    dispatch(filterAction.set({
      value: filter.value,
      columnId: filter.columnId
    }))
  }

  function handleReset() {
    setFilter({value: '', columnId: 'transactionDate'});
    dispatch(filterAction.clear({}))
  }

  return (
      <Stack {...stackProps}>
        <TextField value={filter.value} onChange={handleFilterChange} id="filterInput" label="Filter"
                   variant="standard"/>
        <RadioGroup
            value={filter.columnId}
            onChange={handleRadioChange}
            row
        >
          {columns.map(column => {
            return <FormControlLabel
                key={column.id}
                name="selectedColumn"
                value={column.id}
                control={<Radio/>}
                label={column.label}
                labelPlacement="top"
            />
          })}
        </RadioGroup>
        <Box alignItems="center" display="flex" paddingBottom={isSmallScreen ? '2rem' : 0}>
          <Button onClick={handleReset} size="small" variant="text" color="info">Reset</Button>
          <Button onClick={handleApply} size="small" variant="contained">Apply</Button>
        </Box>
      </Stack>
  )
}

export default ExpenseFilter;