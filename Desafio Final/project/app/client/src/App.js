import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DivSummary from "./components/DivSummary.js";
import css from "./css/style.module.css";
import * as api from "./service/apiService.js";
import DivFilter from "./components/DivFilter.js";
import InsertButton from "./components/InsertButton.js";
import ListRegistros from "./components/ListRegistros.js";
import ModalGradeNew from "./components/ModalGradeNew.js";
import ModalGradeEdit from "./components/ModalGradeEdit.js";

export default function App() {
  const [startDate, setStartDate] = useState(new Date());
  const [period, setPeriod] = useState(startDate.toISOString().substring(0, 7));
  const [selectedRegistros, setSelectedRegistros] = useState([]);
  const [useFilter, setUseFilter] = useState("");
  const [isModalOPen, setIsModalOpen] = useState(false);
  const [isModalEditOPen, setIsModalEditOpen] = useState(false);
  const [RegistroEdit, setRegistroEdit] = useState({});

  const minDate = new Date(2018, 11, 31);
  const maxDate = new Date(2021, 11, 31);
  const handleDate = (date) => {
    setStartDate(date);
    setPeriod(date.toISOString().substring(0, 7));
    //console.log(date.toISOString().substring(0, 7));
  };
  useEffect(() => {
    const getRegistros = async () => {
      if (useFilter.length === 0) {
        const registros = await api.findAll(period);
        setSelectedRegistros(registros);
      } else {
        const registros = await api.filterByDescription(period, useFilter);
        setSelectedRegistros(registros);
      }
    };
    getRegistros();
  }, [period, useFilter]);

  const handleChangeFilter = async (newText) => {
    setUseFilter(newText);
  };
  const handleDelete = async (registro) => {
    const registroDeletado = await api.deleteById(registro._id);
    if (useFilter.length === 0) {
      const registros = await api.findAll(period);
      setSelectedRegistros(registros);
    } else {
      const registros = await api.filterByDescription(period, useFilter);
      setSelectedRegistros(registros);
    }
  };
  const handlePersistEdit = async (registro) => {
    setRegistroEdit(registro);
    setIsModalEditOpen(true);
  };

  const handleCloseEdit = async () => {
    setIsModalEditOpen(false);
  };

  const handleSaveEdit = async (newRegistro) => {
    await api.update(newRegistro);
    const { yearMonth } = newRegistro;
    const registros = await api.findAll(yearMonth);
    setSelectedRegistros(registros);
  };

  const handlePersistNew = async (type) => {
    setIsModalOpen(type);
  };

  const handleSaveNew = async (newRegistro) => {
    await api.create(newRegistro);
    const { yearMonth } = newRegistro;
    const registros = await api.findAll(yearMonth);
    setSelectedRegistros(registros);
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
        <InsertButton onPersist={handlePersistNew} />
        <DivFilter filter={useFilter} onChangeFilter={handleChangeFilter} />
      </div>
      <div>
        <ListRegistros
          registros={selectedRegistros}
          onDelete={handleDelete}
          onPersist={handlePersistEdit}
        />
      </div>
      {isModalOPen && (
        <ModalGradeNew onClose={handlePersistNew} onSave={handleSaveNew} />
      )}
      {isModalEditOPen && (
        <ModalGradeEdit
          onClose={handleCloseEdit}
          onSave={handleSaveEdit}
          Registro={RegistroEdit}
        />
      )}
    </div>
  );
}
