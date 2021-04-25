import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <NavLink
      exact
        className={styles.navbarLink}
        to="/"
        activeClassName={styles.navbarLink_active}
      >
        Home
      </NavLink>

      <NavLink
        className={styles.navbarLink}
        to="/movies"
        activeClassName={styles.navbarLink_active}
      >
        Movies
      </NavLink>
    </nav>
  );
}
