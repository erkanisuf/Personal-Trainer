import React, { useState, useEffect } from 'react';
import { useComponentWillMount } from './utils';
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import ModalCustomers from "./ModalCustomers";

const useStyles = makeStyles((theme) => ({
   
    yellow: {
      margin: theme.spacing(1),
      width: "100px",
      fontSize: "10px",
      padding: "5px",
      backgroundColor: "#6e6d19",
      "&:hover": {
        backgroundColor: "#ffc107",
      },
    },
   
  }));



export default (props) => {

    const classes = useStyles();
    let [editing, setEditing] = useState(false);
    let [disabled, setDisabled] = useState(false);
    const [selfCustomer, setSelfCustomer] = useState({});
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState([]);
    console.log(training,'THE JXS')
    const [openDialog, setOpenDialog] = useState(false);
    const handleClose = () => {
        //Modal Open
        setOpen(false);
      };
    // custom hook
    useComponentWillMount(() => {
        let editingCells = props.api.getEditingCells();
        if (editingCells.length !== 0) {
            setDisabled(true);
        }
    })

    useEffect(() => {
        props.api.addEventListener('rowEditingStarted', onRowEditingStarted);
        props.api.addEventListener('rowEditingStopped', onRowEditingStopped);

        return () => {
            props.api.removeEventListener('rowEditingStarted', onRowEditingStarted);
            props.api.removeEventListener('rowEditingStopped', onRowEditingStopped);
        };
    }, []);

    function onRowEditingStarted(params) {
        if (props.node === params.node) {
            setEditing(true);
        } else {
            setDisabled(true);
        }
    };

    function onRowEditingStopped(params) {
        if (props.node === params.node) {
            if (isEmptyRow(params.data)) {
            
            } else {
                setEditing(false);
            }
        } else {
            setDisabled(false);
        }
    }

    function startEditing() {
        props.api.startEditingCell({
            rowIndex: props.rowIndex,
            colKey: props.column.colId
        });
    }

    function stopEditing(bool) {
        console.log(props)
        props.api.stopEditing(bool);
    }

    function isEmptyRow(data) {
        let dataCopy = { ...data };
        delete dataCopy.id;
        return !Object.values(dataCopy).some(value => value);

    }

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
            setTraining(data.content);
          })
          .catch((err) => console.error(err));
      };
    function handleClick(){
        setSelfCustomer(props.data)
        fetchCustomerTraining(props.data.links[2].href)
        
        setOpen(true)
        console.log('train',props)
    }

    return (
        <div>
            {editing
                ? <>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => stopEditing(false)}
                        disabled={disabled}>Update</Button>
                    <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => stopEditing(true)}
                        disabled={disabled}>Cancel</Button>
                </>
                : <>
                    <Button
                    startIcon={<EditIcon />}
                    className={classes.yellow}
                    variant="contained"
                    color="secondary"
                        onClick={startEditing}
                        disabled={disabled}>Edit</Button>
            
                </>
            }
            <Button
                startIcon={<FitnessCenterIcon />}
                className={classes.yellow}
                variant="contained"
                color="primary"
                onClick={handleClick}
              >
                Trainings
              </Button>
             <ModalCustomers
        open={open}
        handleClose={handleClose}
        training={training}
        user={selfCustomer}
      />
        </div>
    )
}
