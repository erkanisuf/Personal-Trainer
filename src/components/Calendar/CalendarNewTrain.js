/* eslint-disable no-use-before-define */
import React, { useState, useContext, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { MyContext } from "../../Context/Context";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import AddCustomer from "../AddCustomer";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  newtrain: {
    fontSize: "10px",
    height: "50px",
    margin: theme.spacing(1),
    backgroundColor: "#3b6120",
    "&:hover": {
      backgroundColor: "#4caf50",
    },
  },
  margins: {
    margin: theme.spacing(1),
  },
  calendar: {
    margin: "5px",
    marginTop: "20px",
  },

  fitnessicon: {
    margin: theme.spacing(1),
    width: "160px",
    fontSize: "14px",
    padding: "5px",
    height: "40px",
    float: "right",
    alignSelf: "flex-end",
    justifySelf: "flex-end",

    color: "white",
    backgroundColor: "#3b6120",
    "&:hover": {
      backgroundColor: "#4caf50",
    },
  },
  cancel: {
    margin: theme.spacing(1),
    width: "1%",
    fontSize: "25px",
    padding: "1px",
    height: "60px",

    borderRadius: "50%",
    alignSelf: "center",
    color: "grey",

    "&:hover": {
      color: "red",
    },
  },
}));

export default function CalendarNewTrain({
  open,
  handleOpen,
  startvalue,
  datePicker,
  handleNumber,
  handleClose,
  handleTrainignText,
  reNewStates,
  select,
}) {
  const { valueOne } = useContext(MyContext);
  console.log(startvalue);
  const [customers] = valueOne;

  const classes = useStyles();
  const { valueThree } = useContext(MyContext);

  const [actError, setActError] = useState(false);
  const [numError, setNumError] = useState(false);
  const [opensnack, setOpensnack] = useState(false);
  useEffect(() => {
    if (startvalue.activity.length >= 4 && startvalue.activity.length < 20) {
      setActError(false);
    } else {
      setActError(true);
    }

    if (startvalue.duration >= 15 && startvalue.duration < 600) {
      setNumError(false);
    } else {
      setNumError(true);
    }
  }, [startvalue]);

  const addNewTraining = () => {
    if (actError || numError || select === null) {
      alert("Please check the fields!");
    } else {
      console.log("NOW SENDS MAN");
      fetch(`https://customerrest.herokuapp.com/api/trainings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(startvalue),
      })
        .then((key) => console.log("key", key))
        .then((key) => {
          console.log("Succ", key);
          setOpensnack(true);
          valueThree();

          handleClose();
        })
        .catch((err) => console.error(err));
    }
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const closeSnack = () => setOpensnack(false);
  //
  return (
    <div style={{ width: "100%" }}>
      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add new Training</DialogTitle>
        <DialogContent style={{ width: "100%" }}>
          <DialogContentText>
            Please emake sure to fill all the required information!
          </DialogContentText>

          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: open ? "center" : "flex-end",
              margin: "0 auto",
            }}
          >
            {open && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  border: "1px solid grey",
                  borderRadius: "10px",
                  padding: "10px",

                  width: "100%",
                  margin: "10px auto",
                }}
              >
                <Autocomplete
                  value={select}
                  id="combo-box-demo"
                  options={customers}
                  getOptionLabel={(cust) =>
                    `${cust.firstname}, ${cust.lastname}, ${cust.phone}`
                  }
                  style={{ width: 300 }}
                  onChange={(prop, event) => reNewStates(event)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Customer"
                      variant="outlined"
                      margin="normal"
                      size="small"
                      error={!select}
                      helperText={
                        select
                          ? "Please select Customer!"
                          : "Required to select customer !"
                      }
                    />
                  )}
                />
                <AddCustomer />

                <TextField
                  style={{ width: "300px" }}
                  label="Activity"
                  name="activity"
                  margin="normal"
                  variant="outlined"
                  value={startvalue.activity}
                  onChange={handleTrainignText}
                  size="small"
                  error={actError}
                  helperText={actError ? "Required 4-20chars" : "Required"}
                />
                <TextField
                  id="standard-number"
                  name="duration"
                  margin="normal"
                  size="small"
                  className={classes.margins}
                  value={startvalue.duration}
                  onChange={handleNumber}
                  label="Duration(min)"
                  type="number"
                  InputProps={{ inputProps: { min: 15, max: 600 } }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={numError}
                  helperText={numError ? "Min 15min,Max 600min" : "Required"}
                />

                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <DateTimePicker
                    margin="normal"
                    size="small"
                    className={classes.calendar}
                    value={startvalue.date}
                    onChange={datePicker}
                    helperText={"Choose a date and time"}
                  />
                </MuiPickersUtilsProvider>
                <Button
                  size="small"
                  startIcon={<AddIcon />}
                  variant="contained"
                  color="primary"
                  className={classes.newtrain}
                  onClick={addNewTraining}
                >
                  Add Training
                </Button>
                <Snackbar
                  open={opensnack}
                  autoHideDuration={6000}
                  onClose={closeSnack}
                >
                  <Alert onClose={closeSnack} severity="success">
                    Sucssesfully added new Training
                  </Alert>
                </Snackbar>
              </div>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
