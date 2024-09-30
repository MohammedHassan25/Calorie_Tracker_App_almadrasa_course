import { NavLink } from "react-router-dom";
import styles from "./SideNav.module.css";

const CLASS_NAME = ({isActive}) => (isActive ? styles.active : undefined);

function SideNav() {
  return (
    <nav className={styles.nav}>
      <h1 className={styles.title}>Calorie Tracker</h1>
      <NavLink to="" end className={CLASS_NAME}>Home</NavLink>
      <NavLink to="track" className={CLASS_NAME}>Track</NavLink>
    </nav>
  );
}

export default SideNav;
