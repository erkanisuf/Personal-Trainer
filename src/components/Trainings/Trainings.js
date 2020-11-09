import React, { useContext, useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { MyContext } from "../../Context/Context";
import CustomerTrain from "./CustomerTrain";
import NewTraining from "./NewTraining";
import LinearProgress from "@material-ui/core/LinearProgress";
import Moment from "react-moment";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

import ConfirmAll from "./ConfirmAll";

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

  // renderCell: (param) => (
  //   <LinearProgress variant="determinate" value={50} />
  // ),
  const columns = [
    { field: "id", headerName: "ID" },

    { field: "activity", headerName: "Activity", width: 200 },
    {
      field: "duration",
      headerName: "Duration",
      width: 200,
      renderCell: (param) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              height: "100%",
              width: "100%",
            }}
          >
            {param.value + " - min"}
            <LinearProgress
              variant="determinate"
              value={param.value}
              style={{ height: "100%", width: "100%" }}
            />
          </div>
        );
      },
    },
    {
      field: "date",
      headerName: "Date",
      width: 300,
      renderCell: (param) => (
        <Moment format=" DD/MM/YYYY,h:mm:ss a">{param.value}</Moment>
      ),
    },
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
            setOpenDialog(false);
            setOpensnack(true);
            valueThree();
          })
          .catch((err) => console.error(err))
      )
    ).then((responseData) => {
      console.log(responseData);
    });
  };

  const deleteSelected = () => {
    if (selectedRows.length === 0) {
      alert("Please select Atleast one row !");
    } else {
      setOpenDialog(true);
    }
  };
  const [opensnack, setOpensnack] = useState(false);

  const closeSnack = () => setOpensnack(false);

  const [openDialog, setOpenDialog] = useState(false);
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  if (!rows[0]) {
    return <p>Loading....</p>;
  } else {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            height: 450,
            width: window.innerWidth <= 480 ? "100%" : "90%",
            margin: "0 auto",
          }}
        >
          <NewTraining />
          <DataGrid
            rows={rows}
            onSelectionChange={(param) => handleSelectedRows(param)}
            columns={columns}
            pageSize={5}
            checkboxSelection
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginTop: "25px",
            width: "500px",
            alignItems: "flex-start",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            aria-label="Delete selected"
            onClick={deleteSelected}
            style={{ marginLeft: "80px" }}
          >
            Delete Selected
          </Button>
          <ConfirmAll
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
            handleDeleteItem={() =>
              selectedRows.length === 0
                ? alert("Please Select Rows")
                : deleteAllArray(selectedRows)
            }
            opensnack={opensnack}
            closeSnack={closeSnack}
          />
        </div>
      </div>
    );
  }
};

export default Trainings;
