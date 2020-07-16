import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import css from "./css/style.module.css";

export default function App() {
  const [startDate, setStartDate] = useState(new Date());
  const minDate = new Date(2019, 11, 30);
  const maxDate = new Date(2021, 11, 31);
  const handleDate = (date) => {
    setStartDate(date);
    // console.log(date.toISOString().substring(0, 7));
  };
  return (
    <div>
      <h3 className="center">Controle Financeiro Pessoal</h3>
      <div className={css.DatePickerSelectPeriod}>
        <DatePicker
          selected={startDate}
          onChange={handleDate}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          minDate={minDate}
          maxDate={maxDate}
          className={css.DatePickerSelectPeriodInput}
        />
      </div>
    </div>
  );
}
