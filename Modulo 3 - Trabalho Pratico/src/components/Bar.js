import React, { Component } from "react";

export default class Bar extends Component {
  render() {
    const { value, color } = this.props;
    return (
      <div
        style={{ width: value + "%", height: "20px", backgroundColor: color }}
      />
    );
  }
}
