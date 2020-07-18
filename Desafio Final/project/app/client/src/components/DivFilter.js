import React from "react";

export default function DivFilter(props) {
  const { filter } = props;
  const handleInputFilter = (event) => {
    const newText = event.target.value;
    props.onChangeFilter(newText);
  };
  return (
    <div style={{ marginLeft: "30px" }}>
      <label htmlFor="filtered">Filtro</label>
      <input
        id="filtered"
        type="text"
        value={filter}
        onChange={handleInputFilter}
      />
    </div>
  );
}
