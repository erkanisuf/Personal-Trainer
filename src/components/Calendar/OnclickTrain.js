import React, { useState, useEffect, useContext } from "react";
import { MyContext } from "../../Context/Context";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Moment from "react-moment";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    height: "500px",
    width: "100%",
  },
  delete: {
    color: "#f44336",
    margin: "0 -5px",
    "&:hover": {
      color: "#f50057",
    },
  },
}));

const OnclickTrain = ({ handleCloseOnclick, openOnclick, opneningObj }) => {
  const { valueThree } = useContext(MyContext);

  const classes = useStyles();
  const [user, setUser] = useState(null);
  const [opensnack, setOpensnack] = useState(false);
  const [confirm, setConfirm] = useState(false);
  useEffect(() => {
    const fetchCustomerInfo = () => {
      fetch(`${opneningObj.resource[2].href}`, {
        credentials: "same-origin",
        headers: {
          accept: "application/json",
        },
      })
        .then((res) => {
          if (!res.ok)
            return Promise.reject(new Error(`HTTP Error ${res.status}`));

          return res.json();
        })
        .then((data) => {
          setUser(data);
        })
        .catch((err) => console.error(err));
    };
    fetchCustomerInfo();
  }, [opneningObj, openOnclick]);

  const deleteItem = () => {
    fetch(`${opneningObj.resource[0].href}`, { method: "DELETE" })
      .then((data) => {
        setOpensnack(true);
        setConfirm(false);
        handleCloseOnclick();
        valueThree();
      })
      .catch((err) => console.error(err));
  };

  const closeSnack = () => setOpensnack(false);

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={openOnclick}
        onClose={handleCloseOnclick}
        classes={{ paper: classes.dialogPaper }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Training information</DialogTitle>
        <DialogContent
          style={{
            width: window.innerWidth <= 480 ? "90%" : "100%",
            height: "100%",
          }}
        >
          {user && (
            <div>
              {" "}
              <Typography style={{ fontWeight: "800", fontSize: "18px" }}>
                Customer information:{" "}
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
                  <span style={{ fontWeight: "700" }}>Contacts: </span>{" "}
                  {user.email},{user.phone}
                </Typography>

                <Typography>
                  <span style={{ fontWeight: "700" }}>Adress: </span>{" "}
                  {user.streetaddress} , {user.postcode},{user.city}
                </Typography>
              </Paper>
            </div>
          )}
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Action</TableCell>
                  <TableCell style={{ fontWeight: "800" }} align="right">
                    Activity
                  </TableCell>
                  <TableCell align="right">Duration</TableCell>
                  <TableCell align="right">Start</TableCell>
                  <TableCell align="right">End</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="right">
                    <IconButton
                      aria-label="delete"
                      className={classes.delete}
                      onClick={() => setConfirm(true)}
                    >
                      <DeleteIcon />
                      <span style={{ fontSize: "10px", color: "grey" }}>
                        Delete
                      </span>
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">{opneningObj.title}</TableCell>
                  <TableCell align="right">
                    {(opneningObj.end - opneningObj.start) / 60000}
                  </TableCell>
                  <TableCell align="right">
                    <Moment format=" DD/MM/YYYY,h:mm:ss a">
                      {opneningObj.start}
                    </Moment>
                  </TableCell>
                  <TableCell align="right">
                    <Moment format=" DD/MM/YYYY,h:mm:ss a">
                      {opneningObj.end}
                    </Moment>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseOnclick}
            color="primary"
            variant="outlined"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={confirm}
        onClose={() => setConfirm(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this item?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={() => setConfirm(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteItem} color="primary" autoFocus>
            DELETE
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={opensnack} autoHideDuration={6000} onClose={closeSnack}>
        <Alert onClose={closeSnack} severity="success">
          Sucssesfully deleted!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default OnclickTrain;
