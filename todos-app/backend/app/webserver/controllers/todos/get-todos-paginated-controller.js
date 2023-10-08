"use strict";

const Joi = require("joi");
const mysqlPool = require("../../../database/mysql-pool");

async function getTodosPaginated(req, res) {
  const { user_id } = req.claims;
  const { limit, offset } = req.query;
  let connection;

  const todoData = { user_id, limit, offset };

  try {
    const schema = Joi.object().keys({
      user_id: Joi.number().required(),
      limit: Joi.string().required(),
      offset: Joi.string().required(),
    });
    await schema.validateAsync(todoData);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
  try {
    connection = await mysqlPool.getConnection();
    const sqlQuery = `SELECT * FROM todos WHERE id_user = '${todoData.user_id}' AND deleted_at IS NULL LIMIT ${limit} OFFSET ${offset}`;
    const [todos] = await connection.query(sqlQuery);

    const sqlQueryTotal = `SELECT COUNT(*) FROM todos WHERE id_user = '${todoData.user_id}' AND deleted_at IS NULL`;
    const [total] = await connection.query(sqlQueryTotal);

    res.status(200).send({ todos, total: total[0]["COUNT(*)"] });
  } catch (error) {
    res.status(500).send(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  getTodosPaginated,
};
