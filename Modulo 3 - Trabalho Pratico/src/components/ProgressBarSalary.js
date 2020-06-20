import { calculateSalaryFrom } from "../helpers/salary.js";
import { percentBase, value_and_percent } from "../helpers/percentBase";
import React, { Component } from "react";
import Bar from "./Bar.js";
import css from "./css/bars.module.css";

export default class ProgressBarSalary extends Component {
  render() {
    const { fullSalary } = this.props;
    const {
      baseINSS,
      discountINSS,
      discountIRPF,
      netSalary,
    } = calculateSalaryFrom(fullSalary);
    let INSS = percentBase(baseINSS, discountINSS);
    let IRPF = percentBase(baseINSS, discountIRPF);
    let liquid = percentBase(baseINSS, netSalary);

    return (
      <div>
        <div className={css.Bars}>
          <Bar value={INSS} color={"#e67e22"} />
          <Bar value={IRPF} color={"#c0392b"} />
          <Bar value={liquid} color={"#16a085"} />
        </div>
      </div>
    );
  }
}
