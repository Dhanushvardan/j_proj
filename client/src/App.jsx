import { useState, useRef, useEffect } from "react";
import "./App.scss";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

function App() {
  const [row, setRow] = useState([null]);
  const [gApi, setgApi] = useState(0);
  const [cApi, setcApi] = useState(0);
  const gridRef = useRef();
  const defaultColDef = {
    animateRows: true,
    sortable: true,
    editable: true,
    resizable: true,
  };

  let d;
  let h;

  // Set a timeout function to delay the execution
  setTimeout(() => {
    // Fetch the data from the link
    fetch("http://34.141.139.163:6066/aircraft/get_kpi/")
      .then((response) => response.json())
      .then((data) => {
        // Store the fetched data in the 'data' variable
        console.log(data);
        let kpiData = data.KPI;
        let l = [];
        let c = [];
        for (const key in kpiData) {
          var f = kpiData[key];

          l.push(f);

          // Perform operations with each subdivisionData
        }

        console.log(l);

        l.forEach((item) => {
          c.push({
            flight_nature: item[0].flight_nature,
            flight_nature_validation: item[0].flight_nature_validation,
            callsign_0: item[0].callsign_0,
            most_confident_chocks_on: item[0].most_confident_chocks_on,
            chocks_on: item[0].chocks_on,
            chocks_off: item[0].chocks_off,
            chocks_on_validation: item[0].chocks_on_validation,
            chocks_off_validation: item[0].chocks_off_validation,
            first_seen: item[0].first_seen,
            last_seen: item[0].last_seen,
          });
        });

        console.log(c);

        setRow(c);

        // You can perform further operations with the data here
        // Output the fetched data
      })
      .catch((error) => {
        // Handle any errors that occur during the fetch
        console.error(error);
      });
  }, 5000);

  function onGridReady(params) {
    setgApi(params.api);
    setcApi(params.columnApi);
  }

  const triggerSearch = (e) => {
    gApi.setQuickFilter(e.target.value);
  };

  const [colData, setColData] = useState([
    {
      field: "callsign_0",
    },
    {
      field: "flight_nature",
    },
    {
      field: "flight_nature_validation",
    },

    {
      field: "most_confident_chocks_on",
    },
    {
      field: "chocks_on",
    },
    {
      field: "chocks_off",
    },
    {
      field: "chocks_on_validation",
    },
    {
      field: "chocks_off_validation",
    },
    {
      field: "first_seen",
    },
    {
      field: "last_seen",
    },
  ]);
  return (
    <div className="App">
      <div className="wholePage">
        <div className="searchBar">
          <input
            type="text"
            placeholder="Search"
            onChange={triggerSearch}
            className="sInput"
          ></input>
        </div>
        Hello
        <div
          className="ag-theme-alpine-dark"
          style={{ height: "93vh", width: "100vw" }}
        >
          <AgGridReact
            rowData={row}
            className="grid"
            columnDefs={colData}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
}

export default App;
