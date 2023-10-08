import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Task() {
  // const [todo, setTodo] = useState();
  const { id } = useParams();

  useEffect(() => {
    // Llamaríamos a nuestro servicio para coger la tarea
    // const response = await getTodo(id);
    // setTodo(response.data.todo)
  }, []);

  return <>{`Tarea con el id ${id}`}</>;
}

export default Task;
