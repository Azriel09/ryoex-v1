import React, { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import TextField from "@mui/material/TextField";

import "./css/home.css";
import moment from "moment";
import Chart from "react-apexcharts";

const theme = createTheme();

export default function GetCurrencies() {
  const [code, setCode] = useState("");
  const [selected, setSelected] = useState("");
  const [selected2, setSelected2] = useState("");
  const [amount, setAmount] = useState("");
  const [converted, setConverted] = useState("");
  const [success, setSuccess] = useState(false);
  const [optionSelected, setOptionSelected] = useState(false);
  const [seed, setSeed] = useState(1);

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
  const [dates, setDates] = useState([]);
  const [currenc, setCurrenc] = useState("");
  const previousYear = moment().subtract(1, "year").format("YYYY-MM-DD");
  const currentYear = moment().add(1, "second").format("YYYY-MM-DD");
  const updateChart = (e) => {
    fetch(
      `https://api.exchangerate.host/timeseries?start_date=${previousYear}&end_date=${currentYear}&base=${selected}&symbols=${selected2}&places=3`
    )
      .then((res) => res.json(res))
      .then((data) => {
        const date = [];
        for (const [key, value] of Object.entries(data.rates)) {
          for (const [currency, amount] of Object.entries(value)) {
            var innerArr = [key, amount];
            date.push(innerArr);
            setCurrenc(currency);
          }
        }
        setDates(date);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleSubmit = (e) => {
    const configuration = {
      method: "get",
      url: `https://api.exchangerate.host/convert?amount=${amount}&from=${selected}&to=${selected2}`,
    };

    axios(configuration)
      .then((result) => {
        setConverted(result.data.result);
        setSuccess(true);
      })
      .catch((error) => {
        error = new Error();
        console.log(error);
      });
  };

  const state = {
    series: [
      {
        name: currenc,
        data: dates,
      },
    ],
    options: {
      chart: {
        foreColor: "white",
        type: "area",
        stacked: false,
        height: 350,
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true,
        },
        toolbar: {
          autoSelected: "zoom",
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      title: {
        text: `Exchange Rate Movement - ${selected} to ${selected2}`,
        align: "left",
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100],
        },
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return val;
          },
        },
        title: {
          text: "Value",
        },
      },
      xaxis: {
        type: "datetime",
        labels: {
          format: "yy-MMM-dd",
        },
      },
      tooltip: {
        theme: "dark",
        shared: false,
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
    },
  };
  return (
    <div className="tools">
      <Grid
        sx={{
          color: "white",
          marginTop: "50px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "100px",
          [theme.breakpoints.down("lg")]: {
            height: "100px",
            marginTop: "55vh",
            flexDirection: "column",
            marginBottom: "60vh",
          },
        }}
      >
        <Grid
          sx={{
            marginTop: "10vh",
            m: 2,
            Width: "100vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            [theme.breakpoints.down("lg")]: {
              marginTop: "15vh",
            },
          }}
        >
          <Typography component="h5" variant="h4">
            Select Currency
          </Typography>
          <FormControl>
            <Select
              native
              defaultValue=""
              id="grouped-native-select"
              label="Grouping"
              onChange={(e) => setSelected(e.target.value)}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                border: "3px solid lightblue",
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
          <FormControl
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Select
              native
              defaultValue=""
              id="grouped-native-select"
              label="Grouping"
              onChange={(e) => setSelected2(e.target.value)}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                border: "3px solid lightblue",
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

            <TextField
              id="outlined-number"
              label="Number"
              type="number"
              onChange={(e) => setAmount(e.target.value)}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                border: "3px solid lightblue",
                width: "20vw",
                [theme.breakpoints.down("lg")]: {
                  width: "100%",
                },
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {success && (
              <Typography component="h1" variant="h5">
                {converted}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={(e) => handleSubmit(e)}
              sx={{ mt: 3, mb: 2, marginTop: "3vh", width: "50%" }}
            >
              Convert
            </Button>
          </FormControl>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100vw",
            [theme.breakpoints.down("lg")]: {
              marginBottom: "5vh",
            },
          }}
        >
          <div id="chart-time">
            <Chart
              options={state.options}
              series={state.series}
              type="area"
              height={350}
            />
          </div>
          <Button
            type="submit"
            fullWidth
            onClick={(e) => updateChart(e)}
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              marginTop: "3vh auto",
              width: "30%",
              marginTop: "20px",
            }}
          >
            Update Chart
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
