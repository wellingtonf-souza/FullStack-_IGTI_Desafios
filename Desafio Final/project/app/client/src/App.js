import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Summary from "./components/divSummary.js";
import css from "./css/style.module.css";
import * as api from "./service/apiService.js";

export default function App() {
  const [startDate, setStartDate] = useState(new Date());
  const [period, setPeriod] = useState(startDate.toISOString().substring(0, 7));
  const [selectedRegistros, setSelectedRegistros] = useState([]);
  const minDate = new Date(2018, 11, 31);
  const maxDate = new Date(2021, 11, 31);
  const handleDate = (date) => {
    setStartDate(date);
    setPeriod(date.toISOString().substring(0, 7));
    //console.log(date.toISOString().substring(0, 7));
  };
  useEffect(() => {
    const getRegistros = async () => {
      const registros = await api.findAll(period);
      setSelectedRegistros(registros);
    };
    getRegistros();
  }, [period]);

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
      <div>
        <Summary inputRegistros={selectedRegistros} />
      </div>
    </div>
  );
}
