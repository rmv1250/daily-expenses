import Box from "@mui/material/Box";
import {Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import {ReactNode} from "react";

interface SettingBoxProps {
  label: string,
  children?: ReactNode
}

const SettingBox = ({label, children}: SettingBoxProps) => {
  return (
      <Stack direction={"column"}>
        <Box>
          <Typography variant={"subtitle1"} fontWeight="bold">
            {label}
          </Typography>
        </Box>
        <Box>
          {children}
        </Box>
      </Stack>
  )
}

export default SettingBox