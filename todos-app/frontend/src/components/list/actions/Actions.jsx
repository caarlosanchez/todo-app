import { func } from "prop-types";
import Button from "../../shared/button/Button";

import "./actions.css";

function Actions({ removeAllTodos, removeDoneTodos }) {
  return (
    <div className="actions-container">
      <Button text="Eliminar todos" onClick={removeAllTodos} error />
      <Button
        text="Eliminar tareas terminadas"
        onClick={removeDoneTodos}
        error
      />
    </div>
  );
}

Actions.propTypes = {
  removeAllTodos: func,
  removeDoneTodos: func,
};

export default Actions;
