import { func, string } from "prop-types";
import Button from "../../shared/button/Button";

import "./filters.css";

function Filters({ filterTodos, filter }) {
  return (
    <div className="filters-container">
      <Button
        text="Todos"
        onClick={() => filterTodos("all")}
        isSelected={filter === "all"}
      />
      <Button
        text="Terminados"
        onClick={() => filterTodos("done")}
        isSelected={filter === "done"}
      />
      <Button
        text="Por hacer"
        onClick={() => filterTodos("undone")}
        isSelected={filter === "undone"}
      />
    </div>
  );
}

Filters.propTypes = {
  filterTodos: func,
  filter: string,
};

export default Filters;
