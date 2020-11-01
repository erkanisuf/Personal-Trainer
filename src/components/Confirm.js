import React from "react";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

function Confirm({ openDialog, handleCloseDialog, handleDeleteItem, user }) {
  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography style={{ fontWeight: "800", fontSize: "18px" }}>
            Are you sure that you want to delete this user:{" "}
          </Typography>
          <Paper elevation={3} style={{ padding: "15px", margin: "15px" }}>
            <Typography>
              <span style={{ fontWeight: "700" }}>First Name: </span>
              {user.firstname}
            </Typography>
            <Typography>
              <span style={{ fontWeight: "700" }}>Last Name: </span>
              {user.lastname}
            </Typography>
            <Typography>
              <span style={{ fontWeight: "700" }}>Contacts: </span> {user.email}
              ,{user.phone}
            </Typography>

            <Typography>
              <span style={{ fontWeight: "700" }}>Adress: </span>{" "}
              {user.streetaddress} , {user.postcode},{user.city}
            </Typography>
          </Paper>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Once its deleted it will be gone
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
    </div>
  );
}

export default Confirm;
