import React, { useState } from "react";

export default function InsertButton({ onPersist }) {
  const [zIndex, setzIndex] = useState(1);
  const handleInsertButton = () => {
    onPersist(true);
    setzIndex(0);
  };
  return (
    <div>
      <button
        className="btn-floating btn-large waves-effect waves-light green"
        style={{ zIndex: zIndex }}
        onClick={handleInsertButton}
      >
        <i className="material-icons">add</i>
      </button>
    </div>
  );
}
