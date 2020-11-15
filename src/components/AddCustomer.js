import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import React, { useState, useContext } from "react";
import { MyContext } from "../Context/Context";
import MuiPhoneNumber from "material-ui-phone-number";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

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
    width: "190px",
    fontSize: "14px",
    padding: "10px",
    marginTop: "10px",
    backgroundColor: "#3b6120",
    "&:hover": {
      backgroundColor: "#4caf50",
    },
  },
  iconcustomer: {
    margin: theme.spacing(1),
    color: "#3b6120",
    border: "1px solid #3b6120",
    height: "40px",
    marginTop: "-10px",
    borderRadius: "3px",
    "&:hover": {
      color: "#4caf50",
    },
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function FormDialog({ source }) {
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

  const handleClose = () => {
    setOpen(false);

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
  };
  const handlePhone = (e) => {
    setForm({ ...form, phone: e });
  };
  const handleAdress = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchAddNewCustomer = () => {
    let re = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );

    if (
      form.firstname.length > 3 &&
      form.firstname.length < 20 &&
      form.firstname.value !== "" &&
      form.lastname.length > 3 &&
      form.lastname.length < 20 &&
      form.lastname.value !== "" &&
      form.phone.length === 17 &&
      form.phone.value !== "" &&
      re.test(form.email) &&
      form.email.value !== ""
    ) {
      sendAfterForm();
    } else {
      alert("Please Fill the Required Form Fields correctly!");
    }
  };

  const sendAfterForm = () => {
    fetch(`https://customerrest.herokuapp.com/api/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((key) => console.log("Processing"))
      .then((key) => {
        setForm({
          firstname: "",
          lastname: "",

          email: "",
          phone: "",
        });
        valueThree();
        setOpen(false);
        setOpensnack(true);
      })
      .catch((err) => console.error(err));
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const [opensnack, setOpensnack] = useState(false);

  const closeSnack = () => setOpensnack(false);

  return (
    <div>
      {source === "customers" ? (
        <Button
          startIcon={<AddIcon />}
          className={classes.newcustomer}
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
        >
          New Customer
        </Button>
      ) : (
        <IconButton
          aria-label="Add"
          className={classes.iconcustomer}
          onClick={() => setOpen(true)}
        >
          <PersonAddIcon fontSize="large" />
          <span style={{ fontSize: "10px", color: "grey" }}>New Customer</span>
        </IconButton>
      )}

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
          <ValidatorForm
            onSubmit={fetchAddNewCustomer}
            onError={(errors) => console.log(errors)}
          >
            <TextField
              onChange={handleForm}
              autoFocus
              margin="dense"
              id="firstname"
              name="firstname"
              label="First Name"
              type="text"
              error={
                form.firstname.length > 3 &&
                form.firstname.length < 20 &&
                form.firstname.value !== ""
                  ? false
                  : true
              }
              helperText={
                form.firstname.length > 3 &&
                form.firstname.length < 20 &&
                form.firstname.value !== ""
                  ? "Required 4-20chars"
                  : "Required"
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
              error={
                form.lastname.length > 3 &&
                form.lastname.length < 20 &&
                form.lastname.value !== ""
                  ? false
                  : true
              }
              helperText={
                form.lastname.length > 3 &&
                form.lastname.length < 20 &&
                form.lastname.value !== ""
                  ? "Required 4-20chars"
                  : "Required"
              }
              fullWidth
            />

            <TextValidator
              label="Email"
              onChange={handleForm}
              name="email"
              fullWidth
              margin="dense"
              value={form.email}
              validators={["required", "isEmail"]}
              errorMessages={["this field is required", "email is not valid"]}
            />
            <div
              className={classes.root}
              style={{
                display: "flex",
                flexDirection: window.innerWidth <= 480 ? "column" : "row",
                justifyContent: "space-between",
              }}
            >
              <MuiPhoneNumber
                fullWidth
                label="Phone"
                margin="dense"
                defaultCountry={"fi"}
                value={form.phone}
                onChange={handlePhone}
                error={
                  form.phone.length < 17 && form.phone.value !== ""
                    ? true
                    : false
                }
                helperText={
                  form.phone.length < 17 && form.phone.value !== ""
                    ? "Invalid Number"
                    : "Required"
                }
              />
              <TextField
                onChange={handleAdress}
                margin="dense"
                id="city"
                name="city"
                label="City"
                type="text"
                fullWidth
              />
              <TextField
                onChange={handleAdress}
                margin="dense"
                id="streetaddress"
                name="streetaddress"
                label="Street"
                type="text"
                fullWidth
              />
              <TextField
                onChange={handleAdress}
                margin="dense"
                id="postcode"
                name="postcode"
                label="PostCode"
                type="text"
                fullWidth
              />
            </div>
          </ValidatorForm>
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
      <Snackbar open={opensnack} autoHideDuration={6000} onClose={closeSnack}>
        <Alert onClose={closeSnack} severity="success">
          New user has been created!
        </Alert>
      </Snackbar>
    </div>
  );
}
