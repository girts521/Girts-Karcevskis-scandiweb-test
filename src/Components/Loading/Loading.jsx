import { Component } from "react";
import styles from "./styles.module.scss";

class Loading extends Component {
  render() {
    return (
      <div className={styles.container}>
        <svg
          className={styles.spinner}
          viewBox="0 0 66 66"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className={styles.path}
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            cx="33"
            cy="33"
            r="30"
          ></circle>
        </svg>
      </div>
    );
  }
}

export default Loading;
