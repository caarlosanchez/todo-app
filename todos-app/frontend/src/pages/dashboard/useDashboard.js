import { useState, useEffect } from "react";
import {
  createTodo,
  deleteDoneTodos,
  deleteTodo,
  deleteTodos,
  getTodos,
  updateState,
} from "../../services";

function useDashboard() {
  // Variable de estado para guardar la lista completa de tareas
  const [todos, setTodos] = useState([]);
  // Variable de estado para guardar la lista filtrada
  const [filteredTodos, setFilteredTodos] = useState([]);
  // Variable de estado para guardar el filtro seleccionado
  const [filter, setFilter] = useState("all");
  const [errorPopUp, setErrorPopUp] = useState(false);

  // Función que llamaremos en el useEffect y después de cada interacción
  // como crear nota, eliminar, etc para que se actualice la vista
  const loadTodos = async () => {
    try {
      const response = await getTodos();
      setTodos(response.data.todos);
      setFilteredTodos(response.data.todos);
      setFilter("all");
    } catch (error) {
      setErrorPopUp(true);
    }
  };

  // Obtener la lista de tareas tras la renderización
  useEffect(() => {
    loadTodos();
  }, []);

  // Función para añadir un todo
  const addTodo = async (content) => {
    try {
      await createTodo(content);
      loadTodos();
    } catch (error) {
      setErrorPopUp(true);
    }
  };

  const filterTodos = (filter) => {
    // Modificamos el filtro para saber cual está seleccionado
    setFilter(filter);
    if (filter === "all") {
      setFilteredTodos(todos);
    } else {
      const filteredTodos = todos.filter((todo) => todo.state === filter);
      setFilteredTodos(filteredTodos);
    }
  };

  // Función para eliminar un solo todo
  const removeTodo = async (id) => {
    try {
      await deleteTodo(id);
      loadTodos();
    } catch (error) {
      setErrorPopUp(true);
    }
  };

  // Función para eliminar todos los todos
  const removeAllTodos = async () => {
    try {
      await deleteTodos();
      loadTodos();
    } catch (error) {
      setErrorPopUp(true);
    }
  };

  // Función para eliminar los todos terminados
  const removeDoneTodos = async () => {
    try {
      await deleteDoneTodos();
      loadTodos();
    } catch (error) {
      setErrorPopUp(true);
    }
  };

  // Función para cambiar el estado del todo
  const changeStateTodo = async (checked, id) => {
    try {
      const newState = checked ? "done" : "undone";
      await updateState(id, newState);
      loadTodos();
    } catch (error) {
      setErrorPopUp(true);
    }
  };

  return {
    state: { filteredTodos, filter, errorPopUp },
    actions: {
      addTodo,
      filterTodos,
      removeTodo,
      removeAllTodos,
      removeDoneTodos,
      changeStateTodo,
      setErrorPopUp,
    },
  };
}

export default useDashboard;
