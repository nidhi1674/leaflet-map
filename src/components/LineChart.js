import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function LineChart() {
  const apiBaseUrl = "https://disease.sh/v3/covid-19/historical/all?lastdays=all";

  const [casesData, setCasesData] = useState({});
  const [deathData, setDeathData] = useState({});
  const [recoverData, setRecoverData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await fetch(apiBaseUrl)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let chartCaseData = buildChartData(data, "cases");
          setCasesData(chartCaseData);

          let chartDeathData = buildChartData(data, "deaths");
          setDeathData(chartDeathData);

          let chartRecoverData = buildChartData(data, "recovered");
          setRecoverData(chartRecoverData);
        });
    };

    fetchData();
  }, []);

  const buildChartData = (data, casesType) => {
    let chartData = [];
    let lastDataPoint;
    for (let date in data.cases) {
      if (lastDataPoint) {
        let newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }
    return chartData;
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Covid Cases",
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
  };

  const dataChart = {
    datasets: [
      {
        id: 1,
        label: "Cases",
        data: casesData,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        id: 2,
        label: "Deaths",
        data: deathData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        id: 2,
        label: "Recovered",
        data: recoverData,
        borderColor: "rgb(0,128,0)",
        backgroundColor: "rgba(0,128,0, 0.5)",
      },
    ],
  };

  return <Line data={dataChart} options={options} />;
}

export default LineChart;
