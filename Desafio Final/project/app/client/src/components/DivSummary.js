import React from "react";
import css from "../css/style.module.css";
import { formatReal } from "../helpers/helpers.js";

export default function DivSummary({ inputRegistros }) {
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
  const colorSaldo = saldo > 0 ? "#65B051" : "salmon";
  return (
    <div className={css.Summary}>
      <div>
        <label>Registros</label>
        <div>
          {" "}
          <strong>{qtRegistro}</strong>{" "}
        </div>
      </div>
      <div>
        <label>Receitas</label>
        <div>
          {" "}
          <strong style={{ color: "mediumturquoise" }}>
            {formatReal(receitas)}
          </strong>{" "}
        </div>
      </div>
      <div>
        <label>Despesas</label>
        <div>
          {" "}
          <strong style={{ color: "salmon" }}>
            {formatReal(despesas)}
          </strong>{" "}
        </div>
      </div>
      <div>
        <label>Saldo</label>
        <div>
          {" "}
          <strong style={{ color: colorSaldo }}>
            {formatReal(saldo)}
          </strong>{" "}
        </div>
      </div>
    </div>
  );
}
