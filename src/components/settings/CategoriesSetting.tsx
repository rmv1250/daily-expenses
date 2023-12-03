import {Checkbox, FormControlLabel, List, ListItem, ListItemIcon, ListItemText, Stack} from "@mui/material";
import {Add, Delete, InfoOutlined} from "@mui/icons-material";
import Box from "@mui/material/Box";
import {ChangeEvent} from "react";
import {useDispatch, useSelector} from "react-redux";
import {StoreState} from "../../store/store.ts";
import {settingsAction} from "../../store/settingsSlice.ts";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import SettingBox from "./SettingBox.tsx";

const CategoriesSetting = () => {
  const dispatch = useDispatch();
  const allCategories = useSelector((state: StoreState) => state.businessCategories.list);
  const settings = useSelector((state: StoreState) => state.settings);

  function handleRemoveDefault(category: { id: number, label: string }) {
    dispatch(settingsAction.removeCategory(category))
  }

  function handleAddDefault(category: { id: number, label: string }) {
    dispatch(settingsAction.addCategory(category))
  }

  const categoriesList = allCategories.map(category => {
    const isDefault = settings.userDefaultCategories.findIndex(cat => cat.label === category.label) >= 0
    return (
        <ListItem key={category.id}>
          <ListItemText>{category.label}</ListItemText>
          <ListItemIcon>
            {isDefault && <Delete color="error" onClick={() => handleRemoveDefault(category)}/>}
            {!isDefault && <Add color="primary" onClick={() => handleAddDefault(category)}/>}
          </ListItemIcon>
        </ListItem>
    )
  })


  function handleAutoSaveChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch(settingsAction.setAutoSave(e.target.checked))
  }

  return (
      <Stack>
        <Box>
          <FormControlLabel control={<Checkbox checked={settings.autoSaveCategories} onChange={handleAutoSaveChange}/>}
                            label="Auto add new categories"/>
          <Tooltip title="When creating a new expense the category will be automatically saved as selected">
            <IconButton>
              <InfoOutlined color="info"/>
            </IconButton>
          </Tooltip>
        </Box>
        {categoriesList.length > 0 &&
            <SettingBox label="Configure active default categories">
              <List>
                {categoriesList}
              </List>
            </SettingBox>
        }
      </Stack>
  )
}

export default CategoriesSetting