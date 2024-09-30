import { memo } from "react";
import styles from "./Button.module.css";

function Button(props) {
  // eslint-disable-next-line react/prop-types
  const { type, children, ...rst } = props;
  return (
    <button {...rst} className={styles[type]} type={type}>
      {children}
    </button>
  );
}

export default memo(Button);
