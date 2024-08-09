import React, { useCallback, useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { getToken } from '../../utill/helpers';

// Main component
const WeightChart = ({servey}) => {
  const [weightData, setWeightData] = useState({});
  const [loading, setLoading] = useState(false);
   const API = process.env.REACT_APP_API;

  // Fetch data function
  const fetchDataPayment = useCallback(async () => {
    if (!servey) {
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
        // Extract and process weights
        const weights = data.data.map((item) => {
          return item.attributes.service.Personal["Poids actuel (en kg)"];
        });

        // Group weights by value and count occurrences
        const weightCount = {};
        weights.forEach((weight) => {
          if (weight in weightCount) {
            weightCount[weight]++;
          } else {
            weightCount[weight] = 1;
          }
        });

        setWeightData(weightCount);
      } else {
        console.error("No data found in response:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [servey, API]);

  useEffect(() => {
    fetchDataPayment();
  }, [fetchDataPayment]);

  // Prepare data for the chart
  const chartData = {
    labels: Object.keys(weightData), // Unique weight values
    datasets: [
      {
        label: 'Weight Graph of Every Package',
        data: Object.values(weightData), // Corresponding counts
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of People'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Weight (kg)'
        }
      }
    },
  };

  return (
    <div>
     
        <div style={{ height: '400px' }}>
          <Bar data={chartData} options={chartOptions} />
        </div>

    </div>
  );
};

export default WeightChart;
