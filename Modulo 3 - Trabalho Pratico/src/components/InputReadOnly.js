import React, { Component } from "react";
import { calculateSalaryFrom } from "../helpers/salary.js";
import { percentBase, value_and_percent } from "../helpers/percentBase";
import { formatReal } from "../helpers/formatReal";
import css from "./css/readOnly.module.css";

export default class InputReadOnly extends Component {
  render() {
    const { fullSalary } = this.props;
    const {
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      netSalary,
    } = calculateSalaryFrom(fullSalary);
    return (
      <div>
        <div className={css.div_Othervalues}>
          <div>
            <label>Base INSS</label>
            <input
              type="text"
              value={formatReal(baseINSS)}
              className={css.Base}
              readOnly
            />
          </div>
          <div>
            <label>Desconto INSS</label>
            <input
              type="text"
              value={value_and_percent(
                formatReal(discountINSS),
                percentBase(baseINSS, discountINSS)
              )}
              className={css.INSS}
              readOnly
            />
          </div>
          <div>
            <label>Base IRRF</label>
            <input
              type="text"
              value={formatReal(baseIRPF)}
              className={css.Base}
              readOnly
            />
          </div>
          <div>
            <label>Desconto IRPF</label>
            <input
              type="text"
              value={value_and_percent(
                formatReal(discountIRPF),
                percentBase(baseINSS, discountIRPF)
              )}
              className={css.IRPF}
              readOnly
            />
          </div>
          <div>
            <label>Salário liquido</label>
            <input
              type="text"
              value={value_and_percent(
                formatReal(netSalary),
                percentBase(baseINSS, netSalary)
              )}
              className={css.netSalary}
              readOnly
            />
          </div>
        </div>
      </div>
    );
  }
}
