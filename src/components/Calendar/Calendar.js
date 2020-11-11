import React, { useContext, useState, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { MyContext } from "../../Context/Context";
import moment from "moment";
import CalendarNewTrain from "./CalendarNewTrain";
import Button from "@material-ui/core/Button";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import { makeStyles } from "@material-ui/core/styles";

import OnclickTrain from "./OnclickTrain";
const localizer = momentLocalizer(moment);

const useStyles = makeStyles((theme) => ({
  fitnessicon: {
    margin: theme.spacing(1),
    marginLeft: "400px",
    width: "160px",
    fontSize: "14px",
    padding: "5px",
    height: "40px",

    alignSelf: "flex-end",
    justifySelf: "flex-end",

    color: "white",
    backgroundColor: "#3b6120",
    "&:hover": {
      backgroundColor: "#4caf50",
    },
  },
}));
const CalendarJS = () => {
  const classes = useStyles();
  const { valueTwo } = useContext(MyContext);
  const [train] = valueTwo;

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const makeCalendarArray = () => {
      const createArr = [];
      const newArrayMake = train.map((key) => {
        const endDate = new Date(key.date);
        endDate.setMinutes(endDate.getMinutes() + key.duration);

        const newObject = {
          title: key.activity,
          start: new Date(key.date),
          end: endDate,
          allDay: false,
          resource: key.links,
        };
        createArr.push(newObject);
        return newObject;
      });

      setEvents(newArrayMake);
    };
    makeCalendarArray();
  }, [train]);
  console.log(train);

  const [open, setOpen] = useState(false);
  const [startvalue, setStartValue] = useState({
    date: new Date(),
    duration: 69,
    activity: "",
    customer: "",
  });
  const handleTrainignText = (e) => {
    setStartValue({ ...startvalue, activity: e.target.value });
  };
  const datePicker = (date) => {
    setStartValue({
      ...startvalue,

      date: date._d,
    });
  };
  const handleNumber = (e) => {
    setStartValue({ ...startvalue, duration: parseInt(e.target.value) });
  };
  const handleSelect = (param) => {
    console.log(param);
    const calculate = param.end - param.start;
    const calculateTwo = calculate / 60000;
    setStartValue({
      ...startvalue,
      activity: "",
      date: param.start,
      duration: calculateTwo,
    });
    setOpen(true);

    console.log(calculateTwo);
  };

  const [select, setSelect] = useState(null);
  const reNewStates = (event) => {
    setSelect(event);
    if (event === null) {
      console.log("its nul man");
    } else {
      setStartValue({ ...startvalue, customer: event.links[1].href });
    }
  };

  ////NEW TRAIN///
  const handleClose = () => {
    setStartValue({
      ...startvalue,
      activity: "",
      date: new Date(),
      duration: 15,
      customer: null,
    });
    setOpen(false);
  };
  ////NEW TRAIN///

  ////// Onclick on Trainings Opens Window
  const [opneningObj, setopeningObj] = useState({ resource: ["", "", ""] });
  const [openOnclick, setopenOnclick] = useState(false);
  const handleCloseOnclick = () => {
    setopenOnclick(false);
  };
  const onSelectEvent = (param) => {
    console.log(param);
    setopenOnclick(true);
    setopeningObj(param);
  };

  /////
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <OnclickTrain
        handleCloseOnclick={handleCloseOnclick}
        openOnclick={openOnclick}
        opneningObj={opneningObj}
      />
      <Button
        onClick={() => setOpen(true)}
        color="primary"
        variant="outlined"
        className={classes.fitnessicon}
        startIcon={<FitnessCenterIcon />}
      >
        New Training
      </Button>
      <CalendarNewTrain
        open={open}
        startvalue={startvalue}
        datePicker={datePicker}
        handleNumber={handleNumber}
        handleClose={handleClose}
        handleTrainignText={handleTrainignText}
        reNewStates={reNewStates}
        select={select}
      />
      {train && (
        <Calendar
          localizer={localizer}
          events={events}
          style={{ height: 500 }}
          step={60}
          defaultDate={new Date(2020, 10, 6)}
          startAccessor="start"
          endAccessor="end"
          showMultiDayTimes
          onSelectEvent={onSelectEvent}
          onSelectSlot={handleSelect}
          selectable={true}
        />
      )}
      <h1>Calendar</h1>
    </div>
  );
};

export default CalendarJS;
