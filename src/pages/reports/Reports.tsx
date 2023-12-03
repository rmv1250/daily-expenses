import {useLoaderData} from "react-router-dom";
import {IExpense} from "../../models/IExpense.ts";
import {Stack, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import YearlyBarChart from "./YearlyBarChart.tsx";
import MenuItem from "@mui/material/MenuItem";
import {ChangeEvent, useState} from "react";


const chartVariants = [
  {label: 'Currencies', value: 'currency'},
  {label: 'Locations', value: 'location'},
  {label: 'Categories', value: 'category'},
  {label: 'Recipients', value: 'recipient'}
]
const ReportsPage = () => {
  const expenses = useLoaderData() as IExpense[];
  const [variant, setVariant] = useState(chartVariants[0].value)

  function handleChartVariantChange(e: ChangeEvent<HTMLInputElement>) {
    setVariant(e.target.value);
  }

  return (
      <Container maxWidth="lg" sx={{p: 2}}>
        <Typography variant="h5" sx={{mb: 2}}>
          Reports
        </Typography>
        <Stack direction="row" display="flex" gap={2} flexWrap="wrap">
          <TextField
              sx={{width: "200px"}}
              id="outlined-select-currency"
              select
              label="Select chart variant"
              value={variant}
              onChange={handleChartVariantChange}
          >
            {chartVariants.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
            ))}
          </TextField>
          <YearlyBarChart expenses={expenses} target={variant} yLabel={"Overview for: " + variant}/>
        </Stack>
      </Container>
  )
}

export default ReportsPage;