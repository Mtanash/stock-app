import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

type AlertDialogProps = {
  title: string;
  content: string;
  action: () => void;
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  loading?: boolean;
};

const AlertDialog = ({
  title,
  content,
  action,
  open,
  handleClose,
  handleOpen,
  loading,
}: AlertDialogProps) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={loading || false}
          variant="contained"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          disabled={loading || false}
          variant="contained"
          onClick={action}
          color="error"
          autoFocus
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
