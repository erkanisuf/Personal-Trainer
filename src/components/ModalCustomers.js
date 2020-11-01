import React from "react";
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
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: "50px",
    width: "100%",
    height: "600px",
    margin: "25px auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    outline: "none",
  },
  paper: {
    width: "100%",
    maxWidth: 1000,
    height: "600px",
    margin: `${theme.spacing(5)}px auto`,
    padding: theme.spacing(2),
  },
  table: {
    width: "100%",
    margin: "0 auto",
  },
}));

const ModalCustomers = ({ open, handleClose, training, user }) => {
  const classes = useStyles();
  const body = (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
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
                  <TableCell style={{ fontWeight: "700" }}>Training</TableCell>
                  <TableCell style={{ fontWeight: "700" }} align="right">
                    Duration
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
                      <TableCell component="th" scope="key">
                        {key.activity}
                      </TableCell>
                      <TableCell align="right">{key.duration}</TableCell>
                      <TableCell align="right">
                        <Moment format="YYYY/MM/DD">{key.date}</Moment>
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
        </Grid>
        <Grid container justify="flex-end" alignItems="flex-end">
          <Button
            style={{ bottom: 3, right: 3, top: 150 }}
            variant="contained"
            color="secondary"
            startIcon={<CloseIcon />}
            onClick={handleClose}
          >
            Close
          </Button>
        </Grid>
      </Paper>
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
