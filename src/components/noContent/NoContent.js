import { Link } from "react-router-dom";
import { useEffect } from "react";

//styles
import styles from "./NoContent.module.css";

export default function NoContent() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles["no-content"]}>
      <div className={styles["no-content__message-box"]}>
        <p className={styles["no-content__message-box__message"]}>
          This website is an example developed to demonstrate my capabilities.
          Therefore it only has the landing page currently. Other pages will
          developed at a later date.
        </p>

        <Link className={styles["no-content__message-box__button"]} to={"/"}>
          Back to home
        </Link>
      </div>
    </div>
  );
}
