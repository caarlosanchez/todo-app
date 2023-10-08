import Form from "../../components/form/Form";
import List from "../../components/list/List";
import useDashboard from "./useDashboard";
import ErrorPopUp from "../../components/shared/error-pop-up/ErrorPopUp";

import "./dashboard.css";

function Dashboard() {
  const {
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
  } = useDashboard();

  return (
    <>
      <Form addTodo={addTodo} />
      <List
        todos={filteredTodos}
        filter={filter}
        filterTodos={filterTodos}
        removeTodo={removeTodo}
        removeAllTodos={removeAllTodos}
        removeDoneTodos={removeDoneTodos}
        changeStateTodo={changeStateTodo}
      />
      <ErrorPopUp open={errorPopUp} onClose={() => setErrorPopUp(false)} />
    </>
  );
}

export default Dashboard;
