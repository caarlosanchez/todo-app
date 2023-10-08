"use strict";

const Joi = require("joi");
const mysqlPool = require("../../../database/mysql-pool");

async function getTodos(req, res) {
  const { user_id } = req.claims;
  let connection;

  const todoData = { user_id };

  try {
    const schema = Joi.object().keys({
      user_id: Joi.number().required(),
    });
    await schema.validateAsync(todoData);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
  try {
    connection = await mysqlPool.getConnection();
    const sqlQuery = `SELECT * FROM todos WHERE id_user = '${todoData.user_id}' AND deleted_at IS NULL`;
    const [todos] = await connection.query(sqlQuery);

    res.status(200).send({ todos });
  } catch (error) {
    res.status(500).send(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  getTodos,
};
