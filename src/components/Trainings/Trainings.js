import React, { useContext, useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { MyContext } from "../../Context/Context";
import CustomerTrain from "./CustomerTrain";
import NewTraining from "./NewTraining";
const Trainings = () => {
  const { valueOne, valueTwo, valueThree } = useContext(MyContext);
  const [customer] = valueOne;
  const [contexTrain] = valueTwo;
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const addIdtoTrainings = () => {
      const createArr = [];

      const newArrayMake = contexTrain.map((key, index) => {
        const newObject = {
          id: index + 1,
          activity: key.activity,
          duration: key.duration,
          date: key.date,
          customer: key.links[2].href,
          links: key.links,
        };

        createArr.push(newObject);

        return newObject;
      });
      console.log(createArr);
      setRows(newArrayMake);
    };
    addIdtoTrainings();
  }, [contexTrain, customer]);

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "activity", headerName: "Activity", width: 200 },
    { field: "duration", headerName: "Duration(min)", width: 200 },
    { field: "date", headerName: "Date", width: 300 },
    {
      field: "customer",
      headerName: "Customer",
      width: 300,
      renderCell: (param) => <CustomerTrain customer={param.value} />,
    },
  ];

  const handleSelectedRows = (param) => {
    const rows = [];
    param.rows.map((key) => {
      return rows.push(key.links[1].href);
    });
    setSelectedRows(rows);
  };
  const [selectedRows, setSelectedRows] = useState([]);
  console.log(selectedRows, "stateSELECTED");

  const deleteAllArray = (param) => {
    return Promise.all(
      param.map((url) =>
        fetch(url, { method: "DELETE" })
          .then((response) => console.log(response))
          .then((responseData) => {
            console.log(responseData, "2ndresp");
            valueThree();
          })
          .catch((err) => console.error(err))
      )
    ).then((responseData) => {
      console.log(responseData);
    });
  };

  const deleteSelected = () => {
    deleteAllArray(selectedRows);
    console.log("DELETESELECTED");
  };

  if (!rows[0]) {
    return <p>Loading....</p>;
  } else {
    return (
      <div
        style={{
          height: 400,
          width: window.innerWidth <= 480 ? "100%" : "80%",
          margin: "0 auto",
        }}
      >
        <button onClick={deleteSelected}>DELETE SELECTED</button>
        <NewTraining />
        <DataGrid
          rows={rows}
          onSelectionChange={(param) => handleSelectedRows(param)}
          columns={columns}
          pageSize={5}
          checkboxSelection
        />
      </div>
    );
  }
};

export default Trainings;
