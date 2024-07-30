import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaXTwitter,
  FaPinterestP,
  FaYoutube,
} from "react-icons/fa6";
import { useEffect, useState } from "react";

const linkStyles = `focus rounded-full bg-gray-50 p-4 text-gray-400 hover:bg-red hover:text-white`;

function SocialLinks() {
     const [links,setLinks]=useState(null)
    const API = process.env.REACT_APP_API;
  const getData=async ()=>{
       try {
 
      const response = await fetch(
        `${API}/social-media-links?populate=*`,
      );
         
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();
 
      setLinks(data)

      
    } catch (err) {
      console.log(err);
    }
  }
   
    useEffect(() => {
   getData()

  }, []);

  return (
    <ul className="flex gap-2">
      <Link to={links?.data[0]?.attributes.Facebook} className={linkStyles}>
        <FaFacebookF />
      </Link>
      <Link to={links?.data[0]?.attributes.Twitter} className={linkStyles}>
        <FaXTwitter />
      </Link>
      <Link to={links?.data[0]?.attributes.Instagram} className={linkStyles}>
        <FaPinterestP />
      </Link>
      <Link to={links?.data[0]?.attributes.piro} className={linkStyles}>
        <FaYoutube />
      </Link>
    </ul>
  );
}

export default SocialLinks;
