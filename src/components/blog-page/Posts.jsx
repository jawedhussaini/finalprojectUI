import { useEffect, useState } from "react";

import TertiaryButton from "../buttons/TertiaryButton";
import Pagination from "../pagination/Pagination";
import { Link } from "react-router-dom";

function Posts({ catagory, searchdata }) {
  const [blog, setBlogs] = useState(null);


  const API = process.env.REACT_APP_API;

  const getData = async () => {
    try {
      const response = await fetch(
        `${API}/blogs?populate=*&${
          catagory
            ? `[filters][catagory][Name][$eq]=${catagory}`
            : ""
        }&${
          searchdata ? `[filters][Title][$containsi]=${searchdata}` : ""
        }`
      );

      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();
      setBlogs(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch data when the page is visited or revisited

  // Optionally, if you still want to refetch data when catagory or searchdata changes
  useEffect(() => {
    getData();
  }, [catagory, searchdata, API]);

  const [curPage, setCurPage] = useState(0);
  const itemPerPage = Math.ceil(blog?.length / 2);
  const numPages = Math.ceil(blog?.length / itemPerPage);

  const truncateDescription = (description, maxLength) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + "...";
  };

  return (
    <div className="flex flex-col gap-14">
      {blog
        ?.slice(curPage * itemPerPage, itemPerPage * (curPage + 1))
        .map((blogs) => (
          <div key={blogs.id} className="flex flex-col 2xl:max-w-[900px] ">
            <div className="overflow-hidden">
              <img
                src={`${blogs?.attributes?.Image?.data?.attributes?.url}`}
                alt=""
                className="block transition-all duration-300 hover:scale-110"
              />
            </div>
            <p className="my-5 inline text-gray-300">
              By{" "}
              <span className="font-bold text-gray-600">
                {blogs.attributes.Writer}
              </span>{" "}
              |{" "}
              {new Date(blogs.attributes.createdAt).getFullYear() +
                "-" +
                new Date(blogs.attributes.createdAt).getMonth() +
                "-" +
                new Date(blogs.attributes.createdAt).getDay()}{" "}
              | {blogs.attributes.catagory.data.attributes.Name}
            </p>
            <h3 className="mb-4 text-3xl font-bold">
              {blogs.attributes.Title}
            </h3>
            <p className="mb-8 font-medium  text-gray-300">
              {truncateDescription(blogs.attributes.Description, 100)}
            </p>
            <div>
              <Link to={`/blog/${blogs.id}`}>
                <span className="focus text-md relative inline-flex items-center gap-1.5 bg-red px-8 py-4 font-bold uppercase text-white before:absolute before:left-3 before:top-[-12px] before:z-[-1] before:h-full before:w-full before:border before:border-solid before:border-gray-150/50 before:transition-all before:duration-500 hover:before:translate-x-[-12px] hover:before:translate-y-[12px] hover:before:border-red/50">
                  Read more
                </span>
              </Link>
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
