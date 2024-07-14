import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

function SearchBar({searchdata}) {
  const [search,setSearch]=useState(null)
    function handleClick(name) {
    searchdata(name);
  }

    function  DeleteSearchInputData() {
    searchdata(null);
    }
 
  return (
    <div className="flex">
       <button onClick={()=>DeleteSearchInputData()} className="focus rounded-md mr-2 bg-red p-4 text-white">
        Restart
      </button>
      <input
        type="text"
        placeholder="Search here..."
        className="focus w-full rounded-l-md border border-gray-150 px-4"
        onChange={(e)=>setSearch(e.target.value)}
      />
      <button onClick={()=>handleClick(search)} className="focus ml-[-1px] rounded-r-md bg-red p-4 text-white">
        <FaMagnifyingGlass />
      </button>
    </div>
  );
}

export default SearchBar;
