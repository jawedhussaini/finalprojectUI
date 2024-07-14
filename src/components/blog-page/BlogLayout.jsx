import Posts from "./Posts";
import Sidebar from "../blog-page/Sidebar";
import { useState } from "react";
import SearchBar from "./SearchBar";
import Categories from "./Categories";



function BlogLayout() {
    const [dataFromChild, setDataFromChild] = useState(null);
    const [search,setSearch]=useState(null)
      function handleDataFromChild(data) {
    setDataFromChild(data);
  }
  function handleDataForSearch(data){
    setSearch(data)
  }

 

  return (
    <section className="px-6 py-32">
      <div className="container 2xl:flex 2xl:gap-20">
        <Posts catagory={dataFromChild} searchdata={search}/>

          <aside className="hidden 2xl:block">
      <div className="sticky top-[calc(100dvh-2310px)] flex flex-col gap-10">
        <SearchBar searchdata={handleDataForSearch}/>

        <Categories sendDataToParent={handleDataFromChild}/>

    

    

     
      </div>
    </aside>
      </div>
    </section>
  );
}

export default BlogLayout;
