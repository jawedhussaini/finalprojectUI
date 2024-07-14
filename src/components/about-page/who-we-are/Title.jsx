import { useEffect, useState } from "react";
import SecondaryHeading from "../../headings/SecondaryHeading";
import TertiaryHeading from "../../headings/TertiaryHeading";
import { getToken } from "../../../utill/helpers";

function Title() {
  const [allData,setAllData]=useState(null)
     const API = process.env.REACT_APP_API;
  const getData=async ()=>{
       try {
 
      const response = await fetch(
        `${API}/abouts`,
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
      setAllData(data.data[0].attributes)
    } catch (err) {
      console.log(err);
    }
  }

    useEffect(() => {
   getData()
  }, []);
  return (
    <div>
      <SecondaryHeading>Who we are</SecondaryHeading>
      <TertiaryHeading>{allData?.Title}</TertiaryHeading>
      <p className="font-medium text-gray-300">
      {allData?.Description}
      </p>
    </div>
  );
}

export default Title;
