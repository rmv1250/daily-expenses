import {createPortal} from "react-dom";
import {Dialog, DialogActions, DialogContent, DialogProps, DialogTitle} from '@mui/material'
import Button from "@mui/material/Button";

export interface ModalProps extends DialogProps {
  title: string;
  textAgree?: string;
  textClose?: string;
  handleAction?: (event: boolean) => void
}

const Modal = ({textAgree, textClose, handleAction, title, children, ...props}: ModalProps) => {
  return createPortal(
      (
          <Dialog {...props}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
              {children}
            </DialogContent>
            <DialogActions>
              {textClose && <Button onClick={() => handleAction && handleAction(false)}>{textClose}</Button>}
              {textAgree && <Button color="error" onClick={() => handleAction && handleAction(true)}>{textAgree}</Button>}
            </DialogActions>
          </Dialog>
      ), document.getElementById('modal') as HTMLElement);
}

export default Modal;