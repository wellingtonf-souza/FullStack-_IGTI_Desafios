import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import css from "./css/graph.module.css";

export default class ScrewThread extends Component {
  render() {
    const { INSS, IRPF, liquid } = this.props;
    const data_graph = {
      labels: ["INSS", "IRPF", "Líquido"],
      datasets: [
        {
          backgroundColor: ["#e67e22", "#c0392b", "#16a085"],
          data: [INSS, IRPF, liquid],
        },
      ],
    };
    return (
      <div className={css.div_graph}>
        <Doughnut
          data={data_graph}
          options={{ cutoutPercentage: 70, maintainAspectRatio: false }}
        />
      </div>
    );
  }
}
