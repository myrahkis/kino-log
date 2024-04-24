import styles from "./_navbar.module.scss";
import { NavLink } from "react-router-dom";

function Navbar({searchQuery, onSearch}) {
    function handleSearch(e) {
        onSearch(e.target.value);
    }

  return (
    <div className={styles["navbar"]}>
      <NavLink
        to={"/"}
        className={({ isActive }) => {
          return isActive ? styles["navbar__nav-link__active"] : styles["navbar__nav-link"];
        }}

      >
        Home
      </NavLink>
      <NavLink
        to={"/watched"}
        className={({ isActive }) => {
          return isActive ? styles["navbar__nav-link__active"] : styles["navbar__nav-link"];
        }}
      >
        Watched
      </NavLink>
      <input className={styles['navbar__input']} value={searchQuery} onChange={handleSearch}></input>
    </div>
  );
}

export default Navbar;
