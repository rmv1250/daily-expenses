import {json, NavLink, useLoaderData, useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {IExpense} from "../../../models/IExpense.ts";
import {Chip, DialogContentText, List, ListItem, ListItemAvatar, ListItemText, Stack} from "@mui/material";
import {
  CategoryOutlined,
  CommentOutlined,
  Delete, Edit,
  ImageOutlined,
  LocationOnOutlined,
  StorefrontOutlined, TagOutlined
} from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Modal from "../../../components/Modal.tsx";
import {useState} from "react";
import {expenseApi} from "../../../api/expenseApi.ts";
import Box from "@mui/material/Box";

const ViewExpensePage = () => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showReceiptModal, setShowReceiptModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const expense: IExpense = useLoaderData() as IExpense;
  const formatter = new Intl.NumberFormat('en-CH', {
    style: 'currency',
    currency: expense.currency,
  })

  async function handleAgreeDelete(agree: boolean) {
    setShowDeleteModal(false);
    if (!agree) {
      return;
    }

    const response = await expenseApi(expense, 'delete');

    if (!response.ok) {
      throw json({message: 'Could not delete the expense with id: ' + expense.id}, {status: 400})
    }

    navigate('/expenses');
  }

  function handleShowDeleteModal() {
    setShowDeleteModal(true)
  }

  function handleShowReceiptModal() {
    if (expense.receiptUrl) {
      setShowReceiptModal(true)
    }
  }

  function handleReceiptClose(){
    setShowReceiptModal(false)
  }

  return <Container maxWidth="sm" sx={{p: 2}}>
    <Stack direction="row" justifyContent="space-between" alignContent="center">
      <Stack>
        <Typography variant="h5" sx={{wordBreak: 'break-word'}}>
          {expense.title}
        </Typography>
        <Typography variant="subtitle1" sx={{mb: 2}}>
          {expense.transactionDate}
        </Typography>
      </Stack>
      <Typography variant="h5">
        {formatter.format(expense.amount)}
      </Typography>
    </Stack>
    <Stack direction="row">
      <List sx={{width: '100%'}}>
        <ListItem divider>
          <ListItemAvatar>
            <Avatar>
              <TagOutlined/>
            </Avatar>
          </ListItemAvatar>
          {expense.tags.map(tag => (
              <span key={tag} style={{'marginRight': '.5rem'}}>
                <Chip label={tag}/>
              </span>
          ))}
        </ListItem>
        <ListItem divider>
          <ListItemAvatar>
            <Avatar>
              <CommentOutlined/>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Comments" secondary={expense.comments}/>
        </ListItem>
        <ListItem divider>
          <ListItemAvatar>
            <Avatar>
              <ImageOutlined/>
            </Avatar>
          </ListItemAvatar>
          <ListItemText
              onClick={handleShowReceiptModal}
              style={{'cursor': 'pointer'}}
              secondaryTypographyProps={{color: "darkblue", fontWeight: "bold"}} primary="Receipt image"
              secondary={expense.receiptUrl ? "Click to view receipt" : "No receipt available"}/>
        </ListItem>
        <ListItem divider>
          <ListItemAvatar>
            <Avatar>
              <StorefrontOutlined/>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Receipient" secondary={expense.recipient}/>
        </ListItem>
        <ListItem divider>
          <ListItemAvatar>
            <Avatar>
              <CategoryOutlined/>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Category" secondary={expense.category}/>
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <LocationOnOutlined/>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Location" secondary={expense.location}/>
        </ListItem>
      </List>
    </Stack>
    <Stack direction="row" justifyContent="center" spacing={2}>
      <NavLink to={'edit'}>
        <Button size="medium" variant="contained" startIcon={<Edit/>}>Edit</Button>
      </NavLink>
      <Button onClick={handleShowDeleteModal} size="medium" color="error" endIcon={<Delete/>}>
        Delete
      </Button>
    </Stack>
    <Modal
        title="Delete expense"
        textAgree="I'm sure!"
        textClose="Cancel"
        open={showDeleteModal}
        handleAction={handleAgreeDelete}
    >
      <DialogContentText>
        Are you sure you want to delete this expense?
      </DialogContentText>
    </Modal>
    <Modal
        title="Receipt image"
        textClose="Close"
        open={showReceiptModal}
        handleAction={handleReceiptClose}
    >
      <Box maxWidth="xs">
        <img width={"300px"} src={expense.receiptUrl} alt="receipt image"/>
      </Box>
    </Modal>
  </Container>
}

export default ViewExpensePage;