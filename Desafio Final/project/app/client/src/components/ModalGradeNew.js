import React, { useEffect } from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");

export default function ModalGradeNew({ onClose }) {
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
    console.log(event.target.value);
  };

  const handleDate = (event) => {
    console.log(event.target.value);
  };
  const handleFormSubmit = (event) => {};
  return (
    <div>
      <Modal isOpen={true} style={styles.styleModal}>
        {/* <form onSubmit={handleFormSubmit}></form> */}
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
            <input type="text" defaultValue="descricao" />
          </div>
          <div>
            <label>category</label>
            <input type="text" defaultValue="categoria" />
          </div>
          <div>
            <label>value</label>
            <input type="text" defaultValue="value" />
          </div>
          <div>
            <input type="date" onChange={handleDate} />
          </div>
          <button className="waves-effect waves-light btn green">
            <i className="material-icons">save</i>
          </button>
        </div>
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
