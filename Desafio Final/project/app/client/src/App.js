import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DivSummary from "./components/DivSummary.js";
import css from "./css/style.module.css";
import * as api from "./service/apiService.js";
import DivFilter from "./components/DivFilter.js";
import InsertButton from "./components/InsertButton.js";
import ListRegistros from "./components/ListRegistros.js";

export default function App() {
  const [startDate, setStartDate] = useState(new Date());
  const [period, setPeriod] = useState(startDate.toISOString().substring(0, 7));
  const [selectedRegistros, setSelectedRegistros] = useState([]);
  const [useFilter, setUseFilter] = useState("");
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

  const handleChangeFilter = async (newText) => {
    if (newText.length === 0) {
      setUseFilter(newText);
      const registros = await api.findAll(period);
      setSelectedRegistros(registros);
    } else {
      setUseFilter(newText);
      const registros = await api.filterByDescription(period, useFilter);
      setSelectedRegistros(registros);
    }
  };

  return (
    <div className={css.container}>
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
        <DivSummary inputRegistros={selectedRegistros} />
      </div>
      <div className={css.InsertFilter}>
        <InsertButton />
        <DivFilter filter={useFilter} onChangeFilter={handleChangeFilter} />
      </div>
      <div>
        <ListRegistros registros={selectedRegistros} />
      </div>
    </div>
  );
}
