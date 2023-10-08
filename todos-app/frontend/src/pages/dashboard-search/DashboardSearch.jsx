import { useEffect, useState } from "react";
import Todos from "../../components/list/todos/Todos";
import Block from "../../components/shared/block/Block";
import Button from "../../components/shared/button/Button";
import { searchTodos } from "../../services";

import "./dashboard-search.css";

function DashboardSearch() {
  const [todos, setTodos] = useState([]);
  const [total, setTotal] = useState();
  const [inputText, setInputText] = useState("");

  console.log(inputText);

  const loadTodos = async (search) => {
    try {
      const response = await searchTodos(search);
      setTodos(response.data.todos);
      setTotal(response.data.total);
    } catch (error) {
      // Mostraríamos el pop up de error como en el dashboard normal
    }
  };

  useEffect(() => {
    // LLamamos a nuestra API para recoger las tareas iniciales
    loadTodos(inputText);
  }, []);

  const handleSearch = () => {
    loadTodos(inputText);
  };

  return (
    <Block text="Buscador">
      {todos.length > 0 && (
        <>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <Button text="Buscar" onClick={handleSearch} />
          <span className="total">{`Mostrando ${todos.length} de ${total}`}</span>
          <Todos
            todos={todos}
            // Utilizaríamos la misma función que en el useDashboard
            removeTodo={() => {}}
            // Utilizaríamos la misma función que en el useDashboard
            changeStateTodo={() => {}}
          />
        </>
      )}

      {inputText === "" && todos.length === 0 && (
        <p className="empty-state">Aún no tienes ninguna tarea creada.</p>
      )}

      {inputText !== "" && todos.length === 0 && (
        <>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <Button text="Buscar" onClick={handleSearch} />
          <p className="empty-state">
            Ninguna tarea corresponde al término de búsqueda.
          </p>
        </>
      )}
    </Block>
  );
}

export default DashboardSearch;
