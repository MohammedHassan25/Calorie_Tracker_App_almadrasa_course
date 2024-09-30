import styles from "./ErrorRecord.module.css";

export function ErrorRecord(somethingSaying) {
  return (
    <div className={styles.allRecords}>
      <p className={styles.p}>{somethingSaying}</p>
    </div>
  );
}
