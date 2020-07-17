import React from "react";
import css from "../css/style.module.css";
import { formatReal } from "../helpers/helpers.js";

export default function Summary({ inputRegistros }) {
  const qtRegistro = inputRegistros.length;
  const receitas = inputRegistros
    .filter((registro) => {
      return registro.type === "+";
    })
    .reduce((accumulator, current) => {
      return accumulator + current.value;
    }, 0);

  const despesas = inputRegistros
    .filter((registro) => {
      return registro.type === "-";
    })
    .reduce((accumulator, current) => {
      return accumulator + current.value;
    }, 0);

  const saldo = receitas - despesas;
  return (
    <div className={css.Summary}>
      <div>
        <label>Registros</label>
        <div> {qtRegistro} </div>
      </div>
      <div>
        <label>Receitas</label>
        <div> {formatReal(receitas)} </div>
      </div>
      <div>
        <label>Despesas</label>
        <div> {formatReal(despesas)} </div>
      </div>
      <div>
        <label>Saldo</label>
        <div> {formatReal(saldo)} </div>
      </div>
    </div>
  );
}
