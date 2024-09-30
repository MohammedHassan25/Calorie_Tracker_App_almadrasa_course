import { useEffect, useContext } from "react";
import { RecordList } from "./RecordList";
import styles from "./CalorieRecordStyles.module.css";
import { AppContext } from "../AppContext";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useDownload } from "@root/hooks/useLoadData";
import { ErrorRecord } from "@root/Commons/ErrorRecord";

export function CalorieRecord() {
  const { setTotalCalories, records, selectDate, setSelectDate } =
    useContext(AppContext);
    
    const date = format(selectDate, "yyyy-MM-dd");
  const [error, loading] = useDownload(`http://localhost:3000/records?date=${date}`);

  const filteredRecords = records.filter((record) => record.date === date);

  const changeDateHandler = (e) => {
    const newDate = new Date(e.target.value);
    setSelectDate(newDate);
  };

  const totalCalories = filteredRecords.reduce(
    (acc, record) => acc + Number(record.calories),
    0
  );

  useEffect(() => {
    setTotalCalories(totalCalories);
  }, [totalCalories, setTotalCalories]);

  return (
    <>
    <h1 className={styles.h1}>Calorie Records</h1>
      <div className={styles.content}>
        <form action="">
          <label className={styles.label} htmlFor="Date">
            Select Date
          </label>
          <input
            className={styles.input}
            type="date"
            onChange={changeDateHandler}
            value={date}
          />
        </form>
        <Link
          className={styles.btn}
          type="button"
          to={"create"}
        >
          Add Record
        </Link>
      </div>

      {error ? (
        ErrorRecord(error)
      ) : loading ? (
        ErrorRecord("Loading ...")
      ) : (
        <>
          <div className={styles.allRecords}>
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <Link
                  to={`${record.id}`}
                  key={record.id}
                  className={styles.record}
                >
                  <RecordList
                    id={record.id}
                    key={record.id}
                    meal={record.meal}
                    content={record.content}
                    calories={Number(record.calories)}
                    loading={loading}
                    date={date}
                  />
                </Link>
              ))
            ) : (
              <p className={styles.p}>No Records</p>
            )}
          </div>
          <div className={styles.total}>
            <p>Total Calories: {totalCalories}</p>
          </div>
        </>
      )}
    </>
  );
}
