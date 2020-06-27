import React, { useState } from "react";
import Form from "./components/Form";
import Installments from "./components/Installments";

export default function App() {
  const [inputUsuario, setInput] = useState({
    montante: 1000,
    taxa: 1,
    periodo: 3,
  });
  const handleMontange = (event) => {
    setInput({ ...inputUsuario, montante: event.target.value });
  };
  const handleTaxa = (event) => {
    setInput({ ...inputUsuario, taxa: event.target.value });
  };
  const handlePeriodo = (event) => {
    setInput({ ...inputUsuario, periodo: event.target.value });
  };
  return (
    <div>
      <h2 className="center">React - Juros Compostos</h2>
      <div>
        <Form
          inputUsuario={inputUsuario}
          handleMontange={handleMontange}
          handleTaxa={handleTaxa}
          handlePeriodo={handlePeriodo}
        />
      </div>
      <div>
        <Installments inputUsuario={inputUsuario} />
      </div>
    </div>
  );
}
