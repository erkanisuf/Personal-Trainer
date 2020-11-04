import React, { useContext, useState, useRef } from "react";
import { MyContext } from "../Context/Context";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import AddCustomer from "./AddCustomer";
import ActionsRenderer from "./ActionsRenderer";

const Customers = () => {
  const grid = useRef();

  const [gridApi, setGridApi] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const { valueOne } = useContext(MyContext);

  const [customers] = valueOne;

  const frameworkComponents = {
    actionsRenderer: ActionsRenderer,
  };

  const [searchBar, setsearchBar] = useState("");
  const handleSearch = (e) => {
    setsearchBar(e.target.value);
    gridApi.setQuickFilter(e.target.value);
  };

  const columns = [
    {
      headerName: "Actions",
      colId: "actions",
      cellRenderer: "actionsRenderer",

      editable: false,
      filter: false,
      sortable: false,

      resizable: true,
      width: 400,
    },
    {
      headerName: "Customers",
      resizable: true,
      children: [
        {
          headerName: "FirstName",
          field: "firstname",

          sortable: true,

          filter: "agTextColumnFilter",

          resizable: true,
        },
        {
          headerName: "LastName",
          field: "lastname",
          sortable: true,
          filter: "agTextColumnFilter",

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
          filter: "agTextColumnFilter",

          resizable: true,
        },
        {
          headerName: "Phone",
          field: "phone",
          sortable: true,
          filter: true,

          resizable: true,
        },
        {
          headerName: "City",
          field: "city",
          sortable: true,
          filter: true,

          resizable: true,
        },
        {
          headerName: "Adress",
          field: "streetaddress",
          sortable: true,
          filter: true,

          resizable: true,
        },
        {
          headerName: "PostCode",
          field: "postcode",
          sortable: true,
          filter: true,

          resizable: true,
        },
      ],
    },
  ];
  console.log(customers);
  return (
    <div className="ag-theme-alpine" style={{ height: 600 }}>
      <AddCustomer
        customers={customers}
        handleSearch={handleSearch}
        searchBar={searchBar}
      />
      <AgGridReact
        frameworkComponents={frameworkComponents}
        ref={grid}
        onGridReady={onGridReady}
        editType={"fullRow"}
        pagination={true}
        paginationAutoPageSize={true}
        animateRows={true}
        rowData={customers}
        columnDefs={columns}
        suppressClickEdit
        defaultColDef={{
          editable: true,
          floatingFilter: true,
        }}
        enableCellChangeFlash={true}
      ></AgGridReact>
    </div>
  );
};

export default Customers;
