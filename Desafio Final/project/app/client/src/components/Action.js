import React from "react";

export default function Action({ registro, type, onActionClick }) {
  const handleIconClick = async () => {
    await onActionClick({ registro, type });
  };
  return (
    <span
      className="material-icons"
      style={{ cursor: "pointer" }}
      onClick={handleIconClick}
    >
      {type}
    </span>
  );
}
