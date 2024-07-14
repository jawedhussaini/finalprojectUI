import { Card, Col } from "antd";
import { useEffect, useState } from "react";

function Service(data) {
    const [allData,setAlldata]=useState([])
     useEffect(() => {

 if (data.data.lenght!==0) {
        const arr = Object.entries(data.data[1]);
      setAlldata(arr)
   
     

  }}, [data]);
  
  return (
    <>
      <Col span={24} md={600}  className="mb-24">
        <Card bordered={false} className="cartClass">
          <div className="info">
            <h1 className="font-semibold bt-20 h1Class">{data?.data[0]}</h1>

            {
                allData.map((items)=>(
            <div key={items[0]}>
              <h3 className="question">{items[0]}</h3>
              <p className="answer">{items[1]}</p>
            </div>  
                ))
            }
          </div>
        </Card>
      </Col>
    </>
  );
}

export default Service;
