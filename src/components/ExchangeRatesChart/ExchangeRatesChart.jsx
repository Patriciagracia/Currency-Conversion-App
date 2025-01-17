import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import useApi from "../../hooks/useApi";
import styles from "./ExchangeRatesChart.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function ExchangeRatesChart({ fromCurrency, toCurrency }) {
  const [period, setPeriod] = useState("1y");
  const [startDate, setStartDate] = useState("2023-01-01");
  const [endDate, setEndDate] = useState("2024-01-01");
  const [activePeriod, setActivePeriod] = useState("1y");

  useEffect(() => {
    const now = new Date();
    let newStartDate;
    let newEndDate = now.toISOString().split("T")[0];

    switch (period) {
      case "5d":
        newStartDate = new Date(now.setDate(now.getDate() - 5))
          .toISOString()
          .split("T")[0];
        break;
      case "6m":
        newStartDate = new Date(now.setMonth(now.getMonth() - 6))
          .toISOString()
          .split("T")[0];
        break;
      case "1y":
        newStartDate = new Date(now.setFullYear(now.getFullYear() - 1))
          .toISOString()
          .split("T")[0];
        break;
      case "5y":
        newStartDate = new Date(now.setFullYear(now.getFullYear() - 5))
          .toISOString()
          .split("T")[0];
        break;
      case "max":
        newStartDate = "2000-01-01";
        break;
      default:
        newStartDate = "2023-01-01";
    }

    setStartDate(newStartDate);
    setEndDate(newEndDate);
  }, [period]);

  const { data, error } = useApi({
    startDate,
    endDate,
    baseCurrency: fromCurrency,
    targetCurrency: toCurrency,
  });

  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>Loading...</p>;

  const labels = Object.keys(data.rates);
  const datasetData =
    fromCurrency === toCurrency
      ? labels.map(() => 1)
      : labels.map((date) => data.rates[date][toCurrency]);

  const chartData = {
    labels,
    datasets: [
      {
        label: "",
        data: datasetData,
        borderColor: "#9EA5D9",
        backgroundColor: "rgba(211, 212, 247,  0.4)",
        tension: 0.2,
        borderWidth: 0.7,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 0,
        hitRadius: 50,
      },
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 4,
          callback: function (val, index) {
            if (index === 0) return "";
            const date = new Date(this.getLabelForValue(val));
            return date.toLocaleDateString("en-GB");
          },
        },
      },
      y: {
        ticks: {
          maxTicksLimit: 5,
        },
      },
    },
  };

  return (
    <>
      <Line data={chartData} options={options} className={styles.chart} />
      <div className={styles.periodBtn}>
        <button
          className={activePeriod === "5d" ? styles.active : ""}
          onClick={() => {
            setActivePeriod("5d");
            setPeriod("5d");
          }}
        >
          5 Days
        </button>
        <button
          className={activePeriod === "6m" ? styles.active : ""}
          onClick={() => {
            setActivePeriod("6m");
            setPeriod("6m");
          }}
        >
          6 Months
        </button>
        <button
          className={activePeriod === "1y" ? styles.active : ""}
          onClick={() => {
            setActivePeriod("1y");
            setPeriod("1y");
          }}
        >
          1 Year
        </button>
        <button
          className={activePeriod === "5y" ? styles.active : ""}
          onClick={() => {
            setActivePeriod("5y");
            setPeriod("5y");
          }}
        >
          5 Years
        </button>
        <button
          className={activePeriod === "max" ? styles.active : ""}
          onClick={() => {
            setActivePeriod("max");
            setPeriod("max");
          }}
        >
          Max
        </button>
      </div>
    </>
  );
}
