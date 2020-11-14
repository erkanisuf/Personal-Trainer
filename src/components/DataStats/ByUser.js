import React, { useState, useContext, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { MyContext } from "../../Context/Context";
import _ from "lodash";
import moment from "moment";
import Divider from "@material-ui/core/Divider";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import Paper from "@material-ui/core/Paper";

const ByUser = () => {
  const { valueOne } = useContext(MyContext);

  const [customers] = valueOne;
  const [workArray, setWorkArray] = useState(null);
  const [select, setSelect] = useState(null);
  console.log(workArray);
  const fetchTrainingData = (param) => {
    fetch(`${param}`, {
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
        setWorkArray(data);
      })
      .catch((err) => console.error(err));
  };

  const reNewStates = (prop, event) => {
    console.log(prop, "prop");
    if (prop !== null) {
      fetchTrainingData(prop.links[2].href);
    } else {
      setAllTrain(null);
      setData(null);
      setDataDate(null);
    }

    setSelect(prop);
  };
  const [allTrain, setAllTrain] = useState(null);
  const [data, setData] = useState(null);
  const [dataDate, setDataDate] = useState(null);
  useEffect(() => {
    if (workArray !== null && workArray.content[0].date) {
      let byAll = _([...workArray.content])
        .groupBy("activity")
        .map((objs, key) => ({
          activity: key,
          duration: objs[0].duration,
        }))
        .value();
      setAllTrain(byAll);

      let byTrain = _([...workArray.content])
        .groupBy("activity")
        .map((objs, key) => ({
          activity: key,
          duration: _.sumBy(objs, "duration"),
        }))
        .value();
      console.log(byTrain);
      setData(byTrain);

      const copyArr = [...workArray.content];
      let byDate = _(copyArr)
        .groupBy("date")
        .map((objs, key) => ({
          date: moment(key).format("MMM Do YY"),
          duration: _.sumBy(objs, "duration"),
        }))
        .value();

      let againGroup = _([...byDate])
        .groupBy("date")
        .map((objs, key) => ({
          date: key,
          duration: _.sumBy(objs, "duration"),
        }))
        .value();
      setDataDate(againGroup);
    } else {
      console.log("No Data");
      setDataDate(null);
      setData(null);
    }
  }, [customers, workArray]);

  return (
    <div
      style={{
        border: "1px solid grey",
        borderRadius: "25px",
        backgroundColor: "#fafafa",
        margin: "25px 0",
        padding: "15px",
      }}
    >
      <h1>Select User Data Stats</h1>
      <Autocomplete
        id="combo-box-demo"
        value={select}
        options={customers}
        getOptionLabel={(cust) =>
          `${cust.firstname}, ${cust.lastname}, ${cust.phone}`
        }
        style={{
          width: window.innerWidth <= 480 ? 300 : 500,
          margin: "0 auto",
        }}
        onChange={(prop, event) => reNewStates(event)}
        renderInput={(params) => (
          <TextField
            {...params}
            style={{ backgroundColor: "white" }}
            label="Select Customer"
            variant="outlined"
            margin="normal"
            size="small"
          />
        )}
      />
      {data !== null ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Paper elevation={3} style={{ margin: "15px 0", padding: "15px" }}>
            <h4>User`s All trainings and durations</h4>
            <ResponsiveContainer width={"100%"} height={300}>
              <BarChart
                data={allTrain}
                margin={{
                  top: 5,
                  right: 30,
                  left: window.innerWidth <= 480 ? 0 : 50,
                  bottom: 15,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="activity"
                  label={{ value: "Activities", position: "bottom", offset: 2 }}
                />
                <YAxis
                  dataKey="duration"
                  label={{
                    value: "Total Minutes",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />

                <Tooltip />
                <Legend verticalAlign="top" />
                <Bar dataKey="duration" fill="#1b5e20">
                  <LabelList dataKey="duration" position="top" />
                </Bar>
                <Bar dataKey="activity" fill="#ff1744" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
          <Divider />
          <Paper elevation={3} style={{ margin: "15px 0", padding: "15px" }}>
            <h4>User`s Total Minutes (for each activity)</h4>
            <ResponsiveContainer width={"100%"} height={300}>
              <BarChart
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: window.innerWidth <= 480 ? 0 : 50,
                  bottom: 15,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="activity"
                  label={{ value: "Activities", position: "bottom", offset: 2 }}
                />
                <YAxis
                  dataKey="duration"
                  label={{
                    value: "Total Minutes",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />

                <Tooltip />
                <Legend verticalAlign="top" />
                <Bar dataKey="duration" fill="#1b5e20">
                  <LabelList dataKey="duration" position="top" />
                </Bar>
                <Bar dataKey="activity" fill="#ff1744" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
          <Divider />

          <Paper elevation={3} style={{ margin: "15px 0", padding: "15px" }}>
            <h4>User`s Total Minutes (by Date)</h4>
            <ResponsiveContainer width={"100%"} height={450}>
              <BarChart
                data={dataDate}
                margin={{
                  top: 5,
                  right: 30,
                  left: window.innerWidth <= 480 ? 0 : 50,
                  bottom: 15,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  label={{ value: "Date", position: "bottom", offset: 2 }}
                />
                <YAxis
                  dataKey="duration"
                  label={{
                    value: "Total Minutes",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />

                <Tooltip />
                <Legend verticalAlign="top" />
                <Bar dataKey="duration" fill="#1b5e20">
                  <LabelList dataKey="duration" position="top" />
                </Bar>
                <Bar dataKey="date" fill="#ff1744" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </div>
      ) : select !== null ? (
        <div
          style={{ color: "red" }}
        >{`${select.firstname},${select.lastname} -Has no Data of Trainings !`}</div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ByUser;
