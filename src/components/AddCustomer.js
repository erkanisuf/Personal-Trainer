import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import React, { useState, useContext } from "react";
import { MyContext } from "../Context/Context";

const useStyles = makeStyles((theme) => ({
  green: {
    margin: theme.spacing(1),
    width: "160px",
    fontSize: "14px",
    padding: "5px",
    backgroundColor: "#3b6120",
    "&:hover": {
      backgroundColor: "#4caf50",
    },
  },
  newcustomer: {
    margin: theme.spacing(1),
    width: "160px",
    fontSize: "12px",
    padding: "15px",
    height: "50px",
    alignSelf: "flex-end",
    backgroundColor: "#3b6120",
    "&:hover": {
      backgroundColor: "#4caf50",
    },
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function FormDialog({ customers, handleSearch, searchBar }) {
  const classes = useStyles();
  const { valueOne } = useContext(MyContext);

  const [, setCustomers] = valueOne;
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    city: "",
    email: "",
    phone: "",
    streetaddress: "",
    postcode: "",
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (form[e.target.name].length <= 4 || form[e.target.name].length >= 12) {
      console.log("First name beween 4-12");
      setErrorBool({ ...errorBool, [e.target.name]: true });
    } else {
      console.log("good man");
      setErrorBool({ ...errorBool, [e.target.name]: false });
    }
    // if (form.firstname.value.length <= 4 || form.firstname.value.length >= 12) {
    //   setErrorBool({ ...errorBool, firstname: true });
    // } else {
    //   setErrorBool({ ...errorBool, firstname: true });
    // }

    // if (
    //   errorBool.firstname ||
    //   errorBool.lastname ||
    //   errorBool.city ||
    //   errorBool.email ||
    //   errorBool.phone ||
    //   errorBool.streetaddress ||
    //   errorBool.postcode
    // ) {
    //   // setSend(false);
    // } else {
    //   // setSend(true);
    // }
  };
  // const [send, setSend] = useState(false);

  const [errorBool, setErrorBool] = useState({
    firstname: false,
    lastname: false,
    city: false,
    email: false,
    phone: false,
    streetaddress: false,
    postcode: false,
  });

  const reFetch = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data.content);
      })
      .catch((err) => console.error(err));
  };

  const fetchAddNewCustomer = () => {
    if (form.firstname.length <= 4 || form.firstname.length >= 12) {
      console.log("First name beween 4-12");
      setErrorBool({ ...errorBool, firstname: true });
    }
    if (form.lastname.length <= 4 || form.lastname.length >= 12) {
      console.log("LastName name beween 4-12");
      setErrorBool({ ...errorBool, lastname: true });
    }
    if (form.phone.length <= 4 || form.phone.length >= 12) {
      console.log("Phone required 4-12");
      setErrorBool({ ...errorBool, phone: true });
    }
    if (form.email.length <= 4 || form.email.length >= 12) {
      console.log("email required 4-12");
      setErrorBool({ ...errorBool, email: true });
    } else {
      console.log("good man");
    }
    // fetch(`https://customerrest.herokuapp.com/api/customers`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(form),
    // })
    //   .then((key) => console.log("key", key))
    //   .then((key) => {
    //     console.log("Succ", key);
    //     reFetch();
    //     setOpen(false);
    //   })
    //   .catch((err) => console.error(err));
  };
  return (
    <div>
      <Grid
        container
        justify="flex-end"
        alignItems="flex-end"
        style={{ width: "90%", margin: "15px" }}
      >
        <div
          style={{
            width: "100%",

            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <TextField
            style={{ width: "300px" }}
            label="Filter Field"
            margin="normal"
            variant="outlined"
            value={searchBar}
            onChange={handleSearch}
            size="small"
          />

          <Button
            startIcon={<AddIcon />}
            className={classes.newcustomer}
            variant="contained"
            color="primary"
            onClick={handleClickOpen}
          >
            New Customer
          </Button>
        </div>
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Customer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill all fields in order to add a new Member.
          </DialogContentText>
          <TextField
            onChange={handleForm}
            autoFocus
            margin="dense"
            id="firstname"
            name="firstname"
            label="First Name"
            type="text"
            error={errorBool.firstname}
            helperText={
              errorBool.firstname.bool ? "Required 4-12chars" : "Required"
            }
            fullWidth
          />
          <TextField
            onChange={handleForm}
            margin="dense"
            id="lastname"
            name="lastname"
            label="Last Name"
            type="text"
            error={errorBool.lastname}
            helperText={errorBool.lastname ? "Required 4-12chars" : "Required"}
            fullWidth
          />
          <TextField
            onChange={handleForm}
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            error={errorBool.email}
            helperText={errorBool.email ? "Required 4-12chars" : "Required"}
            fullWidth
          />
          <div
            className={classes.root}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TextField
              onChange={handleForm}
              margin="dense"
              id="phone"
              name="phone"
              label="Phone"
              type="phone"
              error={errorBool.phone}
              helperText={errorBool.phone ? "Required 4-12chars" : "Required"}
              fullWidth
            />
            <TextField
              onChange={handleForm}
              margin="dense"
              id="city"
              name="city"
              label="City"
              type="text"
              fullWidth
            />
            <TextField
              onChange={handleForm}
              margin="dense"
              id="streetaddress"
              name="streetaddress"
              label="Street"
              type="text"
              fullWidth
            />
            <TextField
              onChange={handleForm}
              margin="dense"
              id="postcode"
              name="postcode"
              label="PostCode"
              type="text"
              fullWidth
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            startIcon={<PlaylistAddCheckIcon />}
            variant="contained"
            color="primary"
            className={classes.green}
            onClick={fetchAddNewCustomer}
          >
            Add Customer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
