import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navigation.modules.css";

const Navigation = () => (
  <nav className="">
    <NavLink
      to="/"
      className={({ isActive }) => (isActive ? styles.active : "")}
    >
      Home
    </NavLink>
    <NavLink
      to="/movies"
      className={({ isActive }) => (isActive ? styles.active : "")}
    >
      Movies
    </NavLink>
  </nav>
);

export default Navigation;
