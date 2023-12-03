import {CardContent, List, ListItem, ListItemAvatar, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";


export interface SummaryCardListItem {
  heading: string;
  label: string;
}

export interface SummaryCardProps {
  title: string;
  items: SummaryCardListItem[];
  action?: () => void;
  actionTitle?: string;
}

const SummaryCard = ({title, items, action, actionTitle}: SummaryCardProps) => {
  return <Paper sx={{flexGrow: 1}}>
    <CardContent sx={{
      height: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
      boxSizing: 'border-box',
      paddingBottom: '0!important'
    }}>
      <Box>
        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <List>
          {items.map(item => (
              <ListItem divider key={item.heading}>
                <ListItemAvatar sx={{marginRight: '1rem'}}>
                  <span>{item.heading}</span>
                </ListItemAvatar>
                <span>{item.label}</span>
              </ListItem>
          ))}
        </List>
      </Box>
      <Box textAlign="center">
        {action &&
            <Button onClick={action} variant="text">{actionTitle}</Button>
        }
      </Box>
    </CardContent>
  </Paper>
}

export default SummaryCard;