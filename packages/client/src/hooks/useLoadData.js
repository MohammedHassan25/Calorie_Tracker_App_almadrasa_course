import { AppContext } from "@root/AppContext";
import { useContext, useState, useEffect } from "react";

export const LOAD_RECORDS = async (apiUrl, setRecords, setError, setLoading) => {
  try {
    const response = await fetch(apiUrl);
    if (response.status === 404) {
      throw new Error("Data Not found");
    }
    if (!response.ok) {
      throw new Error("Unknown Error");
    }
    const data = await response.json();
    setRecords(
      data.result.map((record) => ({
        id: record.id,
        date: record.r_date,
        meal: record.r_meal,
        content: record.r_food,
        calories: record.r_cal,
      }))
    );
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};

export function useDownload(apiUrl) {
  const { setRecords } = useContext(AppContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const refreshData = async () => await LOAD_RECORDS(apiUrl, setRecords, setError, setLoading);

  useEffect(() => {
    setLoading(true);
    setError(null);
    refreshData();
  }, [apiUrl]);

  return [error, loading, refreshData];
}
