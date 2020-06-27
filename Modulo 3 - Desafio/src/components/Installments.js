import React from "react";
import { formatReal, valuePercent, juros } from "./helpers/helpers";
import css from "./css/styles.module.css";

export default function Installments({ inputUsuario }) {
  const { montante, taxa, periodo } = inputUsuario;
  const parcelas = juros(montante, taxa, periodo);
  const classPercentage = taxa > 0 ? css.goodPercent : css.badPercent;
  const classNumber = taxa > 0 ? css.goodReal : css.badReal;
  return (
    <div className={css.InstallmentsDivOut}>
      {parcelas.map(({ id, saldoAtual, PerdaGanho, Porcentagem }) => {
        return (
          <div key={id}>
            <div className={css.InstallmentsDivInside}>
              <div className={css.idStyle}>{id}</div>
              <div>
                <div className={classNumber}>{formatReal(saldoAtual)}</div>
                <div className={classNumber}>{formatReal(PerdaGanho)}</div>
                <div className={classPercentage}>
                  {valuePercent(Porcentagem)}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
