import React, { useState, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Moment from "react-moment";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CloseIcon from "@material-ui/icons/Close";
import AddTraining from "./AddTraining";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import Collapse from "@material-ui/core/Collapse";
import { MyContext } from "../Context/Context";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Confirm from "./Confirm";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: "1px",
    width: "100%",
    height: "700px",
    maxHeight: "100%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    outline: "none",
  },
  paper: {
    width: "100%",
    maxWidth: 1000,
    height: "1000px",
    maxHeight: "100%",
    overflow: "scroll",
    margin: `${theme.spacing(5)}px auto`,
    padding: theme.spacing(10),
  },
  delete: {
    color: "#f44336",
    margin: "0 -5px",
    "&:hover": {
      color: "#f50057",
    },
  },
  table: {
    width: "100%",
    margin: "0 auto",
  },
}));

const ModalCustomers = ({ open, handleClose, training, user }) => {
  const classes = useStyles();
  const { valueOne } = useContext(MyContext);

  const [, setCustomers] = valueOne;
  const [openAdd, setopenAdd] = useState(false);

  const reFetch = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data.content);
      })
      .catch((err) => console.error(err));
  };

  const fetchdeleteTrain = (param) => {
    fetch(`${param}`, { method: "DELETE" })
      .then((data) => {
        console.log(data, "deleted");
        reFetch();
      })
      .catch((err) => console.error(err));
  };
  const [deleteTrain, setDeleteTrain] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const handleCloseDialog = () => {
    // Yes No
    setOpenDialog(false);
  };

  const [sendIndex, setSendIndex] = useState("");
  const handleOpenDialog = (param) => {
    // Yes No
    setOpenDialog(true);
    setSendIndex(param);
    setDeleteTrain(param.links[1].href);
  };

  const preDeletefunction = () => {
    fetchdeleteTrain(deleteTrain);
    setOpenDialog(false);
  };

  const body = (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        <div
          style={{
            width: "100%",

            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            startIcon={<CloseIcon />}
            onClick={handleClose}
          >
            Close
          </Button>
        </div>
        <Grid container wrap="wrap">
          <Grid xl={12} style={{ marginBottom: "25px" }}>
            <Typography variant="h4">Customer info</Typography>
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
            <Grid style={{ marginTop: "25px" }}>
              <Typography variant="h4">Trainings Table</Typography>
            </Grid>
          </Grid>

          <TableContainer
            component={Paper}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "700" }}>Action</TableCell>
                  <TableCell style={{ fontWeight: "700" }}>Training</TableCell>
                  <TableCell style={{ fontWeight: "700" }} align="right">
                    Duration(min)
                  </TableCell>
                  <TableCell style={{ fontWeight: "700" }} align="right">
                    Date
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {training.map((key, index) =>
                  key.activity ? (
                    <TableRow key={index}>
                      <TableCell style={{ width: "100px" }}>
                        <IconButton
                          aria-label="delete"
                          className={classes.delete}
                          // onClick={() => fetchDeleteTrain(key.links[0].href)}
                          onClick={() => handleOpenDialog(key)}
                        >
                          <DeleteIcon />
                          <span style={{ fontSize: "10px", color: "grey" }}>
                            Delete
                          </span>
                        </IconButton>
                      </TableCell>
                      <TableCell component="th" scope="key">
                        {key.activity}
                      </TableCell>
                      <TableCell align="right">{key.duration}</TableCell>
                      <TableCell align="right">
                        <Moment format=" DD/MM/YYYY,h:mm:ss a">
                          {key.date}
                        </Moment>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow key={index}>
                      <TableCell>No Activities yet!</TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <div
            style={{
              width: "100%",
              margin: "15px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={openAdd ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              onClick={() => setopenAdd(!openAdd)}
            >
              New Training
            </Button>
          </div>
          <Collapse in={openAdd} style={{ width: "95%" }}>
            {openAdd ? <AddTraining customer={user} /> : ""}
          </Collapse>
        </Grid>
      </Paper>
      <Confirm
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        handleDeleteItem={preDeletefunction}
        trainings={sendIndex}
      />
    </div>
  );

  return (
    <Modal
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        outline: "none",
        border: "none",
      }}
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
};

export default ModalCustomers;
