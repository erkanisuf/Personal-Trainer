import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";

const useStyles = makeStyles((theme) => ({
  green: {
    margin: theme.spacing(1),
    width: "160px",
    fontSize: "14px",
    padding: "5px",
    backgroundColor: "#3b6120",
    "&:hover": {
      backgroundColor: "#4caf50",
    },
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function FormDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Grid
        container
        justify="flex-end"
        alignItems="flex-end"
        style={{ width: "90%", margin: "15px" }}
      >
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
        >
          New Customer
        </Button>
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Customer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill all fields in order to add a new Member.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="firstname"
            label="First Name"
            type="email"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="lastname"
            label="Last Name"
            type="email"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
          />
          <div
            className={classes.root}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TextField
              autoFocus
              margin="dense"
              id="phone"
              label="Phone"
              type="email"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="city"
              label="City"
              type="email"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="streetaddress"
              label="Street Adress"
              type="email"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="postcode"
              label="PostCode"
              type="email"
              fullWidth
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            startIcon={<PlaylistAddCheckIcon />}
            variant="contained"
            color="primary"
            className={classes.green}
            onClick={handleClose}
          >
            Add Customer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
