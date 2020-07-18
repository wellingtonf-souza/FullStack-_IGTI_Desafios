import React from "react";
import { formatReal } from "../helpers/helpers.js";
import css from "../css/style.module.css";

export default function ListRegistros({ registros }) {
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
                  <span
                    className="material-icons"
                    style={{ cursor: "pointer" }}
                  >
                    edit
                  </span>
                  <span
                    className="material-icons"
                    style={{ cursor: "pointer" }}
                  >
                    delete_forever
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
