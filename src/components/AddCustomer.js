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
import React, { useState, useContext, useEffect } from "react";
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
  const { valueThree } = useContext(MyContext);

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
    setErrorBool({
      firstname: true,
      lastname: true,
      city: true,
      email: true,
      phone: true,
      streetaddress: true,
      postcode: true,
    });
    setForm({
      firstname: "",
      lastname: "",
      city: "",
      email: "",
      phone: "",
      streetaddress: "",
      postcode: "",
    });
  };

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form[e.target.name].length);
    if (
      form[e.target.name].length >= 3 &&
      form[e.target.name].length < 20 &&
      e.target.value !== ""
    ) {
      setErrorBool({ ...errorBool, [e.target.name]: false });
    } else {
      setErrorBool({ ...errorBool, [e.target.name]: true });
    }
  };
  const [errorBool, setErrorBool] = useState({
    firstname: true,
    lastname: true,
    email: true,
    phone: true,
    streetaddress: true,
    postcode: true,
    city: true,
  });
  useEffect(() => {
    const formErrorsCHeck = () => {
      if (form.firstname.length >= 3 && form.firstname.length < 20) {
        setErrorBool({
          ...errorBool,
          firstname: false,
        });
      }
      if (form.lastname.length >= 3 && form.lastname.length < 20) {
        setErrorBool({
          ...errorBool,

          lastname: false,
        });
      }
      if (form.email.length >= 3 && form.email.length < 20) {
        setErrorBool({
          ...errorBool,

          email: false,
        });
      }
      if (form.phone.length >= 3 && form.phone.length < 20) {
        setErrorBool({
          ...errorBool,

          phone: false,
        });
      }
      if (form.city.length >= 3 && form.city.length < 20) {
        setErrorBool({
          ...errorBool,

          city: false,
        });
      }
      if (form.streetaddress.length >= 3 && form.streetaddress.length < 20) {
        setErrorBool({
          ...errorBool,

          streetaddress: false,
        });
      }

      if (form.postcode.length >= 3 && form.postcode.length < 20) {
        setErrorBool({
          ...errorBool,
          postcode: false,
        });
      }
    };
    formErrorsCHeck();
  }, [form]);

  const fetchAddNewCustomer = () => {
    if (
      errorBool.firstname ||
      errorBool.lastname ||
      errorBool.email ||
      errorBool.phone ||
      errorBool.streetaddress ||
      errorBool.postcode ||
      errorBool.city
    ) {
      console.log("error");
    } else {
      console.log("can send");
      sendAfterForm();
    }
  };
  const sendAfterForm = () => {
    console.log("NOW SENDS MAN");
    fetch(`https://customerrest.herokuapp.com/api/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((key) => console.log("key", key))
      .then((key) => {
        console.log("Succ", key);
        setErrorBool({
          firstname: true,
          lastname: true,
          city: true,
          email: true,
          phone: true,
          streetaddress: true,
          postcode: true,
        });
        setForm({
          firstname: "",
          lastname: "",
          city: "",
          email: "",
          phone: "",
          streetaddress: "",
          postcode: "",
        });
        valueThree();
        setOpen(false);
      })
      .catch((err) => console.error(err));
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
            helperText={errorBool.firstname ? "Required 4-20chars" : "Required"}
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
            helperText={errorBool.lastname ? "Required 4-20chars" : "Required"}
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
            helperText={errorBool.email ? "Required 4-20chars" : "Required"}
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
              helperText={errorBool.phone ? "Required 4-20chars" : "Required"}
              fullWidth
            />
            <TextField
              onChange={handleForm}
              margin="dense"
              id="city"
              name="city"
              label="City"
              type="text"
              error={errorBool.city}
              helperText={errorBool.city ? "Required 4-20chars" : "Required"}
              fullWidth
            />
            <TextField
              onChange={handleForm}
              margin="dense"
              id="streetaddress"
              name="streetaddress"
              label="Street"
              type="text"
              error={errorBool.streetaddress}
              helperText={
                errorBool.streetaddress ? "Required 4-20chars" : "Required"
              }
              fullWidth
            />
            <TextField
              onChange={handleForm}
              margin="dense"
              id="postcode"
              name="postcode"
              label="PostCode"
              type="text"
              error={errorBool.postcode}
              helperText={
                errorBool.postcode ? "Required 4-20chars" : "Required"
              }
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
