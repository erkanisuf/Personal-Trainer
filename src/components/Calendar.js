import React, { useContext, useState, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { MyContext } from "../Context/Context";
import moment from "moment";

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

  const handleSelect = ({ start, end }) => {
    const title = window.prompt("New Event name");
    if (title) setEvents([...events, { title: title, start: start, end: end }]);
  };
  return (
    <div>
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
