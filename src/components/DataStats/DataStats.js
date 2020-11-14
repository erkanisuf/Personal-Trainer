import React, { useContext, useState, useEffect } from "react";

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
import { MyContext } from "../../Context/Context";
import _ from "lodash";
import moment from "moment";
import ByUser from "./ByUser";
import Paper from "@material-ui/core/Paper";

const DataStats = () => {
  const { valueTwo } = useContext(MyContext);

  const [trainings] = valueTwo;

  let byTrain = _(trainings)
    .groupBy("activity")
    .map((objs, key) => ({
      activity: key,
      duration: _.sumBy(objs, "duration"),
    }))
    .value();

  const [byDate, setByDate] = useState(null);

  useEffect(() => {
    const dataByDate = () => {
      const copyArr = [...trainings];
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
      setByDate(againGroup);
    };
    dataByDate();
  }, [trainings]);
  return (
    <div>
      <h1>Data Stats</h1>
      <h3>Total Minutes (for each activity)</h3>
      <Paper elevation={5}>
        <ResponsiveContainer
          width={window.innerWidth <= 480 ? "100%" : "80%"}
          height={450}
        >
          <BarChart
            data={byTrain}
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
        <h3>Total Minutes (by Date)</h3>
        <ResponsiveContainer
          width={window.innerWidth <= 480 ? "100%" : "80%"}
          height={450}
        >
          <BarChart
            data={byDate}
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
      <ByUser />
    </div>
  );
};

export default DataStats;
