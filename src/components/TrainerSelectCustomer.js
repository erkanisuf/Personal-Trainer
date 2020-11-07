/* eslint-disable no-use-before-define */
import React, { useState, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { MyContext } from "../Context/Context";

export default function TrainerSelectCustomer() {
  const { valueOne } = useContext(MyContext);

  const [customers] = valueOne;
  const [select, setSelect] = useState({});
  console.log(select);
  return (
    <Autocomplete
      id="combo-box-demo"
      options={customers}
      getOptionLabel={(customers) => customers.firstname}
      style={{ width: 300 }}
      onChange={(prop, event) => setSelect(event)}
      renderInput={(params) => (
        <TextField {...params} label="Combo box" variant="outlined" />
      )}
    />
  );
}
