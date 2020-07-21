import React, { useEffect, useState } from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");

export default function ModalGradeNew({ onClose, onSave }) {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState();
  const [category, setCategory] = useState("");
  const [yearMonthDay, setYearMonthDay] = useState();
  const [type, setType] = useState("");

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      onClose(false);
    }
  };

  const handleClose = () => {
    onClose(false);
  };

  const handleType = (event) => {
    setType(event.target.value);
  };

  const handleValue = (event) => {
    setValue(Number(event.target.value));
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleDate = (event) => {
    setYearMonthDay(event.target.value);
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newRegistro = {
      description: description,
      value: value,
      category: category,
      year: Number(yearMonthDay.slice(0, 4)),
      month: Number(yearMonthDay.slice(5, 7)),
      day: Number(yearMonthDay.slice(8, 10)),
      yearMonth: yearMonthDay.slice(0, 7),
      yearMonthDay: yearMonthDay,
      type: type,
    };
    console.log(newRegistro);
    onClose(false);
  };
  return (
    <div>
      <Modal isOpen={true} style={styles.styleModal}>
        <form onSubmit={handleFormSubmit}>
          <div>
            <span style={{ padding: "15px" }}>Novo Registro</span>
            <button
              className="btn-floating btn-large waves-effect waves-light red"
              onClick={handleClose}
            >
              <i className="material-icons">close</i>
            </button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <label
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <input
                name="NewType"
                type="radio"
                value="-"
                onChange={handleType}
              />
              <span></span>
              <h5>Despesa</h5>
            </label>
            <label
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <input
                name="NewType"
                type="radio"
                value="+"
                onChange={handleType}
              />
              <span></span>
              <h5>Receita</h5>
            </label>
          </div>
          <div>
            <div>
              <label>description</label>
              <input type="text" onChange={handleDescription} />
            </div>
            <div>
              <label>category</label>
              <input type="text" onChange={handleCategory} />
            </div>
            <div>
              <label>value</label>
              <input type="text" onChange={handleValue} />
            </div>
            <div>
              <input type="date" onChange={handleDate} />
            </div>
            <button className="waves-effect waves-light btn green">
              <i className="material-icons">save</i>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

const styles = {
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "40px",
  },
  styleModal: {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%,-50%)",
    },
  },
};
