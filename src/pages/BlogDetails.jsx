import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const API = process.env.REACT_APP_API;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${API}/blogs/${id}?populate=*`);
        if (!response.ok) {
          throw new Error(response.status);
        }
        const data = await response.json();
        setBlog(data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBlog();
  }, [id, API]);

  if (!blog) return <div>Loading...</div>;

  console.log("details",blog)

  return (
     <div>
      {
          <div key={blog.id} className="flex flex-col 2xl:max-w-[900px] container mt-10 mb-10">
            <div className="overflow-hidden">
              <img
                src={`http://localhost:1337${blog?.attributes?.Image?.data?.attributes?.url}`}
                alt=""
                className="block transition-all duration-300 hover:scale-110"
              />
            </div>
            <p className="my-5 inline text-gray-300">
              By <span className="font-bold text-gray-600">{blog.attributes.Writer}</span>{" "}
              | {new Date(blog.attributes.createdAt).getFullYear()+"-"+new Date(blog.attributes.createdAt).getMonth()+"-"+new Date(blog.attributes.createdAt).getDay()} | {blog.attributes.catagory.data.attributes.Name
}
            </p>
            <h3 className="mb-4 text-3xl font-bold">{blog.attributes.Title}</h3>
            <p className="mb-8 font-medium  text-gray-300">{blog.attributes.Description}</p>
            <div>
            </div>
          </div>
        }
    </div>
  );
};

export default BlogDetails;
