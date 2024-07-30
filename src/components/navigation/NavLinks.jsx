import { Link } from "react-router-dom";
import { getToken } from "../../utill/helpers";
import { useEffect, useState } from "react";

const linkStyles = "hover:text-red focus:text-red focus";
// ring-offset-gray-600

function NavLinks({ onToggleNav, styles }) {
  const [tableShow,setTableShow]=useState()
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTableShow(!!getToken());
    }, 100);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);
  return (
    <ul className={styles}>
      <li>
        <Link to="/" className={linkStyles}  onClick={onToggleNav}>
          Home
        </Link>
      </li>
      <li>
        <Link to="/about" className={linkStyles} onClick={onToggleNav}>
          About
        </Link>
      </li>
      <li>
        <Link to="/gallery" className={linkStyles} onClick={onToggleNav}>
          Gallery
        </Link>
      </li>
      <li>
        <Link to="/blog" className={linkStyles} onClick={onToggleNav}>
          Blog
        </Link>
      </li>
      <li>
        <Link to="/contact" className={linkStyles} onClick={onToggleNav}>
          Contact
        </Link>
      </li>
      {tableShow && (
        <li>
          <Link to="/tables" className={linkStyles} onClick={onToggleNav}>
            Tables
          </Link>
        </li>
      )}
     
    </ul>
  );
}

export default NavLinks;
