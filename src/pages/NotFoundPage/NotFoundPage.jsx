import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => (
  <div>
    <h1>404 - Page Not Found</h1>
    <Link to="/">Go Home</Link>
  </div>
);

export default NotFoundPage;
