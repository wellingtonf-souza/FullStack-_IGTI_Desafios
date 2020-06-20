import React, { Component } from "react";
import InputFullSalary from "./components/InputFullSalary.js";

export default class App extends Component {
  render() {
    return (
      <div>
        <h1 className="center"> React Salário </h1>
        <InputFullSalary />
      </div>
    );
  }
}
