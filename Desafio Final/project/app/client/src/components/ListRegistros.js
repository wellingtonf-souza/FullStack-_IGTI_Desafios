import React from "react";
import { formatReal } from "../helpers/helpers.js";
import css from "../css/style.module.css";
import Action from "./Action.js";

export default function ListRegistros({ registros, onDelete, onPersist }) {
  const handleActionClick = async ({ registro, type }) => {
    if (type === "delete_forever") {
      onDelete(registro);
    }
  };
  return (
    <div
      style={{
        marginLeft: "250px",
        marginRight: "200px",
      }}
    >
      <table className={`table ${css.TableRegistro}`}>
        <thead>
          <tr>
            <th>Day</th>
            <th>Category and description</th>
            <th>Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((registro) => {
            const colorRow = registro.type === "+" ? "#65B051" : "salmon";
            return (
              <tr
                key={registro._id}
                className={css.trRegistro}
                style={{ backgroundColor: colorRow }}
              >
                <td>{registro.day}</td>
                <td>
                  <div>
                    <div>
                      <strong>{registro.category}</strong>
                    </div>
                    <div>
                      <span>{registro.description}</span>
                    </div>
                  </div>
                </td>
                <td>{formatReal(registro.value)}</td>
                <td>
                  <Action
                    registro={registro}
                    type="edit"
                    onActionClick={handleActionClick}
                  />
                  <Action
                    registro={registro}
                    type="delete_forever"
                    onActionClick={handleActionClick}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
