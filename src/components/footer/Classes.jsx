import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const linkStyles = `focus font-medium text-gray-300 transition-all duration-300 hover:ml-2 hover:text-red`;

function Classes() {
  const [packages,setPackage]=useState(null)
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
 
      setPackage(data)

      
    } catch (err) {
      console.log(err);
    }
  }
   
    useEffect(() => {
   getData()

  }, []);

  return (
    <div className="space-y-5 2xl:w-48 2xl:justify-self-center">
      <h4 className="relative pb-2 text-xl font-semibold capitalize before:absolute before:bottom-0 before:h-1 before:w-16 before:bg-red">
        Our classes
      </h4>
      <ul className="space-y-5">
       
      
       
      {packages?.data?.map(items=>(
          <li key={items.id}>
          <Link className={linkStyles}>{items.attributes.Name}</Link>
        </li>
      ))}
       
      </ul>
    </div>
  );
}

export default Classes;
