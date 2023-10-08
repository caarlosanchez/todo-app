"use strict";

const Joi = require("joi");
const mysqlPool = require("../../../database/mysql-pool");

async function deleteTodo(req, res) {
  const { todoId } = req.params;
  let connection;

  const todoData = { todoId };

  try {
    const schema = Joi.object().keys({
      todoId: Joi.number().required(),
    });
    await schema.validateAsync(todoData);
  } catch (error) {
    return res.status(400).send(error);
  }
  const now = new Date();
  const deleteDate = now.toISOString().substring(0, 19).replace("T", " ");
  try {
    connection = await mysqlPool.getConnection();
    const sqlQuery = `UPDATE todos SET deleted_at = '${deleteDate}' WHERE id = '${todoData.todoId}' AND deleted_at IS NULL`;
    await connection.query(sqlQuery);

    res.status(204).send("removed");
  } catch (error) {
    res.status(500).send(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  deleteTodo,
};
