import { useEffect } from "react";
import SecondaryHeading from "../headings/SecondaryHeading";
import TertiaryHeading from "../headings/TertiaryHeading";
import { getToken } from "../../utill/helpers";

function Title() {
    const API = process.env.REACT_APP_API;
  const getData=async ()=>{
       try {
 
      const response = await fetch(`${API}/abouts/`,
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
    } catch (err) {
      console.log(err);
    }
  }

    useEffect(() => {
   getData()
  }, []);
  return (
    <>
      <SecondaryHeading>Who we are</SecondaryHeading>
      <TertiaryHeading>Take your health and body to next level</TertiaryHeading>
      <p className="mb-14 font-medium text-gray-400">
        Take your health and body to the next level with our comprehensive
        program designed to help you reach your fitness goals.
      </p>
    </>
  );
}

export default Title;
