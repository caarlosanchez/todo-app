"use strict";

const Joi = require("joi");
const mysqlPool = require("../../../database/mysql-pool");

async function createTodo(req, res) {
  const { user_id } = req.claims;
  let connection;

  const todoData = { ...req.body, user_id };

  try {
    const schema = Joi.object().keys({
      user_id: Joi.number().required(),
      content: Joi.string().required(),
    });
    await schema.validateAsync(todoData);
  } catch (error) {
    return res.status(400).send(error);
  }

  const now = new Date();
  const createDate = now.toISOString().substring(0, 19).replace("T", " ");

  try {
    connection = await mysqlPool.getConnection();
    const sqlQuery = "INSERT INTO todos SET ?";
    await connection.query(sqlQuery, {
      id_user: todoData.user_id,
      content: todoData.content,
      state: "undone",
      created_at: createDate,
    });

    res.status(201).send("todo created");
  } catch (error) {
    res.status(500).send(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  createTodo,
};
