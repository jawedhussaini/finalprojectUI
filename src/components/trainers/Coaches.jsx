import { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaRegEnvelope,
  FaAngleUp,
} from "react-icons/fa6";
import { getToken } from "../../utill/helpers";
import { Link } from "react-router-dom";

const imageBoxStyles = `relative h-72 w-full bg-[url('./images/trainers/bg-coach.png')] bg-cover bg-no-repeat before:absolute before:z-10 before:h-full before:w-full 
before:bg-top before:bg-no-repeat before:grayscale before:transition-all before:duration-700 hover:before:grayscale-0`;

const textBoxStyles = `relative space-y-3 rounded-b-md bg-white bg-center py-7 text-center shadow-xl before:absolute before:right-1/2 before:top-[-26px] before:z-10 before:h-8 before:w-28 before:translate-x-1/2 before:bg-[url('./images/trainers/shape.png')] before:bg-no-repeat after:absolute after:bottom-0 after:right-1/2 after:h-1 after:w-10 after:translate-x-1/2 after:bg-red after:transition-all after:duration-500 hover:after:w-full after:hover:rounded-b-md`;

const iconStyles = `transition-all duration-300 hover:text-red`;

function Coaches() {

  
   const [coatch,setCoatch]=useState(null)
     const API = process.env.REACT_APP_API;
  const getData=async ()=>{
       try {
 
      const response = await fetch(
        `${API}/coaches?populate=*`,
        {
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();
      console.log(data)
      setCoatch(data.data)
    } catch (err) {
      console.log(err);
    }
  }

    useEffect(() => {
   getData()
  }, []);
 
  return (
    <div className="grid gap-10 xl:grid-cols-2 2xl:grid-cols-3">



      
         {coatch?.map((item) => (
             <div className="flex cursor-pointer flex-col">
             
        <div
          className={`${imageBoxStyles} flex items-center justify-center`}
        >
           <img src={`http://localhost:1337${item.attributes.Image?.data?.attributes?.url}`}/>
        </div>
        <div className={textBoxStyles}>
          <FaAngleUp className="absolute right-1/2 top-[-13px] z-10 translate-x-1/2 text-xl" />
          <h4 className="text-2xl font-bold">{item.attributes.Name}</h4>
          <p className="font-medium text-gray-350">{item.attributes.Profitionalty}</p>
          <div className="flex justify-center gap-4 text-lg text-gray-350">
            
            <Link src={item.attributes.FaceBook}><FaFacebookF className={iconStyles} /></Link>
            <Link src={item.attributes.Instagram}><FaInstagram className={iconStyles} /></Link>
            <Link src={item.attributes.Gmail}>  <FaRegEnvelope className={iconStyles} /></Link>              
        
          </div>
        </div>
      </div> 
            ))}
    </div>
  );
}

export default Coaches;
