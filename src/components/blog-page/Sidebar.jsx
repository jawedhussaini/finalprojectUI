import SearchBar from "./SearchBar";
import Categories from "./Categories";


function Sidebar() {

  return (
    <aside className="hidden 2xl:block">
      <div className="sticky top-[calc(100dvh-2310px)] flex flex-col gap-10">
        <SearchBar />

        <Categories />

    

    

     
      </div>
    </aside>
  );
}

export default Sidebar;
