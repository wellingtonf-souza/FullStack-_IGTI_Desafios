import React from "react";
import css from "./css/styles.module.css";

export default function Form({
  inputUsuario,
  handleMontange,
  handleTaxa,
  handlePeriodo,
}) {
  const handleMontangeForm = (event) => {
    handleMontange(event);
  };
  const handleTaxaForm = (event) => {
    handleTaxa(event);
  };
  const handlePeriodoForm = (event) => {
    handlePeriodo(event);
  };
  return (
    <div className={css.FormOut}>
      <div className={css.Form}>
        <div>
          <label>Montante inicial</label>
          <input
            id="montante"
            type="number"
            min="100"
            max="100000"
            value={inputUsuario.montante}
            onChange={handleMontangeForm}
          />
        </div>
        <div>
          <label>Taxa de juros mensal</label>
          <input
            type="number"
            min="-12"
            max="12"
            value={inputUsuario.taxa}
            onChange={handleTaxaForm}
          />
        </div>
        <div>
          <label>Período (meses)</label>
          <input
            type="number"
            min="1"
            max="36"
            value={inputUsuario.periodo}
            onChange={handlePeriodoForm}
          />
        </div>
      </div>
    </div>
  );
}
