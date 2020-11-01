import React, { useContext, useState } from "react";
import { MyContext } from "../Context/Context";
import { AgGridReact } from "ag-grid-react";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import { makeStyles } from "@material-ui/core/styles";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import ModalCustomers from "./ModalCustomers";
import Confirm from "./Confirm";
import AddCustomer from "./AddCustomer";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    width: "100px",
    fontSize: "10px",
    padding: "5px",
    backgroundColor: "#8a1c1c",
    "&:hover": {
      backgroundColor: "#f44336",
    },
  },
  green: {
    margin: theme.spacing(1),
    width: "100px",
    fontSize: "10px",
    padding: "5px",
    backgroundColor: "#3b6120",
    "&:hover": {
      backgroundColor: "#4caf50",
    },
  },

  yellow: {
    margin: theme.spacing(1),
    width: "50px",
    fontSize: "10px",
    padding: "5px",
    backgroundColor: "#6e6d19",
    "&:hover": {
      backgroundColor: "#ffc107",
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(0),
  },
}));

const Customers = () => {
  const classes = useStyles();

  const { valueOne } = useContext(MyContext);

  const [customers, setCustomers] = valueOne;

  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const [deleteCustomer, setDeleteCustomer] = useState("");
  const [training, setTraining] = useState([]);
  const [selfCustomer, setSelfCustomer] = useState({});
  console.log(customers, "customersJS");

  const fetchCustomerTraining = (param) => {
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
        console.log(data.content, "data");
        setTraining(data.content);
      })
      .catch((err) => console.error(err));
  };

  const fetchCustomerSelf = (param) => {
    fetch(`${param}`, {
      credentials: "same-origin",
      headers: {
        accept: "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data, "self");
        setSelfCustomer(data);
      })
      .catch((err) => console.error(err));
  };
  const reFetch = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data.content);
      })
      .catch((err) => console.error(err));
  };

  const fetchDelete = (param) => {
    fetch(`${param}`, { method: "DELETE" })
      .then((data) => {
        console.log(data, "deleted");
        reFetch();
      })
      .catch((err) => console.error(err));
  };

  const handleClick = (param) => {
    //Modal
    console.log(param.value[2].href, "clickhref");
    fetchCustomerTraining(param.value[2].href);
    fetchCustomerSelf(param.value[0].href);
    setOpen(true);
  };

  const handleDeleteItem = () => {
    console.log("i delete this: ", deleteCustomer);
    fetchDelete(deleteCustomer);
    setOpenDialog(false);
  };

  const handleClose = () => {
    //Modal Open
    setOpen(false);
  };
  const handleOpenDialog = (param) => {
    console.log(param.value);
    // Yes No
    setOpenDialog(true);
    setDeleteCustomer(param.value[1].href);
    fetchCustomerSelf(param.value[0].href);
  };

  const handleCloseDialog = () => {
    // Yes No
    setOpenDialog(false);
  };

  const columns = [
    {
      headerName: "Customers",
      resizable: true,
      children: [
        {
          headerName: "FirstName",
          field: "firstname",
          sortable: true,
          filter: true,
          floatingFilter: true,

          resizable: true,
        },
        {
          headerName: "LastName",
          field: "lastname",
          sortable: true,
          filter: true,
          floatingFilter: true,
          resizable: true,
        },
      ],
    },

    {
      headerName: "Contacts",
      resizable: true,
      children: [
        {
          headerName: "Email",
          field: "email",
          sortable: true,
          filter: true,
          floatingFilter: true,
          resizable: true,
        },
        {
          headerName: "Phone",
          field: "phone",
          sortable: true,
          filter: true,
          floatingFilter: true,
          resizable: true,
        },
        {
          headerName: "City",
          field: "city",
          sortable: true,
          filter: true,
          floatingFilter: true,
          resizable: true,
        },
        {
          headerName: "Adress",
          field: "streetaddress",
          sortable: true,
          filter: true,
          floatingFilter: true,
          resizable: true,
        },
        {
          headerName: "PostCode",
          field: "postcode",
          sortable: true,
          filter: true,
          floatingFilter: true,
          resizable: true,
        },
      ],
    },
    {
      headerName: "Actions",
      resizable: true,
      children: [
        {
          headerName: "Action",
          field: "links",
          resizable: true,
          width: 500,

          cellRendererFramework: (param) => (
            <div>
              <Button
                startIcon={<FitnessCenterIcon />}
                className={classes.green}
                variant="contained"
                color="primary"
                onClick={() => handleClick(param)}
              >
                Trainings
              </Button>
              <Button
                startIcon={<EditIcon />}
                className={classes.yellow}
                variant="contained"
                color="secondary"
              >
                Edit
              </Button>
              <Button
                startIcon={<DeleteIcon />}
                className={classes.margin}
                variant="contained"
                color="secondary"
                onClick={() => handleOpenDialog(param)}
              >
                Delete
              </Button>
            </div>
          ),
        },
      ],
    },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 800, width: "100%" }}>
      <AddCustomer />
      <AgGridReact
        pagination={true}
        paginationAutoPageSize={true}
        animateRows={true}
        rowData={customers}
        columnDefs={columns}
      ></AgGridReact>
      <ModalCustomers
        open={open}
        handleClose={handleClose}
        training={training}
        user={selfCustomer}
      />
      <Confirm
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        handleDeleteItem={handleDeleteItem}
        user={selfCustomer}
      />
    </div>
  );
};

export default Customers;
