import React from "react";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function ConfirmAll({
  openDialog,
  handleCloseDialog,
  handleDeleteItem,
  opensnack,
  closeSnack,
}) {
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure that you want to delete all the selected items?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteItem}
            autoFocus
          >
            DELETE
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={opensnack} autoHideDuration={6000} onClose={closeSnack}>
        <Alert onClose={closeSnack} severity="success">
          Selected Items got deleted!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ConfirmAll;
