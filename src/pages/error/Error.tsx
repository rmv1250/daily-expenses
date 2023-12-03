import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {Stack} from "@mui/material";
import {useRouteError} from "react-router-dom";
import NavigationBar from "../../components/navigation/NavigationBar.tsx";

const ErrorPage = () => {
  const error = useRouteError() as {message: string};

  return (<>
        <NavigationBar/>
        <main>
          <Container maxWidth="lg" sx={{p: 2}}>
            <Typography variant="h5" sx={{mb: 2}}>
              Error
            </Typography>
            <Stack direction="row" display="flex" gap={2} flexWrap="wrap">
              <Typography>
                {error.message ?? 'An unexpected error occured'}
              </Typography>
            </Stack>
          </Container>
        </main>
      </>

  )
}

export default ErrorPage;