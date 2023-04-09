import React, { useState } from "react";
import Chart from "react-apexcharts";
import moment from "moment";
import "./css/chart.css";
const TimeChart = ({ selected, selected2 }) => {
  const [dates, setDates] = useState([]);
  const [currenc, setCurrenc] = useState("");
  const previousYear = moment().subtract(1, "year").format("YYYY-MM-DD");
  const currentYear = moment().add(1, "second").format("YYYY-MM-DD");
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
    <div id="chart-time">
      <Chart
        options={state.options}
        series={state.series}
        type="area"
        height={350}
      />
    </div>
  );
};
