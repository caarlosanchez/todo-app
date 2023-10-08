import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Todos from "../../components/list/todos/Todos";
import Block from "../../components/shared/block/Block";
import { getTodosPaginated } from "../../services";

import "./dashboard-paginated.css";

const ITEMS_PER_PAGE = 5;

function DashboardPaginated() {
  const [todos, setTodos] = useState([]);
  const [total, setTotal] = useState();

  const loadTodos = async (offset) => {
    try {
      const response = await getTodosPaginated(ITEMS_PER_PAGE, offset);
      setTodos(response.data.todos);
      setTotal(response.data.total);
    } catch (error) {
      // Mostraríamos el pop up de error como en el dashboard normal
    }
  };

  useEffect(() => {
    // LLamamos a nuestra API para recoger las tareas iniciales
    loadTodos(0);
  }, []);

  const handlePagination = (e) => {
    // El e nos traerá el número de la página empezando por 0
    // { selected: 0 }
    loadTodos(e.selected * ITEMS_PER_PAGE);
  };

  return (
    <Block text="Mis tareas">
      {todos.length > 0 ? (
        <>
          <Todos
            todos={todos}
            // Utilizaríamos la misma función que en el useDashboard
            removeTodo={() => {}}
            // Utilizaríamos la misma función que en el useDashboard
            changeStateTodo={() => {}}
          />
          <div className="pagination-container">
            <ReactPaginate
              className="pagination"
              breakLabel="..."
              nextLabel="Siguiente"
              onPageChange={handlePagination}
              pageRangeDisplayed={3}
              pageCount={Math.ceil(total / ITEMS_PER_PAGE)}
              previousLabel="Anterior"
              renderOnZeroPageCount={null}
            />
          </div>
        </>
      ) : (
        <p className="empty-state">Aún no tienes ninguna tarea creada.</p>
      )}
    </Block>
  );
}

export default DashboardPaginated;
