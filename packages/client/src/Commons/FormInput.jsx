import styles from "./FormInput.module.css";
import { forwardRef } from "react";

// eslint-disable-next-line react/display-name
const FormInput = forwardRef((props, ref) => {
  // eslint-disable-next-line react/prop-types
  const { label, type, onChange, isValid, list, ...rest } = props;
  const Elememt = list ? (
    <>
      <input
        type={type}
        name={label}
        onChange={onChange}
        ref={ref}
        className={`${!isValid ? styles["notValid"] : styles["input"]}`}
        {...rest}
      />
      <datalist id="Meal">
        <option value="Breakfast"></option>
        <option value="Lunch"></option>
        <option value="Dinner"></option>
        <option value="Snack"></option>
      </datalist>
    </>
  ) : (
    <>
      <input
        type={type}
        name={label}
        onChange={onChange}
        ref={ref}
        className={`${!isValid ? styles["notValid"] : styles["input"]}`}
        {...rest}
      />
    </>
  );
  return (
    <>
      <label>{label}:</label>
      {Elememt}
    </>
  );
});

export default FormInput;
