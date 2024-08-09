import React, { useEffect, useState, useCallback } from "react";
import { Line } from "react-chartjs-2";
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
import { getToken } from "../../utill/helpers";
import { DatePicker } from "antd";
import dayjs from "dayjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const calculateMonthlyTotals = (data) => {
  // Create an array with 12 elements initialized to 0 for each month
  const monthlyTotals = Array(12).fill(0);
 

  if (!data) {
    console.error("Data is undefined");
    return monthlyTotals;
  }

  data.forEach((item) => {
    const date = new Date(item.attributes.createdAt);
    const month = date.getMonth(); // 0 for January, 1 for February, etc.
    const price = item.attributes.Price;
    monthlyTotals[month] += price;
  });

  return monthlyTotals;
};

function PayLineChart({ servey }) {
  const API = process.env.REACT_APP_API;
  const [calculateData, setCalculateData] = useState();
  const [tableName, setTableName] = useState(servey);
  const [loading,setLoading]=useState(false)
  const [pickYear, setpickYear] = useState(new Date().getFullYear());

  console.log("servey", servey);

  const fetchDataPayment = useCallback(async () => {
    if (!tableName) {
      console.error("Table name is null, skipping fetch");
      return;
    }
           const greater = new Date(pickYear ? dayjs(new Date(pickYear, 0)) : null).getFullYear() + '-01-01T00:00:00.000Z';
const lessDate = new Date(pickYear ? dayjs(new Date(pickYear, 0)) : null).getFullYear() + '-12-29T23:59:59.999Z';

    try {
      const response = await fetch(
        `${API}/payments?[filters][Package][$eq]=${servey}&[filters][createdAt][$gt]=${greater}&[filters][createdAt][$lt]=${lessDate}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: Unable to fetch payments`);
      }

      const pay = await response.json();
      console.log("payT", pay);

      if (pay && pay.data) {
     
        const allDataByYear = calculateMonthlyTotals(pay.data);
        setCalculateData(allDataByYear);
      } else {
        console.error("No data found in response:", pay);
        setCalculateData(Array(12).fill(0)); // Reset data if no response data
      }
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  }, [servey,pickYear]); // Dependencies for useCallback

  useEffect(() => {
    if (getToken() && tableName) {
      fetchDataPayment();
    }
    // Fetch data only once, or when `servey` changes if it's necessary
  }, [servey,pickYear]); // Dependency on the memoized function

  const data = {
    labels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    datasets: [
      {
        label: "Total Monny in Heach Months",
        data: calculateData,
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "black", // Change color of y-axis labels to black
        },
        grid: {
          color: "black", // Change color of y-axis grid lines to black
        },
      },
      x: {
        ticks: {
          color: "black", // Change color of x-axis labels to black
        },
        grid: {
          color: "black", // Change color of x-axis grid lines to black
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "black", // Change color of legend labels to white
        },
      },
    },
  };

  return (
    <div className="chart-container">
               
          <div className="center yearContainer">
            <DatePicker
             placeholder="select Year"
  className="datepicker year"
  picker="year"
  value={dayjs(new Date(pickYear,0))}
  onChange={(date) => setpickYear(date ? date.year() : null)}
            />
             </div>
      
      <Line className="pb-10" data={data} options={options} />
    </div>
  );
}

export default PayLineChart;
