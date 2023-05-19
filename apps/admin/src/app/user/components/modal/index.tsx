import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';

interface Props {
  title: string;
  description: string;
  onSuccess: () => void;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const CompanyModal: React.FC<Props> = ({ description, title, onSuccess, open, setOpen }) => {
  const handleClose = () => setOpen(false);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={() => {
            onSuccess();
            handleClose();
          }}
          autoFocus
          variant="contained"
          color="error"
          disableElevation
        >
          Log out
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CompanyModal;
