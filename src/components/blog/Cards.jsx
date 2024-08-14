import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const cardStyles = `preserve-3d relative h-full w-full duration-500`;

const frontStyles = {
  card: `backface-hidden absolute h-full w-full space-y-4     bg-gray-50 px-6 py-12 shadow-xl`,
  date: `inline-block rounded-2xl border border-gray-300 px-2 py-1 text-xs font-medium text-gray-500`,
};

const backStyles = {
  card: `backface-hidden absolute h-full w-full space-y-4 overflow-hidden bg-cover px-6 py-12 shadow-xl`,
  date: `inline-block rounded-2xl border border-white px-2 py-1 text-xs font-medium text-white`,
};

const linkStyles = `inline-block bg-red px-4 py-2 text-xs font-bold uppercase text-white`;

function Cards() {
   const [blogs,setBlogs]=useState(null)
     const API = process.env.REACT_APP_API;
  const getData=async ()=>{
       try {
 
      const response = await fetch(
        `${API}/blogs?populate=*&pagination[page]=1&pagination[pageSize]=3`,
      );
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();

      setBlogs(data.data)
    } catch (err) {
      console.log(err);
    }
  }

    useEffect(() => {
   getData()
  }, []);

    const truncateDescription = (description, maxLength) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + "...";
  };
  return (
    <div className="grid gap-10 xl:grid-cols-2 3xl:grid-cols-3">
      {/* 01 */}
      {blogs?.map((items)=>(
<div key={items.id} className="perspective group h-72">
        <div className={`${cardStyles} group-hover:rotate-y-180`}>
          {/* Front */}
          <div className={frontStyles.card}>
            
            <h4 className="font-bold">{items.attributes.Title}</h4>
            <p className="text-sm font-medium text-gray-300">
             {truncateDescription(items.attributes.Description, 300)}
            </p>
            <Link to="/" className={linkStyles}>
              Read more &rarr;
            </Link>
          </div>
          {/* Back */}
          <div
            className={`${backStyles.card} rotate-y-180 bg-[linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5))')]`}
          >
            <h4 className="font-bol">{items.attributes.Title}</h4>
            <p className="text-sm font-medium text-white">
                  {truncateDescription(items.attributes.Description, 300)}
            </p>
            <Link to="/" className={linkStyles}>
              Read more &rarr;
            </Link>
          </div>
        </div>
      </div>
      ))}
    </div>
  );
}

export default Cards;
