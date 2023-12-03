import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {Stack} from "@mui/material";
import CurrencySetting from "../../components/settings/CurrencySetting.tsx";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {useSelector} from "react-redux";
import {StoreState} from "../../store/store.ts";
import {settingsApi} from "../../api/settingsApi.ts";
import {useNavigate} from "react-router-dom";
import CategoriesSetting from "../../components/settings/CategoriesSetting.tsx";

const SettingsPage = () => {
  const navigate = useNavigate();
  const settings = useSelector((state: StoreState) => state.settings);

  async function handleSaveSettings() {
    await settingsApi(settings, 'POST');

    navigate('/');
  }

  return (
      <Container maxWidth="lg" sx={{p: 2}}>
        <Typography variant="h5" sx={{mb: 2}}>
          Expense summary
        </Typography>
        <Stack direction="row" display="flex" gap={5} flexWrap="wrap">
          <CategoriesSetting/>
          <CurrencySetting/>
        </Stack>
        <Box mt={2}>
          <Button variant="contained" onClick={handleSaveSettings}>Save</Button>
        </Box>
      </Container>
  )
}

export default SettingsPage;