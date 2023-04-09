import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import moment from "moment";
let counter = 0;
export default function CheckboxSelectionGrid() {
  const [code, setCode] = useState("");
  const [selected, setSelected] = useState("");
  const [selected2, setSelected2] = useState("");
  const [change, setChange] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [percent, setPercent] = useState("");
  const [rows, setRows] = useState(() => []);
  const [checkboxSelection, setCheckboxSelection] = useState([]);

  const [selectionModel, setSelectionModel] = React.useState([]);

  const yesterday = moment().subtract(1, "day").format("YYYY-MM-DD");
  const dayBeforeYesterday = moment().subtract(2, "day").format("YYYY-MM-DD");

  useEffect(() => {
    fetch("https://api.exchangerate.host/symbols")
      .then((res) => res.json(res))
      .then((data) => {
        setCode(data.symbols);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const columns = [
    { field: "id", hide: true },
    { field: "col1", headerName: "Currency", width: 150 },
    { field: "col2", headerName: "Start/End Rate", width: 250 },
    { field: "col3", headerName: "Change (24h)", width: 150 },
    { field: "col4", headerName: "Change % (24)", width: 150 },
  ];
  const createRow = () => {
    counter++;
    return {
      id: counter,
      col1: selected,
      col2: `${start} - ${end}`,
      col3: change,
      col4: percent,
    };
  };
  const handleAddRow = () => {
    let newChange = "";
    let newStart = "";
    let newEnd = "";
    let newPct = "";
    fetch(
      `https://api.exchangerate.host/fluctuation?start_date=${dayBeforeYesterday}&end_date=${yesterday}&symbols=${selected}`
    )
      .then((res) => res.json(res))
      .then((data) => {
        console.log(data.rates);
        for (const [key, value] of Object.entries(data.rates)) {
          for (const [currency, amount] of Object.entries(value)) {
            // if (counter > 1) {
            //   newChange = value.change;
            //   newStart = value.start_rate;
            //   newEnd = value.end_rate;
            //   newPct = value.change_pct;
            //   setChange(newChange);
            //   setStart(newStart);
            //   setEnd(newEnd);
            //   setPercent(newPct);
            // } else {
            //   setChange(value.change);
            //   setStart(value.start_rate);
            //   setEnd(value.end_rate);
            //   setPercent(value.change_pct);
            // }
            setChange(value.change);
            setStart(value.start_rate);
            setEnd(value.end_rate);
            setPercent(value.change_pct);
          }
        }
      })
      .catch((err) => {
        console.log(err.message);
      });

    setRows((prevRows) => [...prevRows, createRow()]);
  };

  useEffect(() => {
    console.log("Updated State", change);
  }, [change]);

  // const handleDeleteRow = () => {
  //   setRows((prevRows) => {
  //     const rowToDeleteIndex = selectionModel;
  //     return [
  //       ...rows.slice(0, rowToDeleteIndex),
  //       ...rows.slice(rowToDeleteIndex + 1),
  //     ];
  //   });
  // };
  const onDelete = () => {
    setRows((rows) => rows.filter((r) => !selectionModel.includes(r.id)));
  };
  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        marginTop: "5vh",
      }}
    >
      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <Grid sx={{ display: "flex", flexDirection: "row", gap: "30px" }}>
          <FormControl>
            <Select
              native
              defaultValue=""
              id="grouped-native-select"
              label="Grouping"
              onChange={(e) => setSelected(e.target.value)}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                border: "3px solid lightblue",
              }}
            >
              {Object.entries(code).map(([key, value]) => {
                return (
                  <option value={key}>
                    {key} - {value.description}
                  </option>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={handleAddRow}
          sx={{ mt: 3, mb: 2, width: "50%" }}
        >
          Add Currency
        </Button>
      </Grid>
      <div style={{ height: "500px", width: "80%", margin: "20px auto" }}>
        <DataGrid
          checkboxSelection={checkboxSelection}
          columns={columns}
          rows={rows}
          onSelectionModelChange={setSelectionModel}
          selectionModel={selectionModel}
        />
      </div>
      <Button sx={{ mb: 2 }} onClick={() => onDelete()}>
        Delete Selected Rows
      </Button>
    </Grid>
  );
}
