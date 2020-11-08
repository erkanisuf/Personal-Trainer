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

const useStyles = makeStyles((theme) => ({
  newtrain: {
    fontSize: "10px",
    height: "50px",
    marginTop: "15px",
    backgroundColor: "#3b6120",
    "&:hover": {
      backgroundColor: "#4caf50",
    },
  },
}));

export default function NewTraining() {
  const { valueOne } = useContext(MyContext);

  const [customers] = valueOne;
  const [select, setSelect] = useState(null);

  const classes = useStyles();
  const { valueThree } = useContext(MyContext);
  const [open, setOpen] = useState(false);
  const [trainingSend, setTrainignSend] = useState({
    date: new Date(),
    duration: 15,
    activity: "",
    customer: select,
  });

  const handleTrainignText = (e) => {
    setTrainignSend({ ...trainingSend, [e.target.name]: e.target.value });
  };
  const handleNumber = (e) => {
    setTrainignSend({ ...trainingSend, duration: parseInt(e.target.value) });
  };
  const [actError, setActError] = useState(false);
  const [numError, setNumError] = useState(false);
  useEffect(() => {
    if (
      trainingSend.activity.length >= 4 &&
      trainingSend.activity.length < 20
    ) {
      setActError(false);
    } else {
      setActError(true);
    }

    if (trainingSend.duration >= 15 && trainingSend.duration < 600) {
      setNumError(false);
    } else {
      setNumError(true);
    }
  }, [trainingSend]);

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
        body: JSON.stringify(trainingSend),
      })
        .then((key) => console.log("key", key))
        .then((key) => {
          console.log("Succ", key);
          valueThree();
          setTrainignSend({
            ...trainingSend,
            duration: parseInt(15),
            activity: "",
            date: new Date(),

            customer: select,
          });

          setSelectedDate(new Date());
          setSelect(null);
          setOpensnack(true);
        })
        .catch((err) => console.error(err));
    }
  };

  const [selectedDate, setSelectedDate] = useState(new Date());
  const datePicker = (date) => {
    setTrainignSend({ ...trainingSend, date: date._d });
    setSelectedDate(date._d);
  };

  const reNewStates = (event) => {
    setSelect(event);
    if (event === null) {
      console.log("its nul man");
    } else {
      setTrainignSend({ ...trainingSend, customer: event.links[1].href });
    }
  };
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const [opensnack, setOpensnack] = useState(false);

  const closeSnack = () => [setOpensnack(false)];

  return (
    <div
      style={{
        height: "30%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
      }}
    >
      {open && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid grey",
            borderRadius: "10px",
            padding: "10px",
            width: "80%",
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
            value={trainingSend.activity}
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
            value={trainingSend.duration}
            onChange={handleNumber}
            label="Duration(min)"
            type="number"
            InputProps={{ inputProps: { min: 15, max: 600 } }}
            InputLabelProps={{
              shrink: true,
            }}
            error={numError}
            helperText={numError ? "Required 4-20chars" : "Required"}
          />

          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DateTimePicker
              margin="normal"
              size="small"
              value={selectedDate}
              onChange={(date) => datePicker(date)}
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
      <button onClick={() => setOpen(!open)}>Open THis shitfl</button>
    </div>
  );
}
