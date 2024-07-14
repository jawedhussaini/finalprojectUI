import { useEffect, useState } from "react";
import { getToken } from "../../utill/helpers";

const imgStyles = `relative transition-all duration-300 after:absolute after:bottom-1/2 after:right-1/2 after:z-10 after:h-[80%] after:w-[80%] after:translate-x-1/2 after:translate-y-1/2 after:bg-red after:bg-opacity-0 after:transition-all after:duration-300 hover:scale-110 hover:after:bg-opacity-50 h-full w-full bg-cover bg-center`;

function Images() {
  
 
   const [gallery,setgallery]=useState(null)
     const API = process.env.REACT_APP_API;
  const getData=async ()=>{
       try {
 
      const response = await fetch(
        `${API}/gallaries?populate=*&pagination[page]=1&pagination[pageSize]=6`,
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
      setgallery(data.data)
    } catch (err) {
      console.log(err);
    }
  }

    useEffect(() => {
   getData()
  }, []);
  return (
   <div className="container">
        <div className=" grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
          {gallery?.map((item) => (
              <div className="overflow-hidden" key={item.id}>
                <div className={imgStyles}>
                  <img className="w-full h-full object-cover" src={`http://localhost:1337${item.attributes.Image?.data[0]?.attributes?.url}`} alt="" />
                </div>
              </div>
            ))}
        </div>
        </div>
  );
}

export default Images;
