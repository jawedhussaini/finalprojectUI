import { Alert, Button, Card, Col, DatePicker, Spin } from "antd";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState, useCallback } from "react";
import { Line } from "react-chartjs-2";
import dayjs from "dayjs";
import { getToken } from "../../utill/helpers";


function LineChart(graphData) {

  ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);
  const [pickYear, setpickYear] = useState(new Date(graphData?.data?.data[0].attributes.createdAt).getFullYear());
  const [data, setData] = useState(null);

   const [loading,setLoading]=useState(false)
  const API = process.env.REACT_APP_API;
 


    useEffect(() => {
  
  }, []);

  const datas =async() => {
        setLoading(true)
       const greater = new Date(pickYear ? dayjs(new Date(pickYear, 0)) : null).getFullYear() + '-01-01T00:00:00.000Z';
const lessDate = new Date(pickYear ? dayjs(new Date(pickYear, 0)) : null).getFullYear() + '-12-29T23:59:59.999Z';
 const servey=graphData?.servey
 const email=graphData?.row



        try {
        
      const response = await fetch(
        `${API}/all-packes?[filters][Form][$eq]=${servey}&[filters][Email][$eq]=${email}&[filters][createdAt][$gt]=${greater}&[filters][createdAt][$lt]=${lessDate}`, // Assuming `servey` should be `survey`
        {
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        }
      );
    
      if (!response.ok) {
        throw new Error(response.status);
      }
      setLoading(false);
      const data = await response.json();

      const byYearData = data?.data?.filter((item) => new Date(item.attributes.createdAt).getFullYear() === pickYear)
   

    if (byYearData?.length <= 0) {
      setData({
        labels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          fill: true,
        datasets: [
          {
            label: "Poids à Jeun",
            data: [null, null, null, null, null, null, null, null, null, null],
            backgroundColor: "white",
            borderColor: "white",
            tension: 0.4,
          },
        ],
      });
    } else {

      const customizedData = byYearData?.map((item) => ({ createdAt: item?.attributes?.createdAt, value: item?.attributes?.service?.PoidsAJeun}));
      const dates = customizedData;
    

      // Convert dates to months
      const monthsWithData = dates?.map((date) => new Date(date.createdAt).getMonth());

      let startIndex = monthsWithData?.indexOf(Math.min(...monthsWithData));

      if (startIndex <= 1) {
        startIndex = monthsWithData?.findIndex((month) => month !== -1);
      }

      const labels = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"].slice(startIndex);

      const data = Array.from({ length: 12 }).fill(null);
      dates?.forEach((date) => {
        const monthIndex = new Date(date.createdAt).getMonth();
        data[monthIndex] = date.value;
      });

      setData({
        labels: labels,
        datasets: [
          {
            label: "Poids à Jeun",
            data: data,
            borderColor: "white", // Change borderColor to white
            backgroundColor: "white", // Set transparent background color
            tension: 0.4,
          },
        ],
      });
    }

  

  


    } catch (err) {
      console.log(err);
    }
   
  }


 const options = {
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        color: 'white' // Change color of y-axis labels to white
      },
      grid: {
        color: 'white' // Change color of y-axis grid lines to white
      }
    },
    x: {
      ticks: {
        color: 'white' // Change color of x-axis labels to white
      },
      grid: {
        color: 'white' // Change color of x-axis grid lines to white
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

  
  useEffect(() => {
         datas();
  }, []);
 



  return (
  
    <>
      <Col span={24} md={600} className="mb-24">
        <Card bordered={false} className="chartBG">
     
          <h1 className="font-semibold center m-0 bt-20 chartHeader">Poids à Jeun</h1>
          <div className="center yearContainer">
            {loading ? <Spin/> :
             <Button
              
              className="tag-primary"
               loading={loading}
              onClick={() => datas()}
            >
            {loading ? null : "Ok"}
            </Button>}
           
           
            <DatePicker
             placeholder="select Year"
  className="datepicker year"
  picker="year"
  value={dayjs(new Date(pickYear,0))}
  onChange={(date) => setpickYear(date ? date.year() : null)}
  
 
            />
             </div>
            <div className="graphContainer center">
          {data && <Line className="lineChart center" data={data} options={options} />}
          </div>
         
          
        </Card>
      </Col>
    </>
   
  );
}

export default LineChart;

