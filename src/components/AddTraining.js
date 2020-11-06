import React, { useState, useContext, useEffect } from "react";
import { MyContext } from "../Context/Context";
import TextField from "@material-ui/core/TextField";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
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

const AddTraining = ({ customer }) => {
  const classes = useStyles();
  const { valueTwo } = useContext(MyContext);
  const [, setTrain] = valueTwo;

  const [trainingSend, setTrainignSend] = useState({
    date: new Date(),
    duration: 15,
    activity: "",
    customer: customer.links[1].href,
  });

  console.log(trainingSend);
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
    if (actError || numError) {
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
          reFetchTrains();
        })
        .catch((err) => console.error(err));
    }
  };

  const reFetchTrains = () => {
    fetch("https://customerrest.herokuapp.com/api/trainings", {
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
        setTrain(data.content);
      })
      .catch((err) => console.error(err));
  };
  const [selectedDate, setSelectedDate] = useState(new Date());
  const datePicker = (date) => {
    setTrainignSend({ ...trainingSend, date: date._d });
    setSelectedDate(date._d);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        border: "1px solid grey",
        borderRadius: "10px",
        padding: "10px",
        width: "100%",
        margin: "10px auto",
      }}
    >
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
          style={{ marginTop: "15px" }}
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
    </div>
  );
};

export default AddTraining;
