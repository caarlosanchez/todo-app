"use strict";

const Joi = require("joi");
const mysqlPool = require("../../../database/mysql-pool");

async function searchTodos(req, res) {
  const { user_id } = req.claims;
  const { search } = req.query;
  let connection;

  const searchData = { user_id };

  try {
    const schema = Joi.object().keys({
      user_id: Joi.number().required(),
    });
    await schema.validateAsync(searchData);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }

  try {
    connection = await mysqlPool.getConnection();
    const sqlQuery = `SELECT * FROM todos WHERE id_user = '${user_id}' AND deleted_at IS NULL AND content LIKE "%${search}%"`;
    const [todos] = await connection.query(sqlQuery);

    const sqlQueryTotal = `SELECT COUNT(*) FROM todos WHERE id_user = '${user_id}' AND deleted_at IS NULL`;
    const [total] = await connection.query(sqlQueryTotal);

    res.status(200).send({ todos, total: total[0]["COUNT(*)"] });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  searchTodos,
};
