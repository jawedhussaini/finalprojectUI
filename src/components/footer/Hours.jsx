import { useEffect, useState } from "react";

function Hours() {
   const [workingHours,setWorkingHours]=useState(null)
    const API = process.env.REACT_APP_API;
  const getData=async ()=>{
       try {
 
      const response = await fetch(
        `${API}/working-hours?populate=*`,
      );
         
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();
 
      setWorkingHours(data)

      
    } catch (err) {
      console.log(err);
    }
  }
   
    useEffect(() => {
   getData()

  }, []);

  return (
    <div className="space-y-5">
      <h4 className="relative pb-2 text-xl font-semibold capitalize before:absolute before:bottom-0 before:h-1 before:w-16 before:bg-red">
        Working hours
      </h4>
      <ul className="space-y-5 font-medium text-gray-300">
        {workingHours?.data?.map(item=>(
          <li key={item.id}>
          <span className="font-semibold">{item.attributes.Days}: </span>{item.attributes.time}
        </li>
        ))}
      </ul>
    </div>
  );
}

export default Hours;
