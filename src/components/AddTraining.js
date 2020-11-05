import React, { useState, useContext } from "react";
import { MyContext } from "../Context/Context";
import TextField from "@material-ui/core/TextField";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";

const AddTraining = ({ customer }) => {
  const { valueTwo } = useContext(MyContext);
  const [, setTrain] = valueTwo;
  const [dateI, setdateI] = useState("");
  const [trainingText, settrainingText] = useState("");
  const handleTrainignText = (e) => {
    settrainingText(e.target.value);
  };

  const addNewTraining = () => {
    console.log("NOW SENDS MAN");
    fetch(`https://customerrest.herokuapp.com/api/trainings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: dateI,
        duration: 69,
        activity: "doesitwork",
        customer: customer.links[1].href,
      }),
    })
      .then((key) => console.log("key", key))
      .then((key) => {
        console.log("Succ", key);
        reFetchTrains();
      })
      .catch((err) => console.error(err));
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
    // const kur = date._d;
    // kur.setMinutes(kur.getMinutes() + 30);
    // console.log(kur); Tova shte go Izpolzvam za Kalendara !!
    setdateI(date._d);
    setSelectedDate(date._d);
  };
  console.log(customer, "inside addcust ");
  return (
    <div>
      <input type="text" value={trainingText} onChange={handleTrainignText} />

      <button onClick={addNewTraining}>Add Training</button>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DateTimePicker
          value={selectedDate}
          onChange={(date) => datePicker(date)}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default AddTraining;
