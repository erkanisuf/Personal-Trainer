import React, { useContext, useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { MyContext } from "../../Context/Context";
import CustomerTrain from "./CustomerTrain";
import NewTraining from "./NewTraining";
import LinearProgress from "@material-ui/core/LinearProgress";
import Moment from "react-moment";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";
import ConfirmAll from "./ConfirmAll";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  fitnessicon: {
    margin: theme.spacing(1),
    marginLeft: window.innerWidth <= 480 ? "15px" : "400px",
    width: "160px",
    fontSize: "14px",
    padding: "5px",
    height: "40px",
    float: "right",
    alignSelf: window.innerWidth <= 480 ? "center" : "flex-end",
    justifySelf: window.innerWidth <= 480 ? "center" : "flex-end",
    order: window.innerWidth <= 480 ? "1" : "",
    color: "white",
    backgroundColor: "#3b6120",
    "&:hover": {
      backgroundColor: "#4caf50",
    },
  },
  cancel: {
    margin: theme.spacing(1),
    marginLeft: window.innerWidth <= 480 ? "15px" : "400px",
    width: "1%",
    fontSize: "25px",
    padding: "1px",
    height: "60px",
    order: window.innerWidth <= 480 ? "1" : "",
    borderRadius: "50%",
    alignSelf: "center",
    color: "grey",

    "&:hover": {
      color: "red",
    },
  },
}));

const Trainings = () => {
  const classes = useStyles();
  const { valueOne, valueTwo, valueThree } = useContext(MyContext);
  const [customer] = valueOne;
  const [contexTrain] = valueTwo;
  const [rows, setRows] = useState([]);

  const [value, setValue] = useState("");
  const [errorFilter, seterrorFilter] = useState(false);
  useEffect(() => {
    const addIdtoTrainings = () => {
      const createArr = [];

      const find = contexTrain.filter(
        (key) =>
          key.activity
            .toLowerCase()
            .trim()
            .indexOf(value.toLowerCase().trim()) !== -1
      );

      if (find.length === 0) {
        seterrorFilter(true);
      } else {
        const newArrayMake = find.map((key, index) => {
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
        seterrorFilter(false);
      }
    };
    addIdtoTrainings();
  }, [contexTrain, customer, value]);

  // renderCell: (param) => (
  //   <LinearProgress variant="determinate" value={50} />
  // ),
  const normalise = (value) => ((value - 15) * 100) / (240 - 15);
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
              value={normalise(param.value)}
              style={{
                height: "50%",
                width: "100%",
                alignSelf: "center",
                margin: "5px",
              }}
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
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
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
            height: 500,
            width: window.innerWidth <= 480 ? "100%" : "90%",
            margin: "0 auto",
          }}
        >
          <h1>Trainings</h1>
          <NewTraining open={open} handleOpen={handleOpen} />
          <div
            style={{
              display: "flex",
              flexDirection: window.innerWidth <= 480 ? "column" : "row",
              justifyContent:
                window.innerWidth <= 480 ? "center" : "space-evenly",
              alignItems: "center",

              margin: "0 auto",

              width: "100%",
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon />}
              aria-label="Delete selected"
              onClick={deleteSelected}
              style={{
                order: window.innerWidth <= 480 ? "2" : "",
                marginTop: "20px ",
                marginLeft: "15px",
                marginRight: "5px",
                width: "155px",
                fontSize: "10px",
                height: "30px",
              }}
            >
              Delete Selected
            </Button>

            <TextField
              style={{
                width: "300px",
                order: window.innerWidth <= 480 ? "3" : "",
              }}
              label="Filter Activity"
              margin="normal"
              variant="outlined"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              size="small"
            />
            {errorFilter && (
              <span
                style={{
                  color: "red",
                  marginTop: "25px",
                  order: window.innerWidth <= 480 ? "4" : "",
                }}
              >
                Not found items with keyword:{" "}
                <b>
                  <u>{value}</u>
                </b>
              </span>
            )}
            <Button
              startIcon={
                !open ? (
                  <FitnessCenterIcon />
                ) : (
                  <CancelPresentationIcon style={{ transform: "scale(2)" }} />
                )
              }
              aria-label="Add"
              className={!open ? classes.fitnessicon : classes.cancel}
              onClick={handleOpen}
            >
              {!open ? "New Training" : ""}
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
          <DataGrid
            rows={rows}
            onSelectionChange={(param) => handleSelectedRows(param)}
            columns={columns}
            pageSize={5}
            checkboxSelection
            autoPageSize={true}
          />
        </div>
      </div>
    );
  }
};

export default Trainings;
