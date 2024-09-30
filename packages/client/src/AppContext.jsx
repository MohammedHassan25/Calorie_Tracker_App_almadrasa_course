import { createContext, useState } from "react";

export const AppContext = createContext({
  totalCalories: 0,
  setTotalCalories: () => {},
  records: [],
  selectDate: new Date(),
  setSelectDate: () => {},
});

function AppProvider(props) {
  // eslint-disable-next-line react/prop-types
  const { children } = props;
  const [selectDate, setSelectDate] = useState(new Date());
  const [totalCalories, setTotalCalories] = useState(0);
  const [records, setRecords] = useState([]);

  return (
    <AppContext.Provider
      value={{
        totalCalories,
        setTotalCalories,
        records,
        setRecords,
        selectDate,
        setSelectDate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
