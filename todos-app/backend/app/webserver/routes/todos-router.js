"use strict";

const { Router } = require("express");

const {
  checkAccountSession,
} = require("../controllers/account/check-account-controller");

const { createTodo } = require("../controllers/todos/add-todo-controller");
const {
  updateTodoState,
} = require("../controllers/todos/update-state-todo-controller");
const { getTodos } = require("../controllers/todos/get-todos-controller");
const { deleteTodo } = require("../controllers/todos/delete-todo");
const { deleteDoneTodos } = require("../controllers/todos/delete-done-todos");
const { deleteTodos } = require("../controllers/todos/delete-todos");
const { searchTodos } = require("../controllers/todos/search-todos");
const {
  getTodosPaginated,
} = require("../controllers/todos/get-todos-paginated-controller");
const todosRouter = Router();

todosRouter.get("/", checkAccountSession, getTodos);
todosRouter.get("/search", checkAccountSession, searchTodos);
todosRouter.get("/paginated", checkAccountSession, getTodosPaginated);
todosRouter.post("/", checkAccountSession, createTodo);
todosRouter.put("/state", checkAccountSession, updateTodoState);
todosRouter.put("/delete/:todoId", checkAccountSession, deleteTodo);
todosRouter.put("/delete", checkAccountSession, deleteTodos);
todosRouter.put("/done", checkAccountSession, deleteDoneTodos);

module.exports = { todosRouter };
