import { useEffect, useState } from "react";
import { getToken } from "../../utill/helpers";

const btnStyles = `self-start font-medium transition-all hover:text-red`;

function Categories({ sendDataToParent }) {
    const [catagory,setCatagory]=useState(null)
 

  function handleClick(name) {
    sendDataToParent(name);
  }

     const API = process.env.REACT_APP_API;
  const getData=async ()=>{
       try {
 
      const response = await fetch(
        `${API}/catagories?populate=*`,
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
      setCatagory(data.data)
      
    } catch (err) {
      console.log(err);
    }
  }
   
    useEffect(() => {
   getData()

  }, []);

  return (
    <div className="flex flex-col gap-4 bg-gray-50 p-6">
      <h3
        className="relative pb-2 text-xl font-bold 
before:absolute before:bottom-0 before:h-1 before:w-16 before:bg-red"
      >
        Categories
      </h3>
    {catagory?.map((items)=>(
      <button onClick={()=>handleClick(items.attributes.Name)} className={btnStyles}>&rsaquo; {items.attributes.Name
}</button>
    ))}
 
    </div>
  );
}

export default Categories;
