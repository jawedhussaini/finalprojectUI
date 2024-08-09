import React, { useCallback, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getToken } from "../../utill/helpers";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Function to count occurrences of each gender
const countGenders = (data) => {
  const genderCount = {
    Homme: 0,
    Femme: 0,
  };

  data.forEach((item) => {
    const gender = item.attributes.service.Personal.Sexe; // Extract gender from nested structure
    if (genderCount[gender] !== undefined) {
      genderCount[gender] += 1;
    }
  });

  return genderCount;
};

const HorizontalBarChart = ({ servey }) => {
  const API = process.env.REACT_APP_API;
  const [calculateData, setCalculateData] = useState({ Homme: 0, Femme: 0 });
  const [tableName, setTableName] = useState(servey);
  const [loading, setLoading] = useState(false);
  const [genderLabel] = useState(["Homme", "Femme"]);

  console.log("servey", servey);

  const fetchDataPayment = useCallback(async () => {
    if (!tableName) {
      console.error("Table name is null, skipping fetch");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API}/all-packes?[filters][Form][$eq]=${servey}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: Unable to fetch payments`);
      }

      const data = await response.json();
      console.log("Fetched data:", data);

      if (data && data.data) {
        const genderData = countGenders(data.data);
        setCalculateData(genderData);
      } else {
        console.error("No data found in response:", data);
        setCalculateData({ Homme: 0, Femme: 0 }); // Reset data if no response data
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [servey, tableName, API]);

  useEffect(() => {
    if (getToken() && tableName) {
      fetchDataPayment();
    }
  }, [fetchDataPayment]);

  const data = {
    labels: genderLabel,
    datasets: [
      {
        label: "Gender Distribution",
        data: Object.values(calculateData),
        backgroundColor: ["#FF6384", "#36A2EB"], // Colors for different genders
      },
    ],
  };

  const options = {
    indexAxis: "y", // Makes the chart horizontal
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: "black",
        },
        grid: {
          color: "black",
        },
      },
      y: {
        ticks: {
          color: "black",
        },
        grid: {
          color: "black",
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "black",
        },
      },
      title: {
        display: true,
        text: "Gender Distribution",
        color: "black",
      },
    },
  };

  return (
    <div className="chart-container">
        <Bar data={data} options={options} />
    </div>
  );
};

export default HorizontalBarChart;
