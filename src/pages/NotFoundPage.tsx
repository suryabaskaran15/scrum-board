import React from "react";
import { Link } from "react-router-dom";
import NotFound from "../assets/images/image.png";
import styles from "../assets/styles/NotFoundPage.module.scss";

const NotFoundPage = () => {
  return (
    <div className={styles["not-found-container"]}>
      <h1 className={styles["error-code"]}>404</h1>
      <p className={styles["error-text"]}>Oops! The page you are looking for does not exist.</p>
      <img src={NotFound} alt="404 Not Found" />
      <Link to="/" className={styles["home-button"]}>
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
