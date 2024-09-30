import styles from "./EditPage.module.css";
import { format } from "date-fns";
import { AppContext } from "../AppContext";
import {
  useContext,
  useReducer,
  useRef,
  useCallback,
  useMemo,
  useState,
} from "react";
import FormInput from "../Commons/FormInput";
import Button from "../Commons/Button";
import { LOAD_RECORDS } from "@root/hooks/useLoadData";
import { useNavigate } from "react-router-dom";

const DEFAULT_VALUES = {
  Date: { value: format(new Date(), "yyyy-MM-dd"), valid: true },
  Content: false,
  Meal: false,
  Calories: true,
};

function formReducer(state, action) {
  const { key, value, auxValue } = action;

  let valid;
  switch (key) {
    case "Content":
      valid =
        (auxValue < 0 && value?.toLowerCase() === "sport") ||
        (auxValue >= 0 && value?.toLowerCase() !== "sport");
      return {
        ...state,
        Content: !!value,
        Calories: valid,
        id: crypto.randomUUID(),
      };
    case "Calories":
      valid =
        (auxValue?.toLowerCase() === "sport" && Number(value) < 0) ||
        (auxValue?.toLowerCase() !== "sport" && Number(value) >= 0);
      return {
        ...state,
        Calories: valid,
        id: crypto.randomUUID(),
      };
    default:
      return {
        ...state,
        [key]: !!value,
        id: crypto.randomUUID(),
      };
  }
}

export function EditPage() {
  const { totalCalories, setSelectDate, selectDate, setRecords } =
    useContext(AppContext);

  const [formValid, dispatchFn] = useReducer(formReducer, DEFAULT_VALUES);

  const {
    Content: isContentValid,
    Meal: isMealValid,
    Calories: isCaloriesValid,
  } = formValid;

  const isFormValid = useMemo(() => {
    return isContentValid && isMealValid && isCaloriesValid;
  }, [isContentValid, isMealValid, isCaloriesValid]);

  const contentRef = useRef();
  const caloriesRef = useRef();
  const mealRef = useRef();

  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleChangeDate = (e) => {
    const newDate = new Date(e.target.value);
    setSelectDate(newDate);
    localStorage.setItem("totalCalories", totalCalories);
    dispatchFn({
      key: "Date",
      value: format(newDate, "yyyy-MM-dd"),
    });
  };

  const handleChangeMeal = () => {
    dispatchFn({ key: "Meal", value: mealRef.current.value });
  };
  const handleChangeContent = () => {
    dispatchFn({
      key: "Content",
      value: contentRef.current.value,
      auxValue: Number(caloriesRef.current.value),
    });
  };
  const handleChangeCalories = () => {
    const newCalories = Number(caloriesRef.current.value);
    dispatchFn({
      key: "Calories",
      value: newCalories,
      auxValue: contentRef.current.value,
    });
  };

  const handleReset = useCallback(() => {
    dispatchFn({ key: "Content", value: DEFAULT_VALUES.Content });
    dispatchFn({ key: "Meal", value: DEFAULT_VALUES.Meal });
    dispatchFn({ key: "Calories", value: DEFAULT_VALUES.Calories });
  }, []);

  const handleCancel = useCallback(() => {
    navigate("..");
  }, []);

  const apiUrl = "http://localhost:3000/records";
  async function createRecord(selectDate, mealRef, contentRef, caloriesRef) {
    setError(null);
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify({
          r_date: format(selectDate, "yyyy-MM-dd"),
          r_meal: mealRef.current.value,
          r_food: contentRef.current.value,
          r_cal: Number(caloriesRef.current.value),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to create new record");
      }

      await LOAD_RECORDS(apiUrl, setRecords, setError, () => {});
      return true;
    } catch (error) {
      setError(error.message);
      return false;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await createRecord(
      selectDate,
      mealRef,
      contentRef,
      caloriesRef
    );

    if (success) {
      navigate("..");
    } else {
      console.log(error);
    }
  };

  return (
    <>
      {error && <p className={styles["record"]}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles["form"]} id="Record">
        <div className={styles["row-form"]}>
          <div className={styles["nested-div-form"]}>
            <FormInput
              label="Date"
              type="date"
              name="Date"
              value={selectDate ? format(selectDate, "yyyy-MM-dd") : ""}
              onChange={handleChangeDate}
              isValid
            ></FormInput>
          </div>
          <div className={styles["nested-div-form"]}>
            <FormInput
              label="Content"
              type="text"
              onChange={handleChangeContent}
              ref={contentRef}
              isValid={isContentValid}
            />
          </div>
        </div>
        <div className={styles["row-form"]}>
          <div className={styles["nested-div-form"]}>
            <FormInput
              label="Meal"
              list="Meal"
              name="Meal"
              placeholder="Breakfast"
              onChange={handleChangeMeal}
              isValid={isMealValid}
              ref={mealRef}
            ></FormInput>
          </div>
          <div className={styles["nested-div-form"]}>
            <FormInput
              label="Calories"
              type="number"
              onChange={handleChangeCalories}
              ref={caloriesRef}
              step={5}
              placeholder="0"
              isValid={isCaloriesValid}
            />
          </div>
        </div>
      </form>
      <div className={styles["btn"]}>
        <Button className={styles.record} type="submit" form="Record" disabled={!isFormValid}>
          Add Record
        </Button>
        <Button className={styles.reset} type="reset" form="Record" onClick={handleCancel}>
          Cancel
        </Button>
        <Button className={styles.cancel} type="reset" form="Record" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </>
  );
}
