import TertiaryButton from "../buttons/TertiaryButton";

import img1 from "../../images/pricing/img1.webp";
import img2 from "../../images/pricing/img2.webp";
import img3 from "../../images/pricing/img3.webp";
import { useCallback, useEffect, useState } from "react";
import { getToken, getUserData } from "../../utill/helpers";
import {loadStripe} from '@stripe/stripe-js';
import { makeRequest } from "../../makeRequest";

const imgStyles = `grayscale transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0`;

const headingStyles = `clip-path-left group-hover:clip-path-right absolute bottom-[-1px] right-1/2 w-3/4 translate-x-1/2 bg-white py-5 text-lg font-bold text-red transition-all duration-500 group-hover:bg-red group-hover:text-white`;

function Cards() {
  const [cart,setCart]=useState(null)
  const [auth,setAuth]=useState(false)
    const [payment, setPayment] = useState([]);
  const [loading,setLoading]=useState(true)
  const API = process.env.REACT_APP_API;

  const getData=async ()=>{
       try {
 
      const response = await fetch(
        `${API}/classes?populate=*`,
        
        
      );
         
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();

      setCart(data)

      
    } catch (err) {
      console.log(err);
    }
  }
   
    useEffect(() => {
   getData()

  }, []);
    useEffect(() => {
        setAuth(!!getToken());

  }, [getToken()]);
 const stripePromise = loadStripe('pk_test_51PcB2gD7q18kXpMhmn3P9DC1fsiqwfXWP1o9nfNXIHUJK5Ex6x2WHoSwE1XBM956h367tT7DhyzW4eI6jbQMpv0X00IP3sBhsY');
  const handelPayment=async(packname,price)=>{
    const userDetails=getUserData()
    try{
         const stripe = await stripePromise;
      const res = await makeRequest.post("/payments", {
        name:userDetails.name,
          email:userDetails.email,
          classs:packname,
          prices:price
        
      });
      await stripe.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });
      
    }
    catch(err){
      console.log(err)
    }
  }
 const showPayment = useCallback(async () => {
    const userData = getUserData();
    const date = new Date();
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
        `${API}/payments?[filters][Email][$eq]=${userData.email}&[filters][createdAt][$gte]=${startDate}&[filters][createdAt][$lte]=${endDate}`,
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
    
     

      setPayment(data);
    } catch (err) {
      console.log(err);
    }
  }, [API]); // Pass de

  

  useEffect(()=>{
    showPayment()

  },[showPayment])

  const userData=getUserData()


  return (
    <div className="relative z-10 grid bg-black gap-8 xl:grid-cols-2 2xl:grid-cols-3">
      {/* 01 */}
      {
        cart?.data?.map((items)=>(
  <div key={items.id} className="flex flex-col shadow-2xl">
        <div className="group relative overflow-hidden">
          <img src={`${items?.attributes?.Image?.data?.attributes?.url}`} alt="" className={imgStyles} />
          <h4 className={headingStyles}>{items.attributes.Name}</h4>
        </div>
        <div className="relative z-[1] space-y-8 bg-white py-10">
          <h5 className="text-2xl text-gray-300">
            $ <span className="text-6xl font-bold text-gray-600">{items.attributes.Price}</span> p/m
          </h5>
          <ul className="space-y-3 font-medium text-gray-300">
            {items.attributes.charactrastics.data.map((item)=>(
               <li key={item.id}>{item.attributes.Name}</li>
            ))}
          </ul>
           {auth && (
            
        
               <button onClick={()=>handelPayment(items.attributes.Name,items.attributes.Price)}><TertiaryButton>Purchase now</TertiaryButton></button>)
              }
     
        </div>
      </div>
        ))
      }
    </div>
  );
}

export default Cards;
