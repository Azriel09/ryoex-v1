import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import moment from "moment";
import axios from "axios";
import Cookies from "universal-cookie";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./css/table.css";
let counter = 0;
const theme = createTheme();
const cookies = new Cookies();
export default function CurrencyTable() {
  const token = cookies.get("TOKEN");
  const [code, setCode] = useState("");

  const [selected, setSelected] = useState("");

  const [change, setChange] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [percent, setPercent] = useState("");
  const [rows, setRows] = useState(() => []);
  const [checkboxSelection, setCheckboxSelection] = useState(true);
  const [status, setStatus] = useState(false);
  const [defaultRows, setDefaultRows] = useState({});
  const [defaultCurrencies, setDefaultCurrencies] = useState("");
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
    { field: "col4", headerName: "Change % (24h)", width: 150 },
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

  useEffect(() => {
    fetch(
      `https://api.exchangerate.host/fluctuation?start_date=${dayBeforeYesterday}&end_date=${yesterday}&symbols=${selected}`
    )
      .then((res) => res.json(res))
      .then((data) => {
        Object.entries(data.rates).map(([key, value]) => {
          setChange(value.change);
          setStart(value.start_rate);
          setEnd(value.end_rate);
          setPercent(value.change_pct);
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [selected]);

  const handleAddRow = () => {
    setStatus(!status);
    setRows((prevRows) => [...prevRows, createRow()]);
  };

  const onDelete = () => {
    let lists = [];
    if (!rows) {
      return;
    }
    Object.entries(rows).map(([key, value]) => {
      lists.push(value.col1);
    });
    const configuration = {
      method: "get",
      url: "/api/auth-endpoint",
      headers: {
        Authorization: `Bearer ${token}`,
        currency: lists,
      },
    };
    axios(configuration)
      .then((result) => {})
      .catch((error) => {
        error = new Error();
      });
    setRows((rows) => rows.filter((r) => !selectionModel.includes(r.id)));
  };

  const saveToProfile = () => {
    let lists = [];
    Object.entries(rows).map(([key, value]) => {
      lists.push(value.col1);
    });

    const configuration = {
      method: "get",
      url: "/api/auth-endpoint",
      headers: {
        Authorization: `Bearer ${token}`,
        currency: lists,
      },
    };
    axios(configuration)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        error = new Error();
      });
  };

  useEffect(() => {
    const configuration = {
      method: "get",
      url: "/api/dashboard",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios(configuration)
      .then((result) => {
        setDefaultCurrencies(result.data[0]);
      })
      .catch((error) => {
        error = new Error();
      });
  }, []);

  const loadData = () => {
    fetch(
      `https://api.exchangerate.host/fluctuation?start_date=${dayBeforeYesterday}&end_date=${yesterday}&symbols=${defaultCurrencies}`
    )
      .then((res) => res.json(res))
      .then((data) => {
        Object.entries(data.rates).map(([key, value]) => {
          counter++;
          const newRow = {
            id: counter,
            col1: key,
            col2: `${value.start_rate} - ${value.end_rate}`,
            col3: value.change,
            col4: value.change_pct,
          };
          setRows((prevRows) => [...prevRows, newRow]);
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        marginTop: "5vh",
        color: "black",
        [theme.breakpoints.down("lg")]: {
          flexDirection: "column",
          marginTop: "10vh",
        },
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
                color: "black",
              }}
            >
              {Object.entries(code).map(([key, value]) => {
                return (
                  <option value={key} key={key}>
                    {key} - {value.description}
                  </option>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleAddRow}
            sx={{ mt: 3, mb: 2, width: "50%", height: "50px" }}
          >
            Add Currency
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={loadData}
            sx={{ mt: 3, mb: 2, width: "50%", height: "50px" }}
          >
            Load Data
          </Button>
        </Grid>
      </Grid>
      <div style={{ height: "500px", width: "80%", margin: "10px auto" }}>
        <DataGrid
          checkboxSelection={checkboxSelection}
          columns={columns}
          rows={rows}
          onSelectionModelChange={setSelectionModel}
          selectionModel={selectionModel}
          sx={{
            color: "white",
          }}
        />
      </div>
      <Grid
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "50px",
          justifyContent: "center",
        }}
      >
        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            width: "50%",
            [theme.breakpoints.down("lg")]: {
              fontSize: "0.7em",
            },
          }}
          onClick={() => onDelete()}
        >
          Delete Selected Rows
        </Button>
        <Button
          type="submit"
          variant="contained"
          onClick={() => saveToProfile()}
          sx={{
            mt: 3,
            mb: 2,
            width: "50%",
            [theme.breakpoints.down("lg")]: {
              fontSize: "0.7em",
            },
          }}
        >
          Save to Profile
        </Button>
      </Grid>
    </Grid>
  );
}
