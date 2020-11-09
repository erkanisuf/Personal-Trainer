import React, { useContext, useState, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { MyContext } from "../../Context/Context";
import moment from "moment";
import CalendarNewTrain from "./CalendarNewTrain";

const localizer = momentLocalizer(moment);
const CalendarJS = () => {
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
          resource: [],
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
    customer: null,
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
  return (
    <div>
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
          onSelectEvent={(event) => alert(event.title)}
          onSelectSlot={handleSelect}
          selectable={true}
        />
      )}
      <h1>Calendar</h1>
    </div>
  );
};

export default CalendarJS;
