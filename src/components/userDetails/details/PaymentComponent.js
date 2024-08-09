import { Card, Col } from "antd";

import { AiFillLike } from "react-icons/ai";
import { FcCancel } from "react-icons/fc";

import { useEffect, useState } from "react";
import { getToken } from "../../../utill/helpers";

function PaymnetCommponent({ createdAt, email }) {
  const [payment, setPayment] = useState([]);
  const [loading,setLoading]=useState(true)
  const API = process.env.REACT_APP_API;

  const showPayment = async () => {
    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Add 1 because getMonth() returns a zero-based index

    // Ensure month is two digits
    const monthStr = month.toString().padStart(2, "0");

    // Calculate the first day of the month
    const startDate = `${year}-${monthStr}-01T00:00:00.000Z`;

    // Calculate the last day of the month
    const lastDay = new Date(year, month, 0).getDate(); // No need to add 1, getDate() gives us the last day
    const endDate = `${year}-${monthStr}-${lastDay}T23:59:59.999Z`;

  

    try {
      const response = await fetch(
        `${API}/payments?[filters][Email][$eq]=${email}&[filters][createdAt][$gte]=${startDate}&[filters][createdAt][$lte]=${endDate}`,
        {
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(response.status);
      }
      setLoading(false)
      const data = await response.json();
   
      setPayment(data)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    showPayment();
  }, [email, createdAt]);

  return (
    <>
      <Col span={24} md={600} className="mb-24">
        <Card bordered={false} className="carts cartClass">
            {!loading && (
         payment?.data?.length !==0 ? (
 <div className="w-full flex flex-col items-center gap-3">
            <div className="profLogo Payment">
              <AiFillLike size={50} color={"rgb(82, 255, 82)"} />
            </div>

            <p className="font-bold text-xl paymentText">
              Payment Successful
            </p>
          </div>
         )
         :
        (
 <div className="w-full flex flex-col items-center gap-3">
            <div className="profLogo Payment">
              <FcCancel size={50} />
            </div>

            <h3 className="question">Not Paid Yet</h3>
          </div>
        )
        
         
         )}
        </Card>
      </Col>
    </>
  );
}

export default PaymnetCommponent;
