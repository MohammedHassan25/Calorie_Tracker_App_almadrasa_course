import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./DetailPage.module.css";
import Button from "@root/Commons/Button";
import { ErrorPage } from ".";

export function DetailPage() {
  const params = useParams();
  const [details, setDetails] = useState();
  const [error, setError] = useState();
  const nav = useNavigate();

  const handleBack = useCallback(() => {
    nav("..");
  }, []);

  async function loadDetail(id) {
    try {
      const response = await fetch(`http://localhost:3000/records/${id}`);
      if (!response.ok) {
        throw new Error("Failed to load record details");
      }
      const data = await response.json();
      setDetails({
        date: data.r_date,
        meal: data.r_meal,
        content: data.r_food,
        calories: data.r_cal,
      });
    } catch (error) {
      setError(error.message);
    }
  }

  useEffect(() => {
    loadDetail(params.idRecord);
  }, [params.idRecord]);

  return error
    ? ErrorPage(error)
    : details && (
        <div className={styles.container}>
          <div className={styles.item}>
            <p>Date:</p>
            <p>{details.date}</p>
          </div>
          <div className={styles.item}>
            <p>Meal:</p>
            <p>{details.meal}</p>
          </div>
          <div className={styles.item}>
            <p>Content:</p>
            <p>{details.content}</p>
          </div>
          <div className={styles.item}>
            <p>Calories:</p>
            <p>{details.calories}</p>
          </div>
          <Button type="back" onClick={handleBack}>
            Return to Back
          </Button>
        </div>
      );
}
