import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

interface DeleteTaskProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function DeleteTaskAlert({ open, onClose, onConfirm }: DeleteTaskProps) {
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onConfirm}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteTaskAlert;
