import { useEffect, useState } from "react";

import TertiaryButton from "../buttons/TertiaryButton";
import Pagination from "../pagination/Pagination";
import { getToken } from "../../utill/helpers";



function Posts({catagory,searchdata}) {
   const [blog,setBlogs]=useState(null)
     const API = process.env.REACT_APP_API;
  const getData=async ()=>{
       try {
 
      const response = await fetch(
        `${API}/blogs?populate=*&${catagory ? `[filters][catagory][Name][$eq]=${catagory}` : null}&${searchdata ? `[filters][Title][$contains]=${searchdata}` : null}`,
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
      setBlogs(data.data)

      
    } catch (err) {
      console.log(err);
    }
  }
   
    useEffect(() => {
   getData()

  }, [catagory,searchdata]);
  const [curPage, setCurPage] = useState(0);
  const itemPerPage = Math.ceil(blog?.length / 2);
  const numPages = Math.ceil(blog?.length / itemPerPage);

console.log("in post",searchdata)
  return (
    <div className="flex flex-col gap-14">
      {blog?.slice(curPage * itemPerPage, itemPerPage * (curPage + 1)).map((blogs) => (
          <div key={blogs.id} className="flex flex-col 2xl:max-w-[900px] ">
            <div className="overflow-hidden">
              <img
                src={`http://localhost:1337${blogs?.attributes?.Image?.data?.attributes?.url}`}
                alt=""
                className="block transition-all duration-300 hover:scale-110"
              />
            </div>
            <p className="my-5 inline text-gray-300">
              By <span className="font-bold text-gray-600">{blogs.attributes.Writer}</span>{" "}
              | {new Date(blogs.attributes.createdAt).getFullYear()+"-"+new Date(blogs.attributes.createdAt).getMonth()+"-"+new Date(blogs.attributes.createdAt).getDay()} | {blogs.attributes.catagory.data.attributes.Name
}
            </p>
            <h3 className="mb-4 text-3xl font-bold">{blogs.attributes.Title}</h3>
            <p className="mb-8 font-medium  text-gray-300">{blogs.attributes.Description
}</p>
            <div>
              <TertiaryButton>Read more</TertiaryButton>
            </div>
          </div>
        ))}

      <Pagination
        curPage={curPage}
        numPages={numPages}
        setCurPage={setCurPage}
      />
    </div>
  );
}

export default Posts;
