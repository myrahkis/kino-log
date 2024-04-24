import styles from "./_navbar.module.scss";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className={styles["navbar"]}>
      <NavLink
        to={"/"}
        className={({ isActive }) => {
          return isActive ? styles.active : styles.navLink;
        }}
      >
        Home
      </NavLink>
      <NavLink
        to={"/watched"}
        className={({ isActive }) => {
          return isActive ? styles.active : styles.navLink;
        }}
      >
        Watched
      </NavLink>
    </div>
  );
}

export default Navbar;
