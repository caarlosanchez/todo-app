"use strict";

const Joi = require("joi");
const mysqlPool = require("../../../database/mysql-pool");

async function deleteTodos(req, res) {
  const { user_id } = req.claims;
  let connection;

  const todoData = { user_id };

  try {
    const schema = Joi.object().keys({
      user_id: Joi.number().required(),
    });
    await schema.validateAsync(todoData);
  } catch (error) {
    return res.status(400).send(error);
  }
  const now = new Date();
  const deleteDate = now.toISOString().substring(0, 19).replace("T", " ");
  try {
    connection = await mysqlPool.getConnection();
    const sqlQuery = `UPDATE todos SET deleted_at = '${deleteDate}' WHERE id_user = '${todoData.user_id}'`;
    await connection.query(sqlQuery);

    res.status(204).send("Todos removed");
  } catch (error) {
    res.status(500).send(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  deleteTodos,
};
