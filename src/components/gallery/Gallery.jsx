import Images from "./Images";
import Title from "./Title";
import { useEffect, useState } from "react";
import { getToken } from "../../utill/helpers";

function Gallery() {
    const [allData,setAllData]=useState(null)
     const API = process.env.REACT_APP_API;
  const getData=async ()=>{
       try {
 
      const response = await fetch(
        `${API}/titles`,
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
      setAllData(data.data[0].attributes)
    } catch (err) {
      console.log(err);
    }
  }

    useEffect(() => {
   getData()
  }, []);
  return (
    <section className="overflow-x-clip px-6 py-32">
      <div className="container space-y-10">
        <Title />

        <Images />
      </div>
    </section>
  );
}

export default Gallery;
