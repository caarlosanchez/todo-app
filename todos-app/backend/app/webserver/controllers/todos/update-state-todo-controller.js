"use strict";

const Joi = require("joi");
const mysqlPool = require("../../../database/mysql-pool");

async function updateTodoState(req, res) {
  const todoData = { ...req.body };
  let connection;

  try {
    const schema = Joi.object().keys({
      id: Joi.number().required(),
      state: Joi.string().required(),
    });
    await schema.validateAsync(todoData);
  } catch (error) {
    return res.status(400).send(error);
  }

  try {
    connection = await mysqlPool.getConnection();
    const sqlQuery = "UPDATE todos SET state = ? WHERE id = ?;";

    await connection.query(sqlQuery, [todoData.state, todoData.id]);

    res.status(204).send("Todo state updated");
  } catch (error) {
    res.status(500).send(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  updateTodoState,
};
