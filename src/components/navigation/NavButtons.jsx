import { Link } from "react-router-dom";
import { FaBars, FaRegUser, FaChartBar } from "react-icons/fa6";

const btnStyles = `hover:text-red text-white transition-colors duration-300 focus`;

function NavButtons({ onToggleNav, onToggleSidebar }) {
  return (
    <div className="flex items-center justify-between gap-7">
      <button className={`3xl:hidden ${btnStyles}`} onClick={onToggleNav}>
        <FaBars className="h-6 w-6" />
      </button>
      <Link to="/" className={btnStyles}>
        <FaRegUser className="h-6 w-6" />
      </Link>
      <button className={btnStyles}>
        <FaChartBar className="h-6 w-6" onClick={onToggleSidebar} />
      </button>
   
    </div>
  );
}

export default NavButtons;
