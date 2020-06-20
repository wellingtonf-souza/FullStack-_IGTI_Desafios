import React, { Component } from "react";
import InputReadOnly from "./InputReadOnly.js";
import ProgressBarSalary from "./ProgressBarSalary.js";
import css from "./css/style.module.css";

export default class InputFullSalary extends Component {
  constructor() {
    super();
    this.state = {
      fullSalary: 4000,
    };
  }
  handlefullSalary = (event) => {
    const SalaryUpdate = event.target.value;
    this.setState({ fullSalary: SalaryUpdate });
  };
  render() {
    const { fullSalary } = this.state;
    return (
      <div>
        <div className={css.InputPrincipal}>
          <label>Salário Bruto</label>
          <input
            type="number"
            value={fullSalary}
            onChange={this.handlefullSalary}
          />
        </div>
        <InputReadOnly fullSalary={fullSalary} />
        <ProgressBarSalary fullSalary={fullSalary} />
      </div>
    );
  }
}
