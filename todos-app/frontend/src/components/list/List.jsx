import { array, func, string } from "prop-types";
import Filters from "./filters/Filters";
import Todos from "./todos/Todos";
import Actions from "./actions/Actions";
import Block from "../shared/block/Block";

import "./list.css";

function List({
  todos,
  filter,
  filterTodos,
  removeTodo,
  removeAllTodos,
  removeDoneTodos,
  changeStateTodo,
}) {
  // if (todos.length === 0) {
  //   return (
  //     <Block text="Mis tareas">
  //       <p className="empty-state">Aún no tienes ninguna tarea creada.</p>
  //     </Block>
  //   );
  // }

  return (
    <Block text="Mis tareas">
      {todos.length > 0 ? (
        <>
          <Filters filterTodos={filterTodos} filter={filter} />
          <Todos
            todos={todos}
            removeTodo={removeTodo}
            changeStateTodo={changeStateTodo}
          />
          <Actions
            removeAllTodos={removeAllTodos}
            removeDoneTodos={removeDoneTodos}
          />{" "}
        </>
      ) : (
        <p className="empty-state">Aún no tienes ninguna tarea creada.</p>
      )}
    </Block>
  );
}

List.propTypes = {
  todos: array,
  filter: string,
  filterTodos: func,
  removeTodo: func,
  removeAllTodos: func,
  removeDoneTodos: func,
  changeStateTodo: func,
};

export default List;
