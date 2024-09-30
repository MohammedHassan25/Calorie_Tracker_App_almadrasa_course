import Button from "@root/Commons/Button";
import styles from "./RecordList.module.css";
import { useDownload } from "@root/hooks/useLoadData";

export function RecordList(props) {
  // eslint-disable-next-line react/prop-types
  const { meal, content, calories, id, date } = props;
  const [, , refreshDate] = useDownload(
    `http://localhost:3000/records?date=${date}`
  );

  const deleteHandler = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3000/records/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      await refreshDate();
    }
  };

  return (
    <div className={styles.record}>
      <div className={styles.details ? styles.details : ""}>
        <b>{meal}</b>
        <b>{content}</b>
        <b className={styles.caloriesNumber}>{calories}</b>
      </div>
      <Button type="delete" onClick={deleteHandler}>
        Delete
      </Button>
    </div>
  );
}
