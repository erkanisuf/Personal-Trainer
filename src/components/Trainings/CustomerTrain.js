import React, { useState, useEffect } from "react";
import CustomerDialog from "./CustomerDialog";
import PersonIcon from "@material-ui/icons/Person";
import IconButton from "@material-ui/core/IconButton";
const CustomerTrain = ({ customer }) => {
  const [customerReady, setCustomerReady] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetch(customer, {
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
        setCustomerReady(data);
        setLoading(true);
      })
      .catch((err) => console.error(err));
  }, [customer]);
  const [openDialog, setOpenDialog] = useState(false);
  if (!loading) {
    return <p>loading</p>;
  } else {
    return (
      <div>
        <IconButton aria-label="Add" onClick={() => setOpenDialog(true)}>
          <PersonIcon fontSize="small" />
        </IconButton>
        {customerReady.firstname},{customerReady.lastname},{customerReady.email}
        <CustomerDialog
          openDialog={openDialog}
          handleCloseDialog={() => setOpenDialog(false)}
          user={customerReady}
        />
      </div>
    );
  }
};

export default CustomerTrain;
