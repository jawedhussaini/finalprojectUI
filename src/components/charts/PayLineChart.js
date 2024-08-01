import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const calculateMonthlyTotals = (data) => {
  // Create an array with 12 elements initialized to 0 for each month
  const monthlyTotals = Array(12).fill(0);

  data.forEach((item) => {
    const date = new Date(item.attributes.createdAt);
    const month = date.getMonth(); // 0 for January, 1 for February, etc.
    const price = item.attributes.Price;
    monthlyTotals[month] += price;
  });

  return monthlyTotals;
};


function PayLineChart ({monthlyData}) {
    console.log("pay",monthlyData)
    const monthlyTotals = calculateMonthlyTotals(monthlyData.data);
  const data = {
    labels: [
      "J",
      "F",
      "M",
      "A",
      "M",
      "J",
      "J",
      "A",
      "S",
      "O",
      "N",
      "D",
    ],
    datasets: [
      {
        label: "Total Price",
        data: monthlyTotals,
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
        color: 'black' // Change color of y-axis labels to white
      },
      grid: {
        color: 'black' // Change color of y-axis grid lines to white
      }
    },
    x: {
      ticks: {
        color: 'black' // Change color of x-axis labels to white
      },
      grid: {
        color: 'black' // Change color of x-axis grid lines to white
      }
    }
  },
  responsive: true,
  plugins: {
    legend: {
      labels: {
        color: 'white' // Change color of legend labels to white
      }
    }
  },
};


  return   <div className="chart-container">
      <Line className="pb-10" data={data} options={options} />
    </div>;
};



export default PayLineChart;
